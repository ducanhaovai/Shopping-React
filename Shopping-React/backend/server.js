const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const cookie = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://shopping-react-sjvr.vercel.app",
      "http://localhost:3000",
      "https://shopping-react-sjvr-git-main-ducanhaovais-projects.vercel.app",
      "https://shopping-react-sjvr-lqdrwqxdx-ducanhaovais-projects.vercel.app",
      "https://shopping-clone.site/api",
      "http://shopping-clone.site",
      "https://shopping-clone.site",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookie());

app.use(
  session({
    key: "userID",
    secret: "ducanh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1000,
    },
  })
);
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-key", (err, decoded) => {
      if (err) {
        console.error("Error decoding token:", err);
        return res
          .status(401)
          .json({ message: "Error decoding", error: err.message });
      } else {
        req.id = decoded.user.id || decoded.user._id;
        req.name = decoded.user.name;
        req.email = decoded.user.email;

        next();
      }
    });
  }
};

const getOauthGooleToken = async (code) => {
  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const { data } = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams(body),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
};

const getGoogleUser = async ({ id_token, access_token }) => {
  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      params: { access_token, alt: "json" },
      headers: { Authorization: `Bearer ${id_token}` },
    }
  );

  return data;
};

app.get("/home", verifyUser, (req, res) => {
  const { name, email } = req;
  return res.json({ Status: "Success", name, email });
});

app.get("/products", async (req, res) => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/products");
  res.json(response.data);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const usersCollection = client.db().collection("users");

  let existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    address: "",
    phone: "",
  };

  const result = await usersCollection.insertOne(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});
function loggedInRedirect(req, res, next) {
  if (req.cookies.token) {
    res.redirect("/");
  } else {
    next();
  }
}

app.post("/login", loggedInRedirect, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const userForToken = {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };

  const token = jwt.sign(userForToken, "our-jsonwebtoken-key", {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });
  return res.json({ Status: "Success" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/api/oauth/google", async (req, res, next) => {
  const { code } = req.query;
  const data = await getOauthGooleToken(code);
  const { id_token, access_token } = data;
  const googleUser = await getGoogleUser({ id_token, access_token });

  if (!googleUser.verified_email) {
    return res.status(403).json({
      message: "Google email not verified",
    });
  }

  const { email, name, picture } = googleUser;

  const usersCollection = client.db().collection("users");
  let existingUser = await usersCollection.findOne({ email: email });
  if (!existingUser) {
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const user = { email: email, name: name, password: hashedPassword };
    await usersCollection.insertOne(user);
    existingUser = user;
  }

  const token = jwt.sign({ user: existingUser }, "our-jsonwebtoken-key", {
    expiresIn: "1d",
  });
  res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

  const manual_access_token = jwt.sign(
    { email: existingUser.email, type: "access_token" },
    process.env.AC_PRIVATE_KEY,
    { expiresIn: "15m" }
  );
  const manual_refresh_token = jwt.sign(
    { email: existingUser.email, type: "refresh_token" },
    process.env.RF_PRIVATE_KEY,
    { expiresIn: "100d" }
  );

  return res.redirect(
    `http://localhost:3000/login/oauth?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}&name=${name}&picture=${picture}`
  );
});

function generateRandomPassword() {
  const randomPassword = Math.random().toString(36).slice(-8);
  return randomPassword;
}

app.get("/profile", verifyUser, async (req, res) => {
  const userId = req.id;
  const objectId = new ObjectId(userId);
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ _id: objectId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});
app.post("/profile-update", async (req, res) => {
  const _id = new ObjectId(req.body._id);

  const { name, email, address, phone } = req.body;

  const usersCollection = client.db().collection("users");
  const result = await usersCollection.updateOne(
    { _id: _id },
    { $set: { name, phone, address, email } }
  );
  return res.status(200).json({ message: "User profile updated successfully" });
});

app.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  const parsedProductId = parseInt(productId);
  if (isNaN(parsedProductId)) {
    throw new Error("Invalid productId");
  }

  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/products/${parsedProductId}`
  );
  const productData = response.data;
  res.json(productData);
});
app.get("/api/categories/:id/products", async (req, res) => {
  const categoryId = req.params.id;
  const response = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
  );
  const data = await response.json();
  res.json(data);
});

app.get("/search-products", async (req, res) => {
  const title = req.query.title;
  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/products/?title=${title}`
  );
  res.json(response.data);
});

app.get("/category-products", async (req, res) => {
  const title = req.query.title;
  const response = await axios.get(
    `https://api.escuelajs.co/api/v1/categories/?title=${title}`
  );

  res.json(response.data);
});

app.post("/change-password", verifyUser, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.id;
  const usersCollection = client.db().collection("users");

  const objectId = new ObjectId(userId);
  const user = await usersCollection.findOne({ _id: objectId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Incorrect old password" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await usersCollection.updateOne(
    { _id: objectId },
    { $set: { password: hashedPassword } }
  );

  return res.status(200).json({ message: "Password updated successfully" });
});

app.get("/categories", async (req, res) => {
  const response = await axios.get(
    "https://api.escuelajs.co/api/v1/categories/"
  );
  res.json(response.data);
});

app.post("/cart/add", verifyUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.id;

  const productResponse = await axios.get(
    `https://api.escuelajs.co/api/v1/products/${productId}`
  );
  const { title, price, images } = productResponse.data;

  const cartsCollection = client.db().collection("carts");
  let cart = await cartsCollection.findOne({ userId });

  if (!cart) {
    cart = {
      userId: userId,
      products: [],
    };
    await cartsCollection.insertOne(cart);
  }

  const productIndex = cart.products.findIndex(
    (product) => product.productId === productId
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({
      productId,
      title,
      price,
      images,
      quantity,
    });
  }
  await cartsCollection.updateOne({ userId }, { $set: cart });

  res.json({ message: "Product added to cart successfully" });
});
app.get("/cart", verifyUser, async (req, res) => {
  const userId = req.id;

  const cartsCollection = client.db().collection("carts");
  const cart = await cartsCollection.findOne({ userId });

  if (!cart) {
    return res.json([]);
  }

  return res.json(cart.products);
});
app.post("/cart/delete", verifyUser, async (req, res) => {
  const { id } = req.body;
  const userId = req.id;

  const cartsCollection = client.db().collection("carts");
  let cart = await cartsCollection.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  cart.products = cart.products.filter((product) => product.productId !== id);
  await cartsCollection.updateOne({ userId }, { $set: cart });

  res.json({ message: "Product removed from cart successfully" });
});
app.get("/search-products-by-price", async (req, res) => {
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  if (!minPrice || !maxPrice) {
    return res.status(400).json({ error: "Price range is required" });
  }
  if (minPrice < 0 || maxPrice < minPrice) {
    return res.status(400).json({ error: "Invalid price range" });
  }

  const min = Number(minPrice);
  const max = Number(maxPrice);

  const response = await axios.get(`https://api.escuelajs.co/api/v1/products`);
  const products = response.data.filter(
    (product) => product.price >= min && product.price <= max
  );
  res.json(products);
});

app.get("/products-by-price", async (req, res) => {
  const { order } = req.query;
  if (!order) {
    return res.status(400).json({ error: "Order parameter is required" });
  }
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    let products = response.data;
    if (order === "asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      products.sort((a, b) => b.price - a.price);
    } else {
      return res.status(400).json({ error: "Invalid order parameter" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(8088, () => {
  console.log(`Server is running on port ${8088}`);
});

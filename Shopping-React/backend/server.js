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
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-key", (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token", error: err.message });
      } else {
        req.id = decoded.id;
        req.name = decoded.name;
        req.email = decoded.email;
        console.log("Extracted user ID:", decoded.id);
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

// Hàm gửi yêu cầu lấy thông tin người dùng từ Google dựa trên Google OAuth token
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
  console.log(email);
  console.log("Success");
  return res.json({ Status: "Success", name, email });
});

app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const usersCollection = client.db().collection("users");

    const existingUser = await usersCollection.findOne({ email });
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
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    console.log("User logged in successfully");
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      "our-jsonwebtoken-key",
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    return res.json({ Status: "Success" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/api/oauth/google", async (req, res, next) => {
  try {
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

    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length === 0) {
      const randomPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      const sql = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
      await db.promise().query(sql, [email, name, hashedPassword]);

      console.log("User added to the database successfully");
      return res.status(200).json({
        message: "User added successfully",
        newPassword: randomPassword,
      });
    }
    const token = jwt.sign({ user: googleUser }, "our-jsonwebtoken-key", {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    const manual_access_token = jwt.sign(
      { email: googleUser.email, type: "access_token" },
      process.env.AC_PRIVATE_KEY,
      { expiresIn: "15m" }
    );
    const manual_refresh_token = jwt.sign(
      { email: googleUser.email, type: "refresh_token" },
      process.env.RF_PRIVATE_KEY,
      { expiresIn: "100d" }
    );

    // Redirect với các thông tin và token
    return res.redirect(
      `http://localhost:3000/login/oauth?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}&name=${name}&picture=${picture}`
    );
  } catch (error) {
    next(error);
  }
});

function generateRandomPassword() {
  const randomPassword = Math.random().toString(36).slice(-8);
  return randomPassword;
}

app.get("/profile", verifyUser, async (req, res) => {
  try {
    const userId = req.id;

    const objectId = new ObjectId(userId);

    const usersCollection = client.db().collection("users");
    const user = await usersCollection.findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/profile-update", async (req, res) => {
  console.log("Request received to update profile:", req.body);

  const _id = new ObjectId(req.body._id);

  const { name, email, address, phone } = req.body;

  try {
    console.log("da vao");
    const usersCollection = client.db().collection("users");
    const result = await usersCollection.updateOne(
      { _id: _id },
      { $set: { name, phone, address, email } }
    );

    console.log("User profile updated successfully");
    return res
      .status(200)
      .json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    // Lấy productId từ params
    const productId = req.params.productId;

    // Kiểm tra và chuyển đổi productId thành số nguyên
    const parsedProductId = parseInt(productId);
    if (isNaN(parsedProductId)) {
      throw new Error("Invalid productId");
    }

    // Tiếp tục gửi yêu cầu API với parsedProductId
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${parsedProductId}`
    );
    const productData = response.data;
    res.json(productData);
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
});

app.get("/search-products", async (req, res) => {
  try {
    const title = req.query.title;
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${title}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/category-products", async (req, res) => {
  try {
    const title = req.query.title;
    console.log("Search query:", title);
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/categories/?title=${title}`
    );
    console.log("Response data:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 8088;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/backend", (req, res) => {
  res.send("Server is running successfully!");
});

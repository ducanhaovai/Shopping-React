const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
require("dotenv").config();

const cookie = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
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
      express: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "singup",
  port: 3306,
});
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "need token!" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Xac nhan that bai" });
      } else {
        req.name = decoded.name;
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
  return res.json({ Status: "Success", name: req.name });
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

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Kiểm tra xem có dữ liệu được gửi lên không
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Sử dụng bcrypt để mã hóa mật khẩu
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, hashedPassword];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("User registered successfully");
      return res.status(200).json({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error selecting user from database:", err);
      return res
        .status(500)
        .json({ error: "Error selecting user from database" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (!result) {
        // Mật khẩu không chính xác
        return res.status(401).json({ error: "Invalid password" });
      }

      // Đăng nhập thành công: tạo token và gửi về cho người dùng
      console.log("User logged in successfully");
      const token = jwt.sign({ user }, "our-jsonwebtoken-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    });
  });
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

    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length === 0) {
      // Nếu người dùng chưa tồn tại, tạo một mật khẩu ngẫu nhiên
      const randomPassword = generateRandomPassword(); // Hàm tạo mật khẩu ngẫu nhiên
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Thêm người dùng mới vào cơ sở dữ liệu với mật khẩu ngẫu nhiên
      const sql = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";
      await db.promise().query(sql, [email, name, hashedPassword]);

      console.log("User added to the database successfully");

      // Trả về mật khẩu ngẫu nhiên cho người dùng
      return res.status(200).json({
        message: "User added successfully",
        newPassword: randomPassword,
      });
    }

    // Nếu người dùng đã tồn tại, tạo token và redirect
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
  // Logic để tạo mật khẩu ngẫu nhiên, ví dụ:
  const randomPassword = Math.random().toString(36).slice(-8);
  return randomPassword;
}

app.get("/profile", verifyUser, (req, res) => {
  const userId = req.id;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const user = results[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  });
});

app.post("/profile", verifyUser, (req, res) => {
  const userId = req.id;
  const { name, email, phone, address } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?",
    [name, email, phone, address, userId],
    (err, results) => {
      if (err) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("User profile updated successfully");
      return res
        .status(200)
        .json({ message: "User profile updated successfully" });
    }
  );
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
    console.log("Search query:", title);
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?title=${title}`
    );

    console.log("Response data:", response.data);
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

const port = 8088;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

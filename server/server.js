const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, //
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use Date.now() to get a unique filename or handle as you prefer
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "https://dev-gserver.vercel.app",
  })
);

// Routes
app.post("/upload", upload.single("image"), async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const filename = req.file.filename;
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

  try {
    // Check if an image with the same title already exists
    const checkSql = "SELECT * FROM images WHERE title = $1";
    const checkResult = await pool.query(checkSql, [title]);

    if (checkResult.rows.length > 0) {
      return res.status(400).send("An image with this title already exists.");
    }

    // Insert new image
    const insertSql =
      "INSERT INTO images (title, description, image_url) VALUES ($1, $2, $3) RETURNING *";
    const insertResult = await pool.query(insertSql, [
      title,
      description,
      imageUrl,
    ]);
    res.send("Image uploaded successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image + err.message + err.message");
  }
});

// JWT secret key
const jwtSecret = process.env.JWT_SECRET;

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userQuery.rows.length > 0) {
      const user = userQuery.rows[0];

      if (await bcrypt.compare(password, user.password)) {
        // Passwords match, create JWT token
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          jwtSecret,
          { expiresIn: "1h" }
        );
        res.json({ message: "Login successful", token });
      } else {
        // Passwords don't match
        res.status(401).send("Invalid username or password");
      }
    } else {
      // User not found
      res.status(401).send("Invalid username or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

// Register route
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const newUser = await pool.query(
      "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, email]
    );

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/gallery", async (req, res) => {
  try {
    const sql = "SELECT * FROM images ORDER BY created_at DESC";
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving images");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

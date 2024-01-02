const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dev_gallery",
  password: "0815Oyoma",
  port: 5432,
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
    origin: "http://localhost:3001", // Replace with your frontend's URL
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
    res.status(500).send("Error uploading image");
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

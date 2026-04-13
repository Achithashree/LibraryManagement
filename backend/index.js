const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");

const User = require("./schemas/userSchema");
const Admin = require("./schemas/adminSchema");
const Book = require("./schemas/bookSchema");
const Request = require("./schemas/requestSchema");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});


// ================= USER =================

// Create User
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json("User Registered Successfully ✅");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get Single User
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Update User
app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(updatedUser);
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});


// ================= ADMIN =================

// Create Admin
app.post("/admin", async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.json("Admin Registered Successfully ✅");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

//Admin login
app.post("/login", async (req, res) => {
    try{
    const { name, password } = req.body;
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(401).json({ message: "Invalid name or password" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid name or password" });
    }
    res.json(admin);
}
catch(e){
    res.status(400).json(e.message);
}
})

// Get All Admin
app.get("/admin", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});



// Update Admin
app.put("/admin/:id", async (req, res) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(updatedAdmin);
});

// Delete Admin
app.delete("/admin/:id", async (req, res) => {
  const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
  res.json(deletedAdmin);
});


// ================= BOOK =================

// Create Book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json("Book Added Successfully 📚");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Get All Books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Get Single Book
app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// Update Book
app.put("/books/:id", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(updatedBook);
});

// Delete Book
app.delete("/books/:id", async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  res.json(deletedBook);
});


// ================= REQUEST =================

// Create Request
app.post("/request", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json("Request Sent Successfully 📩");
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Get All Requests
app.get("/request", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

// Update Request
app.put("/request/:id", async (req, res) => {
  const updatedRequest = await Request.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }
  );
  res.json(updatedRequest);
});

// Delete Request
app.delete("/request/:id", async (req, res) => {
  const deletedRequest = await Request.findByIdAndDelete(req.params.id);
  res.json(deletedRequest);
});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT} 🚀`);
});
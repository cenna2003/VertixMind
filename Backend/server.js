const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Sample data
let users = [
  {
    id: 1,
    name: "John Doe",
    username: "john",
    email: "john@example.com",
    phone: "9876543210",
    website: "john.dev"
  },
  {
    id: 2,
    name: "Alice Smith",
    username: "alice",
    email: "alice@example.com",
    phone: "9876501234",
    website: "alice.dev"
  },
  {
    id: 3,
    name: "David Miller",
    username: "david",
    email: "david@example.com",
    phone: "9876512345",
    website: "david.dev"
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET one user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// POST a new user
app.post("/users", (req, res) => {

  const newUser = {
    id: users.length + 1,
    ...req.body
  };

  users.push(newUser);

  res.status(201).json(newUser);

});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
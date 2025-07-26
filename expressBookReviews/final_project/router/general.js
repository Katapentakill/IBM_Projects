const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });
  if (isValid(username)) return res.status(409).json({ message: "User already exists" });
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

public_users.get('/', (req, res) => res.status(200).json(books));

public_users.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.status(200).json(book) : res.status(404).json({ message: "Book not found" });
});

public_users.get('/author/:author', (req, res) => {
  const filtered = Object.values(books).filter(b => b.author === req.params.author);
  return filtered.length ? res.status(200).json(filtered) : res.status(404).json({ message: "No books found for this author" });
});

public_users.get('/title/:title', (req, res) => {
  const filtered = Object.values(books).filter(b => b.title === req.params.title);
  return filtered.length ? res.status(200).json(filtered) : res.status(404).json({ message: "No books found with this title" });
});

public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];
  return book ? res.status(200).json(book.reviews) : res.status(404).json({ message: "Book not found" });
});

// Tareas 10-13 usando Axios con async/await y Promises
public_users.get('/async-books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

public_users.get('/async-isbn/:isbn', (req, res) => {
  axios.get(`http://localhost:5000/isbn/${req.params.isbn}`)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({ message: "Error fetching book by ISBN" }));
});

public_users.get('/async-author/:author', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching by author" });
  }
});

public_users.get('/async-title/:title', (req, res) => {
  axios.get(`http://localhost:5000/title/${req.params.title}`)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({ message: "Error fetching by title" }));
});

module.exports.general = public_users;
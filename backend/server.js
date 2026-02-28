const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // This triggers the connection test

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// A simple route to test if the API is working
app.get('/', (req, res) => {
  res.send('School Connect API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
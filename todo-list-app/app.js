//app.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'todo_app',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS)
app.use(express.static(__dirname + '/public'));

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  // Fetch tasks from the database
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    res.render('index', { tasks: results });
  });
});

app.post('/add', (req, res) => {
  // Insert a new task into the database
  const task = req.body.task;
  db.query('INSERT INTO tasks (description) VALUES (?)', [task], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

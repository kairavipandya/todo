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
  const { task, category, due_date, repeat, repeat_days } = req.body;
  let repeatInfo = repeat === 'custom' ? repeat_days.join(',') : repeat;
  
  const sql = 'INSERT INTO tasks (description, category, due_date, repeat_days) VALUES (?, ?, ?, ?)';
  db.query(sql, [task, category, due_date, repeatInfo], (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

  

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/mark-complete', (req, res) => {
    const completedTasks = req.body.completedTasks;
    if (completedTasks) {
      db.query('UPDATE tasks SET completed = 1 WHERE id IN (?)', [completedTasks], (err, result) => {
        if (err) throw err;
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });


  app.post('/delete', (req, res) => {
    const deletedTasks = req.body.deletedTasks;
    if (deletedTasks) {
      db.query('DELETE FROM tasks WHERE id IN (?)', [deletedTasks], (err, result) => {
        if (err) throw err;
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  });
  

  app.get('/edit/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('SELECT * FROM tasks WHERE id = ?', [taskId], (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const task = results[0];
        res.render('edit', { task: task });
      } else {
        res.redirect('/');
      }
    });
  });
  
  app.post('/update/:id', (req, res) => {
    const taskId = req.params.id;
    const { description, category, due_date } = req.body;
    db.query(
      'UPDATE tasks SET description = ?, category = ?, due_date = ? WHERE id = ?',
      [description, category, due_date, taskId],
      (err, result) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });
  
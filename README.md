# To-Do List Application

This is a feature-rich to-do list application that allows you to manage your tasks efficiently. You can add, edit, categorize, mark as completed, and delete tasks. The application also supports due dates for your tasks.

## Features

- **Add Tasks**: Easily add new tasks with descriptions, categories, and due dates.
- **Categorize Tasks**: Organize your tasks by assigning them to categories.
- **Mark Tasks as Completed**: Keep track of completed tasks by checking them off.
- **Delete Tasks**: Remove tasks you no longer need.
- **Edit Tasks**: Modify task details, including descriptions, categories, and due dates.
- **Responsive Design**: The application is responsive and works well on both desktop and mobile devices.

## Setup

1. **Clone the Repository**: Clone this repository to your local machine using Git.

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   ```
2. **Install Dependencies**: Navigate to the project directory and install the required Node.js packages.

   ```bash
   cd todo-list-app
   npm install
   ```
3. **Database Setup**: Set up a MySQL database and update the database connection details in `app.js`. You can use the provided SQL script in the README to create the necessary table.

   ```sql
   CREATE DATABASE todo_app;
   USE todo_app;
   CREATE TABLE tasks (
     id INT AUTO_INCREMENT PRIMARY KEY,
     description VARCHAR(255) NOT NULL,
     category VARCHAR(255),
     due_date DATE,
     completed BOOLEAN NOT NULL DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. **Start the Application**: Run the application.

   ```bash
   node app.js
   ```
5. **Access the Application**: Open your web browser and go to `http://localhost:3000` to use the to-do list application.

## Usage

- **Add a Task**: Fill in the task description, category, and due date (optional), then click "Add Task."
- **Mark as Completed**: Check the box next to a task to mark it as completed.
- **Delete Tasks**: Select one or more tasks using the checkboxes and click "Delete Selected Tasks" to remove them.
- **Edit a Task**: Click the "Edit" button next to a task to modify its details.

## Contributing

Contributions are welcome! If you have suggestions or would like to report a bug, please open an issue on this repository.

## License

This project is licensed under the [MIT License](LICENSE).

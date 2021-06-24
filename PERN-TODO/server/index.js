const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES//
//create a todo
app.post("/todos", async (req, res) => {
    //await
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todoItems (description) VALUES($1) RETURNING *", 
        [description]
        );

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todoItems");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todoItems WHERE ID = $1", 
        [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todoItems SET description = $1 WHERE ID = $2", 
        [description, id]);

        res.json("Todo was updated.");
    } catch (error) {
        console.log(error.message);
    }
});


//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todoItems WHERE ID = $1", 
        [id]);

        res.json("Todo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});


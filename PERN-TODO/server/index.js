const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES//

//create a todoList
app.post("/todoLists", async (req, res) => {
    //await
    try {
        const { tittle } = req.body;
        const newTodo = await pool.query("INSERT INTO todoLists (tittle) VALUES($1) RETURNING *", 
        [tittle]
        );

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

//get all todoLists

app.get("/todoLists", async (req, res) => {
    try {
        const allTodoLists = await pool.query("SELECT * FROM todoLists");
        res.json(allTodoLists.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//create a todo 
app.post("/todos/:id", async (req, res) => {
    //await
    try {
        const { id } = req.params;
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todoItems (List_ID, description) VALUES($1, $2) RETURNING *", 
        [id, description]
        );

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

//get all todos 

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT todoItems.id, description, Status, todoLists.tittle FROM todoItems inner join todoLists ON todoItems.List_ID = todoLists.id");
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
        const status = 1;
        const updateTodo = await pool.query("UPDATE todoItems SET description = $1, Status = $2 WHERE ID = $3", 
        [description, status, id]);


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


//delete a todoList
app.delete("/todoLists/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteList = await pool.query("DELETE FROM todoLists WHERE ID = $1", 
        [id]);

        const deleteTodo = await pool.query("DELETE FROM todoItems WHERE List_ID = $1", 
        [id]);
        res.json("TodoList was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});


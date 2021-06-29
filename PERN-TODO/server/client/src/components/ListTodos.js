import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    console.log(todos);

    //delete todo function
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            console.log(id);
            setTodos(todos.filter(todoItems => todoItems.id !== id));
        } catch (err) {
            console.log(err);
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json();

            console.log(jsonData);
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // function getSubject(id) {
    //     const subject = pool.query("SELECT ID FROM todoItems INNER JOIN todoLists ON todoItems.List_Id = todoLists.Id");
    // }
    
    useEffect(() => {
        getTodos();
    }, []);

    // console.log(todos);
    return (
    <Fragment>
      {" "}
      <h1 className="text-center mt-5">Todo Items</h1>
      <table class="table table-striped mt-5 text-center">
        <thead>
        <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Subject</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
        </tr>*/}
        {todos.map(todoItems => (
            <tr key={todoItems.id}>
                <td>{todoItems.description}</td>
                <td>{todoItems.status}</td>
                <td>{todoItems.tittle}</td>
                <td>
                    <EditTodo todoItems={todoItems}/>
                </td>
                <td><button className="btn btn-danger" onClick={() => deleteTodo(todoItems.id)}
                >Delete</button></td>
            </tr>
        ))}
    
        </tbody>
      </table>
    </Fragment>
    )
};

export default ListTodos;
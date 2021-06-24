import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
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
    
    useEffect(() => {
        getTodos();
    }, []);

    // console.log(todos);
    return (
    <Fragment>
      {" "}
      <table class="table table-striped mt-5 text-center">
        <thead>
        <tr>
            <th>Description</th>
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
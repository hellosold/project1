import React, { Fragment, useEffect, useState } from "react";


import InputTodo from "./InputTodo";

const ListLists = (todoList) => {

    const [todoLists, setLists] = useState([]);

    //delete todo function
    const deleteList = async id => {
        try {
            const deleteList = await fetch(`http://localhost:5000/todoLists/${id}`, {
                method: "DELETE"
            });
            console.log(id);
            console.log(todoList);
            setLists(todoLists.filter(lists => todoLists.id !== id));
            window.location = "/";
        } catch (err) {
            console.log(err);
            console.error(err.message);
        }
    }

    const getLists = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/todoLists")
            const jsonData = await response.json();

            console.log(jsonData);
            setLists(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        getLists();
    }, []);

    // console.log(todos);
    return (
    <Fragment>
      {" "}
      <table class="table table-striped mt-5 text-center">
        <thead>
        <tr>
            <th>Subject</th>
            <th>Add a Todo</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
        </tr>*/}
        {todoLists.map(todoLists => (
            <tr key={todoLists.id}>
                <td>{todoLists.tittle}</td>
                <td><InputTodo todoList={todoLists}/></td>
                <td><button className="btn btn-danger" onClick={() => deleteList(todoLists.id)}
                >Delete</button></td>
            </tr>
        ))}
    
        </tbody>
      </table>
    </Fragment>
    )
};

export default ListLists;
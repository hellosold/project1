import React, { Fragment, useState } from "react";

const InputTodo = (todoList) => {

    const [description, setDescription] = useState("");
    console.log(description);
    // console.log(todoList.todoList);
    // console.log(todoList.todoList['id']);
    
    var id = todoList.todoList['id']
    console.log("id is", id);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { description };
          const response = await fetch(`http://localhost:5000/todos/${id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
          });

          console.log(response);
          window.location = "/";

        } catch (err) {
            console.log(err);
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            {/* <h1 className="text-center mt-5">Todo Items</h1> */}
             <form className="d-flex" onSubmit={onSubmitForm}>
                <input 
                    text="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
        
    );
};

export default InputTodo;

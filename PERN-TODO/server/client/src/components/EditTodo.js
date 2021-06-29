import React, {Fragment, useState} from "react";

const EditTodo = ({todoItems}) => {

    const [description, setDescription] = useState(todoItems.description);

    // console.log(todoItems);

    //edit decription function

    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todoItems.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
    <Fragment>
       <button type="button" 
       class="btn btn-warning" 
       data-toggle="modal" 
       data-target={`#id${todoItems.id}`}
       >
        Edit
    </button>


    <div 
        class="modal" 
        id={`id${todoItems.id}`} 
        onClick={() => setDescription(todoItems.description)}>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Todo</h4>
                    <button type="button" class="close" data-dismiss="modal" 
                    onClick={()=> setDescription(todoItems.description)}
                    >&times;</button>
                </div>

                
                <div class="modal-body">
                    <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>

                
                <div class="modal-footer">
                    <button 
                    type="button" 
                    class="btn btn-warning" 
                    data-dismiss="modal"
                    onClick = {e => updateDescription(e)}
                    >Edit
                    </button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                    onClick={()=> setDescription(todoItems.description)}>
                    Close</button>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
    );
}

export default EditTodo;

import React from "react";
import "./Todo.css";
// {id,name,cgpa}
const Todo = ({ value ,Edit}) => {

    const handleEdit=(id)=>{
        Edit(id)
    }
    const handleDelete=(id)=>{
        
    }

  return (
    <section className="todo">
      <h1>{value.name}</h1>
      <div className="btn">
        <i onClick={()=>handleEdit(value.id)} className="fa-solid fa-pen-to-square"></i>
        <i onClick={()=>handleDelete(value.id)} className="fa-solid fa-trash"></i>
      </div>
    </section>
  );
};

export default Todo;

import React, { useState } from "react";
import Todo from "./Todo";
import "./Todos.css";
import { useEffect } from "react";

const Todos = () => {
  const [state, setstate] = useState([
    { id: 1, name: "fahad" },
    { id: 2, name: "Momin" },
    { id: 3, name: "Monir" },
  ]);

  const [name, setName] = useState("");
  const [editstate, setEditstate] = useState(0);
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setName(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editstate) {
      const newValue = {
        id: new Date().getTime().toString(36),
        name,
      };
      if (name && name.length > 3) {
        setErrorText("");
        setstate((prev) => {
          return [...prev, newValue];
        });
      } else {
        setErrorText("Length must be greater than 3");
      }
    } else {    
         
      setEditstate(() => 0);
      setstate((prev) => prev.map((item)=> {
        if(item.id === editstate) {
            return {
                ...item,
                name
            }
        }
        else {
            return item;
        }
      }))
      setName("");
    }
  };

  useEffect(() => {
    if (editstate > 0) {
      const filterData = state.filter((value) => value.id === editstate);
      setName(filterData[0].name || "kjhgfds");
    }
  }, [editstate]);

  const Edit = (id) => {
    setEditstate(id);
  };

  return (
    <div className="todos">
      <div className="inputSection">
        <form onSubmit={handleSubmit}>
          <p>{errorText}</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            required
          />
          <button type="submit">{editstate ? "Edit" : "Add"}</button>
        </form>
      </div>
      {state &&
        state.map((value) => {
          return <Todo key={value.id} value={value} Edit={Edit} />;
        })}
    </div>
  );
};

export default Todos;

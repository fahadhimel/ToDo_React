import React, { useState } from "react";
import Todo from "./Todo";
import "./Todos.css";
// import { useEffect } from "react";

const Todos = () => {
  const [state, setstate] = useState([]);

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
      if (name && name.length > 2) {
        setErrorText("");
        setstate((prev) => {
          return [...prev, newValue];
        });
        setName("");
      } else {
        setErrorText("Length must be greater than 3");
      }
    } else {
      setstate((prev) =>
        prev.map((item) => {
          if (item.id === editstate) {
            return {
              ...item,
              name,
            };
          } else {
            return item;
          }
        })
      );
      setEditstate(0);
      setName("");
    }
  };

  const Edit = (id) => {
    setEditstate(id);
    const found = state && state.find((element) => element.id === id);
    setName(found.name);
  };

  const Delete = (id) => {
    const filterData = state.filter((fil) => fil.id !== id);
    setstate(()=>filterData);
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
          return (
            <Todo key={value.id} value={value} Edit={Edit} Delete={Delete} />
          );
        })}
    </div>
  );
};

export default Todos;

import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem.jsx";
import { getAllTodos } from "../api/todoApi.ts"; 

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function retrieveTodos() {
      const items = await getAllTodos();
      const userTodos = items.map((i) => {
        return {
          completed: i.completed,
          name: i.name,
          id: i.todoId,
          date: i.createdAt
        }
      });
      setTodos(userTodos);
    }
    retrieveTodos();
  }, []);

  return (
    <div>
      Here's all your things to do.
      {todos.map((todo, index) => 
        <TodoItem 
          key={index} 
          name={todo.name} 
          description={todo.id} />)}
    </div>
  );
}

export default Home;

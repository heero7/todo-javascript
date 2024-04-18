import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem.jsx";
import { Center, VStack } from "@chakra-ui/react";
import { getAllTodos } from "../api/todoApi.ts"; 

function Home() {
  const [todos, setTodos] = useState([{ name: 'Dishes', id: 123-123, completed: false, createdAt: Date.now(), completedAt: null }, 
    { name: 'Watch some basketball', id: 123-456, completed: false, createdAt: Date.now() + 1000, completedAt: null }]);

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = true;
        todo.completedAt = Date.now();
      }
      return todo;
    });

    // Make an api call to save this one todo.
    setTodos(updatedTodos);
  }

  function editTodoItem(id, newName) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newName;
      }
      return todo;
    });

    // make an API call to save this one Todo.
    setTodos(updatedTodos);
  }

  useEffect(() => {
    async function retrieveTodos() {
      const items = await getAllTodos();
      const userTodos = items.map((i) => {
        return {
          completed: i.completed,
          name: i.name,
          id: i.todoId,
          createdAt: i.createdAt,
        }
      });
      setTodos(userTodos);
    }
    //retrieveTodos();
  }, []);

  return (
    <Center>
      <VStack>
        {todos.map((todo, index) => 
          <TodoItem 
            key={index} 
            name={todo.name} 
            createdAt={todo.createdAt}
            completed={todo.completed}
            onEditTodoClick={editTodoItem}
            onCompleteClick={() => completeTodo(todo.id)}
            todoId={todo.id} />)}
      </VStack>
    </Center>
  );
}

export default Home;

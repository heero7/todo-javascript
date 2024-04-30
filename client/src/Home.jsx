import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem.jsx";
import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { 
  getAllTodos,
  getLoggedInUser,
  addTodo,
  completeTodoItem,
  editTodoItem
} from "../api/todoApi.ts"; 

function Home() {
  const [todoName, setTodoName] = useState('');
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState(
    [
      { name: 'Dishes', id: 123-123, completed: false, createdAt: Date.now(), completedAt: null }, 
      { name: 'Watch some basketball', id: 123-456, completed: false, createdAt: Date.now() + 1000, completedAt: null }
    ]);

  const handleTodoNameOnChange = (event) => setTodoName(event.target.value);

  async function completeTodo(id) {
    const result = await completeTodoItem(id);
    if (!result) return;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = true;
        todo.completedAt = Date.now();
      }
      return todo;
    });

    setTodos(updatedTodos);
  }
  

  /**
   * Edits a todo item. Then updates the
   * array with the new item.
   * @param {string} newName: the name of the todo item
   * @param {string} id: the id  of the todo item
   */
  async function editTodo(id, newName) {
    const result = await editTodoItem(id, newName);
    if (!result) return;

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newName;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  async function submitNewTodo() {
    const result = await addTodo(todoName);
    if (!result.success) {
      console.error('Could not add new todo.');
      return;
    }

    const updatedTodos = [ ...todos, {
      name: result.name,
      completed: result.completed,
      createdAt: result.createdAt,
      id: result.todoId
    }];

    setTodos(updatedTodos);
    setTodoName('');
  }

  useEffect(() => {
    async function loggedInUser() {
      const { userName, email, fullName }  = await getLoggedInUser();
      setUser({ userName, email, fullName });
    }

    loggedInUser();
  }, []);

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
    retrieveTodos();
  }, []);

  return (
    <Center>
      <VStack>
        <Heading>Welcome, {user.fullName}</Heading>
        {todos.map((todo, index) => 
          <TodoItem 
            key={index} 
            name={todo.name} 
            createdAt={todo.createdAt}
            completed={todo.completed}
            onEditTodoClick={editTodo}
            onCompleteClick={() => completeTodo(todo.id)}
            todoId={todo.id} />)}
        {/* 
          Add a section to add a new todo item
          The current spot gets hidden very quickly.
          🤷
        */}
        <InputGroup>
          <Input placeholder='Add a new todo' onChange={handleTodoNameOnChange} value={todoName} />
          <InputRightElement width='4.5rem'>
            <Button size='sm' onClick={submitNewTodo}>Add</Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Center>
  );
}

export default Home;

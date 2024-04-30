export async function getLoggedInUser() {
  const user = localStorage.getItem('user');
  if (user) {
    return user;
  }
  const authToken = getToken();
  const result = await fetch('http://localhost:7200/users', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  if (result.status == 200) {
    const u = await result.json();
    return {
      userName: u.userName,
      email: u.email,
      fullName: u.fullName
    };
  }

  return {
    userName: '',
    email: '',
    fullName: ''
  };
}

/*
 * Adds a todo to the database.
 * @param {string} todoName: the name of the todo.
 */
export async function addTodo(todoName) {
  const authToken = getToken();
  const result = await fetch('http://localhost:7200/todos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: todoName })
  });

  if (result.status == 201) {
    const t = await result.json();
    return {
      name: t.name,
      todoId: t.todoId,
      completed: t.completed,
      createdAt: t.createdAt,
      success: true 
    };
  }

  // Display an error?
  return { success: false };
}

export async function getAllTodos() {
  const authToken = getToken();
  const result = await fetch('http://localhost:7200/todos', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return await result.json();
}

function getToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(token).accessToken;
  }

  // if we've gotten here, we need to get a refresh token.
  // 1. Do we prompt user to login again?
  // 2. Or do something else?
  return '';
}

export async function completeTodoItem(todoId) {
  const authToken = getToken();
  const result = await fetch(`http://localhost:7200/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updateComplete: true })
  });

  return result.status === 200;
}

export async function editTodoItem(todoId, name) {
  const authToken = getToken();
  const result = await fetch(`http://localhost:7200/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updatedName: name })
  });

  return result.status === 200;
}

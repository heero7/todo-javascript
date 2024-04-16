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

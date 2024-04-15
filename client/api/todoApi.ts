
export async function getAllTodos() {
  const result = await fetch('http://localhost:7200/', {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  });

  return await result.json();
}

function getToken() {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(token);
  }

  // if we've gotten here, we need to get a refresh token.
  // 1. Do we prompt user to login again?
  // 2. Or do something else?
  return '';
}

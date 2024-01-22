export function fetchTodos() {
  const raw = localStorage.getItem('todos');
  return raw ? JSON.parse(raw) : [];
}
export function saveTodos(array) {
  localStorage.setItem('todos', JSON.stringify(array));
}
import showError from "../utils/showError";

export default function getTasks() {
  const url = 'http://localhost:8080/api/get-tasks';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const request = new Request(url, options);

  const tasks = fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error('Ошибка ХТТП:' + response.status);
      return response.json();
    })
    .then((data) => data)
    .catch((error) => showError(error));
  return tasks;
}
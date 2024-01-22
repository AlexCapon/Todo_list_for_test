import showError from "../utils/showError";

export default function sendTask(task) {
  console.log('sending task', task);
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application.json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((result) => console.log('Succes', result))
    .catch((error) => showError(error));
}

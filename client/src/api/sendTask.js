import showElement from "../utils/showElement";
import showError from "../utils/showError";

export default function sendTask(task) {
  fetch('/api/add-tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(task) })
    .then((response) => response.json)
    .then((result) => showElement(result, 'result'))
    .catch((error) => showError(error.message));
}

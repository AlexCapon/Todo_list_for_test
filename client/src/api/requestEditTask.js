import showElement from "../utils/showElement";
import showError from "../utils/showError";

export default async function requestEditTask(editetTask) {
  await fetch('/api/edit-task', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editetTask) })
    .then((response) => response.json())
    .then((result) => showElement(result, 'rsult'))
    .catch((error) => showError(error.message));
}

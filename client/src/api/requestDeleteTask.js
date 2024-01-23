import showElement from "../utils/showElement";
import showError from "../utils/showError";

export default function requestDeleteTask(id) {
  fetch(`/api/delete-task/${id}`, { method: 'DELETE' })
    .then((response) => response.json)
    .then((result) => {
      showElement(result, 'result');
      return result;
    })
    .catch((error) => showError(error.message));
}

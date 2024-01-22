import PropTypes from 'prop-types';
import Input from './input';
import capitalize from '../../../client/src/utils/capitalize';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../client/src/utils/showElement';
import Selector from './selector';

export default function TaskForm({ modalId, onSubmit, data, onChange, onClose }) {
  function createTask() {
    const task = {
      id: Date.now(),
      title: capitalize(data.title),
      description: data.description,
      status: data.status,
    };
    return task;
  }
  function submitTask() {
    const task = createTask();
    onSubmit(task);
  }
return ( 
  <form id={`${modalId}_form`} className="form">
    <div id="inputsContainer" className="container">
      <Input name="title" label="Задача" type="text" value={data.title} onChange={onChange} />
      <Input name="description" label="Описание" type="text-aria" value={data.description} onChange={onChange} />
      <Selector name="status" id={modalId} data={data.status} onChange={onChange} />
    </div>
    <div id="buttonsContainer" className="container">
      <button id="submitButton"
        type="button"
        className="btn btn-primary m-1"
        onClick={submitTask}
        key="submitButton"
      >
        Ок
      </button>
      <button id="cancelButton"
        type="button"
        className="btn btn-secondary m-1"
        onClick={() => onClose(modalId)}
        key="cancelButton"
      >
        Отмена
      </button>
    </div>
  </form>
 );
}

TaskForm.propTypes = {
  modalId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

TaskForm.defaultProps = {
  modalId: 'noModal'
};
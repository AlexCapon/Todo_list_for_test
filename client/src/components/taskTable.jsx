import PropTypes from 'prop-types';
import { penpaperIcon, trashIcon } from '../assets/icons.jsx';
import { status } from '../../../client/src/constants/status.js';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../client/src/utils/showElement.js';

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <table className='table'>
      <thead className='tableHeader'>
        <tr>
          <th id='checkboxColummn'></th>
          <th>Задача</th>
          <th>Описание</th>
          <th>Статус</th>
          <th id='buttonsColummn'></th>
        </tr>
      </thead>
      <tbody id='tableBody' className='table'>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td><input className="form-check-input" type="checkbox" /></td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td className={`btn bg-${status[task.status].color} mt-2`} onClick={() => onEdit(task)}>{status[task.status].text}</td>
            <td name='buttons'>
              <button id='editBtn'
                className='btn'
                type='button'
                onClick={() => onEdit(task)}
              >
                {penpaperIcon}
              </button>
              <button id='deleteBtn'
                className='btn'
                type='button'
                onClick={() => onDelete(task.id)}
              >
                {trashIcon}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { mainColor } from '../../../client/src/constants/colors';
import closeModal from '../../../client/src/utils/closeModal';
import TaskForm from './taskForm';

export default function ModalWindow({ id, headTitle, text, onSubmit, data, onChange, onClose }) {
  return (
    <dialog id={id} className="dialog col-md-4">
      <div id="dialogContent" className="dialog-content ">
        <div className="container modal-header">
          <h3>{headTitle}</h3>
          <button id="closeButton"
            type="button"
            className="btn-close category-form-end"
            onClick={() => closeModal(id)}
            aria-label="Close"
          />
        </div>
        <div id="modalBody" className="container modal-body">
          {text ? text : <TaskForm data={data} modalId={id} onSubmit={onSubmit} onChange={onChange} onClose={onClose} />}
        </div>
        {text ? 
          <div id="modalFooter" className="container modal-buttons">
            <button id="okButton"
              type="button"
              className="btn m-1"
              style={{ backgroundColor: mainColor }}
              onClick={onSubmit(id)}
              key="submitButton"
            >
              Ок
            </button>
          </div> : ''}
      </div>
    </dialog>
  );
}
ModalWindow.propTypes = {
  id: PropTypes.string.isRequired,
  headTitle: PropTypes.string,
  text: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }),
};

ModalWindow.defaultProps = {
  headTitle: 'Ввведите данные',
  text: undefined,
  onSubmit: closeModal,
  onChange: undefined,
  data: undefined,
};

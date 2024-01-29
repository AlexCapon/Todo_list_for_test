// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../client/src/utils/showElement';

export default function Input({ name, type, value, onChange, label, error }) {
  const inputClass = 'form-contorl w-100' + (error ? ' is-invalid' : '');
  return (
    <div>
      <label htmlFor={name} className="form-label m-1">
        {label}
      </label>
      <input id={name} type={type} value={value} onChange={onChange} className={inputClass} />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};
Input.defaultProps = {
  type: 'text',
  label: '',
};

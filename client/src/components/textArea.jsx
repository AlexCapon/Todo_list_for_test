// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../client/src/utils/showElement';

export default function TextArea({ name, value, onChange, label, placeholder }) {
  const inputClass = 'form-contorl w-100';
  return (
    <div>
      <label htmlFor={name} className="form-label m-1">
        {label}
      </label>
      <textarea id={name} name={name} className={inputClass} value={value} onChange={onChange}>{placeholder}</textarea>
    </div>
  );
}
TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
TextArea.defaultProps = {
  placeholder: '',
  label: '',
};

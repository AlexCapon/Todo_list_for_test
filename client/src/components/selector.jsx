// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { status } from '../../../client/src/constants/status';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../client/src/utils/showElement';

export default function Selector({ data, onChange, name, id }) {
  const options = [status.finished, status.inProgress, status.inQue];
return ( 
  <select id={name} name="select" value={data} onChange={onChange} className="form-select" key={`${id}selector`}>
    {options.map((option) => <option value={option.status} key={id + option.status}>{option.text}</option>)}
  </select>
);
}
Selector.propTypes = {
  id: PropTypes.string,
  data: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
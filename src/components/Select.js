/**
 * Created by jedabero on 27/03/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({name, label, value, onChange, children, inputStyle, labelStyle, ...props}) => (
  <div {...props}>
    {label && <label htmlFor={name} style={labelStyle}>{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      style={inputStyle}
    >
      {children}
    </select>
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node,
  inputStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  style: PropTypes.object,
};

export default Select;
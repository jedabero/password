/**
 * Created by jedabero on 27/03/17.
 */
import React, {PropTypes} from 'react';

const Checkbox = ({name, label, value, onChange, inputStyle, ...props}) => (
  <label htmlFor={name} {...props}>
    <input
      type="checkbox"
      id={name}
      checked={value}
      style={inputStyle}
      onChange={onChange}
    /> {label}
  </label>
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  inputStyle: PropTypes.object,
  style: PropTypes.object,
};

export default Checkbox;
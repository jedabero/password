/**
 * Created by jedabero on 27/03/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const CustomSelect = ({name, label, value, onChange, children, inputStyle, labelStyle, ...props}) => (
  <FormControl {...props}>
    {label && <InputLabel htmlFor={name} style={labelStyle}>{label}</InputLabel>}
    <Select
      name={name}
      inputProps={{
        name,
        id: name,
      }}
      value={value}
      onChange={onChange}
      style={inputStyle}
    >
      {children}
    </Select>
  </FormControl>
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

export default CustomSelect;
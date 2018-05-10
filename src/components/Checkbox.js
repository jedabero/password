/**
 * Created by jedabero on 27/03/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

const CustomCheckbox = ({name, label, value, onChange, inputStyle, ...props}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={value}
        style={inputStyle}
        onChange={onChange}
        value={name}
        color="primary"
      />
    }
    label={label}
    {...props}
  />
);

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  inputStyle: PropTypes.object,
  style: PropTypes.object,
};

export default CustomCheckbox;
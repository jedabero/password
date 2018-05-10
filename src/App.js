import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import withMUIRoot from './withMUIRoot';
import Checkbox from "./components/Checkbox";
import Select from "./components/Select";

const styles = theme => ({
  selectFormControl: {
    margin: theme.spacing.unit,
    minWidth: 128,
  },
  passwordTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  static defaultProps = {
    passwordLenghts: Array.apply(null, {length: 95}).map((i, idx) => idx+6)
  };

  state = {
    password: '',
    includeUppercaseChars: true,
    includeLowercaseChars: true,
    includeNumbers: true,
    includeSpecialChars: false,
    passwordLength: 12,
    optionsDisplay: false
  };

  componentDidMount() {
    const password = this.generatePassword(this.state);
    this.setState({password});
  }

  handleButtonClick = event => this.setState(prevState => ({password: this.generatePassword(prevState)}));

  handleSelectChange = event => this.setState({passwordLength: window.parseInt(event.target.value, 10)});

  handleCheckboxChange = name => event => this.setState({[name]: event.target.checked});

  handleAdvancedOptionsButtonClick = event => this.setState(prevState => ({optionsDisplay: !prevState.optionsDisplay}));

  generateRandomNum = max => {
    const crypto = window.crypto || window.msCrypto;
    if (!crypto) {
      throw new Error('Unsupported browser.');
    }
    // http://stackoverflow.com/a/18230432
    const array = new Uint8Array(1);
    crypto.getRandomValues(array);
    const range = max + 1;
    const max_range = 256;
    if (array[0] >= Math.floor(max_range / range) * range)
      return this.generateRandomNum(max);
    return (array[0] % range);
  };

  generatePassword = options => {
    const uppercase = "ABCDEFGHJKMNPQRSTUVWXYZ";
    const lowercase = "abcdefghjkmnpqrstuvwxyz";
    const numbers = "23456789";
    const special = "!@#$%&*?";
    let candidates = '';
    if (options.includeUppercaseChars) {
      candidates += uppercase;
    }
    if (options.includeLowercaseChars) {
      candidates += lowercase;
    }
    if (options.includeNumbers) {
      candidates += numbers;
    }
    if (options.includeSpecialChars) {
      candidates += special;
    }
    let password = "";
    for (let i = 0; i < options.passwordLength; i++) {
      const randomNum = this.generateRandomNum(candidates.length);
      password += candidates.substring(randomNum, randomNum + 1);
    }
    return password;
  };

  render() {
    const {classes, passwordLenghts} = this.props;
    const {
      includeUppercaseChars, includeLowercaseChars, includeNumbers, includeSpecialChars,
      password, passwordLength, optionsDisplay
    } = this.state;
    return (
      <div className="container">
        <Typography variant="headline" component="h1">Secure Password Generator</Typography>
        <div className="info">
          <Typography component="p">
            Use this online tool to generate a strong and random password. The available characters in each set are user
            friendly - there are no ambiguous characters such as i, l, 1, o, 0, etc. Password generation is done on the
            client-side meaning no one has access to the passwords you generate here.
          </Typography>
        </div>
        <div>
          <TextField
            id="password-input"
            name="password-input"
            label="Secure Password"
            className={classes.passwordTextField}
            margin="normal"
            readOnly
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button className={classes.button} onClick={this.handleButtonClick}>
                    Generate another
                  </Button>
                </InputAdornment>
              )
            }}
          />
          <br />
          <Select
            className={classes.selectFormControl}
            name="password-length"
            label="Password Length:"
            value={passwordLength}
            onChange={this.handleSelectChange}
          >
            {passwordLenghts.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
          <br />
          <Button variant="raised" color="primary" onClick={this.handleAdvancedOptionsButtonClick}>
            Advanced Options
          </Button>
          <div style={{display: optionsDisplay ? 'block' : 'none'}}>
            <Checkbox
              name="include-uppercase-chars-checkbox"
              label="Upper-case"
              value={includeUppercaseChars}
              onChange={this.handleCheckboxChange('includeUppercaseChars')}
            />
            <Checkbox
              name="include-lowercase-chars-checkbox"
              label="Lower-case"
              value={includeLowercaseChars}
              onChange={this.handleCheckboxChange('includeLowercaseChars')}
            />
            <Checkbox
              name="include-numbers-checkbox"
              label="Numbers"
              value={includeNumbers}
              onChange={this.handleCheckboxChange('includeNumbers')}
            />
            <Checkbox
              name="include-special-chars-checkbox"
              label="Special"
              value={includeSpecialChars}
              onChange={this.handleCheckboxChange('includeSpecialChars')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withMUIRoot(withStyles(styles)(App));

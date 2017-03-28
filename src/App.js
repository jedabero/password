import React, { Component } from 'react';

import './App.css';
import Checkbox from "./components/Checkbox";
import Select from "./components/Select";

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
    passwordLength: 32
  };

  componentDidMount() {
    const password = this.generatePassword(this.state);
    this.setState({password});
  }

  handleButtonClick = event => this.setState(prevState => ({password: this.generatePassword(prevState)}));

  handleSelectChange = event => this.setState({passwordLength: parseInt(event.target.value, 10)});

  handleCheckboxChange = name => event => this.setState({[name]: event.target.checked});

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
    const {passwordLenghts} = this.props;
    const {
      password, includeUppercaseChars, includeLowercaseChars, includeNumbers, includeSpecialChars, passwordLength
    } = this.state;
    return (
      <div className="container">
        <h1>Secure Password Generator</h1>
        <div className="info">
          <p>
            Use this online tool to generate a strong and random password. The available characters in each set are user
            friendly - there are no ambiguous characters such as i, l, 1, o, 0, etc. Password generation is done on the
            client-side meaning no one has access to the passwords you generate here.
          </p>
        </div>
        <div>
          <div>
            <label htmlFor="password-input">Secure Password:</label>
            <input type="text" id="password-input" readOnly value={password}/>
            <button onClick={this.handleButtonClick}>Generate another</button>
          </div>
          <Select
            name="password-length"
            label="Password Length:"
            value={passwordLength}
            onChange={this.handleSelectChange}
          >
            {passwordLenghts.map(item => <option key={item} value={item}>{item}</option>)}
          </Select>
          <div>
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
            <button>
              Advanced Options
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/* eslint-disable no-useless-escape */
import { Link } from 'react-router-dom';
import { useState } from 'react';

import withForm from '../withForm/withForm';

import classes from './SignIn.module.scss';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [emailError, setEmailError] = useState(
    'Поле Email не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Поле пароля не может быть пустым'
  );

  const [formValid, setFormValid] = useState(false);

  if (emailError || passwordError) {
    if (formValid) setFormValid(false);
  } else if (!formValid) {
    setFormValid(true);
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный Email');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordError('Поле пароля не может быть пустым');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'Email address':
        setEmailDirty(true);
        break;
      case 'Password':
        setPasswordDirty(true);
        break;

      default:
    }
  };

  return (
    <>
      <h3>Sign In</h3>
      <p>Email address</p>
      <input
        onBlur={(e) => blurHandler(e)}
        name="Email address"
        type="text"
        placeholder="Email address"
        value={email}
        onChange={(e) => {
          emailHandler(e);
        }}
      />
      {emailDirty && emailError && (
        <div>
          <p className={classes.errorMessage}>{emailError}</p>
        </div>
      )}
      <p>Password</p>
      <input
        onBlur={(e) => blurHandler(e)}
        name="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          passwordHandler(e);
        }}
      />
      {passwordDirty && passwordError && (
        <div>
          <p className={classes.errorMessage}>{passwordError}</p>
        </div>
      )}

      <div className={classes.signInFooter}>
        <button
          disabled={!formValid}
          type="button"
          className={classes.signInButton}
        >
          Login
        </button>
        <p className={classes.signInLink}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </div>
    </>
  );
}

export default withForm(SignIn);

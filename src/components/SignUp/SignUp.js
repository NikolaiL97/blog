/* eslint-disable no-useless-escape */
import { Checkbox } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import withForm from '../withForm/withForm';

import classes from './SignUp.module.scss';

function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userNameDirty, setUsernameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false);
  const [userNameError, setUsernameError] = useState(
    'Имя пользователя не может быть пустым'
  );
  const [emailError, setEmailError] = useState(
    'Поле Email не может быть пустым'
  );
  const [passwordError, setPasswordError] = useState(
    'Your password needs to be at least 6 characters.'
  );
  const [repeatPasswordError, setRepeatPasswordError] =
    useState('Password must muth');
  const [chek, setCheck] = useState(false);
  const [formValid, setFormValid] = useState(false);

  if (
    userNameError ||
    emailError ||
    passwordError ||
    repeatPasswordError ||
    !chek
  ) {
    if (formValid) setFormValid(false);
  } else if (!formValid) {
    setFormValid(true);
  }

  const chekHandler = () => {
    setCheck((s) => !s);
  };

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

  const userNameHandler = (e) => {
    setUserName(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 20) {
      setUsernameError(
        'Имя пользователя должно включать в себя от 3-х до 20 символов'
      );
    } else {
      setUsernameError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 40) {
      setPasswordError('Your password needs to be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  };

  const repeatPasswordHandler = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value === password) {
      setRepeatPasswordError('');
    } else {
      setRepeatPasswordError('Password must muth');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'Username':
        setUsernameDirty(true);
        break;
      case 'Email address':
        setEmailDirty(true);
        break;
      case 'Password':
        setPasswordDirty(true);
        break;
      case 'Repeat Password':
        setRepeatPasswordDirty(true);
        break;

      default:
    }
  };

  return (
    <>
      <h3>Create new account</h3>
      <p>Username</p>
      <input
        onBlur={(e) => blurHandler(e)}
        name="Username"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => userNameHandler(e)}
      />
      {userNameDirty && userNameError && (
        <div>
          <p className={classes.errorMessage}>{userNameError}</p>
        </div>
      )}
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
      <p>Repeat Password</p>

      <input
        name="Repeat Password"
        type="password"
        placeholder="Password"
        onBlur={(e) => blurHandler(e)}
        value={repeatPassword}
        onChange={(e) => repeatPasswordHandler(e)}
      />
      {repeatPasswordDirty && repeatPasswordError && (
        <div>
          <p className={classes.errorMessage}>{repeatPasswordError}</p>
        </div>
      )}
      <div>
        <Checkbox onChange={chekHandler} />
        <span>I agree to the processing of my personal information</span>
      </div>
      <div className={classes.signUpFooter}>
        <button
          disabled={!formValid}
          type="button"
          className={classes.signUpButton}
        >
          Create
        </button>
        <p className={classes.signUpLink}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </div>
    </>
  );
}

export default withForm(SignUp);

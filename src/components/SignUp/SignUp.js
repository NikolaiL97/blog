/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import { Checkbox } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import withForm from '../withForm/withForm';
import { postUser } from '../../service/fetchApi';
import { isUsername } from '../utilits';
import Button from '../Button/Button';

import classes from './SignUp.module.scss';

function SignUp() {
  const [chek, setCheck] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: 'Lexaaas',
      emailAddress: 'plexaaaaaas@test.ru',
      password: '123456',
      repeatPassword: '123456',
    },
  });
  const navigate = useNavigate();

  const chekHandler = (e) => setCheck(e.target.checked);

  const errorFn = () => {
    setError(true);
  };

  const onSubmit = ({ username, emailAddress, password }) => {
    const body = {
      user: {
        username,
        email: emailAddress,
        password,
      },
    };
    postUser(body)
      .then((res) => {
        if (res.errors) {
          setErrorUsername(res.errors.username);
          setErrorEmail(res.errors.email);
        } else {
          navigate('/sign-in');
        }
      })
      .catch(() => errorFn());
  };

  const isPassword = (data) => setUserPassword(data);

  const isRepeatPassword = (data) => {
    if (data === userPassword) {
      return true;
    }
    return 'Passwords must match';
  };

  return error ? (
    <ErrorIndicator />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formSign}>
      <h3>Create new account</h3>
      <p>Username</p>
      <input
        className={(errors.username || errorUsername) && classes.errorBorder}
        type="text"
        placeholder="Username"
        {...register('username', {
          required: true,
          validate: isUsername,
        })}
      />
      {errorUsername && <p className={classes.errorMessage}>{errorUsername}</p>}
      <p>Email address</p>
      <input
        className={(errors.emailAddress || errorEmail) && classes.errorBorder}
        type="email"
        placeholder="Email address"
        {...register('emailAddress', {
          required: 'This field is req',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i,
            message: 'This field is requared',
          },
        })}
      />
      {errorEmail && <p className={classes.errorMessage}>{errorEmail}</p>}
      <p>Password</p>

      <input
        className={errors.password && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Your password needs to be at least 6 characters',
          validate: isPassword,
          minLength: {
            value: 6,
            message: 'Your password needs to be at least 6 characters',
          },
          maxLength: {
            value: 40,
            message: 'Your password must contain no more than 40 characters',
          },
        })}
      />
      {errors.password && (
        <p className={classes.errorMessage}>{errors.password.message}</p>
      )}
      <p>Repeat Password</p>

      <input
        className={errors.repeatPassword && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('repeatPassword', {
          required: 'Passwords must match',
          validate: isRepeatPassword,
        })}
      />
      {errors.repeatPassword && (
        <p className={classes.errorMessage}>{errors.repeatPassword.message}</p>
      )}
      <div>
        <Checkbox onChange={(e) => chekHandler(e)} />
        <span>I agree to the processing of my personal information</span>
      </div>
      <div className={classes.signUpFooter}>
        <Button
          disabled={
            errors.username ||
            errors.emailAddress ||
            errors.password ||
            errors.repeatPassword ||
            !chek
          }
          title="Create"
        />
        <p className={classes.signUpLink}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </div>
    </form>
  );
}

export default withForm(SignUp);

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import withForm from '../withForm/withForm';
import { fetchArticles, signInUser } from '../../service/fetchApi';
import { userAction } from '../store/userSlice/userSlice';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import { addToArticles } from '../store/articlesSlice/articlesSlice';

import classes from './SignIn.module.scss';

function SignIn() {
  const [errorSignIn, setErrorSignIn] = useState('');
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorFn = () => {
    setError(true);
  };

  const onSubmit = ({ email, password }) => {
    const body = {
      user: {
        email,
        password,
      },
    };
    signInUser(body)
      .then((res) => {
        if (res.errors) {
          setErrorSignIn('Data is invalid');
        } else {
          res.user.password = password;
          dispatch(userAction.addToUser(res.user));
          localStorage.setItem('user', JSON.stringify(res.user));
          fetchArticles(0, res.user.token).then((item) => {
            dispatch(addToArticles(item));
            navigate('/');
          });
        }
      })
      .catch(() => errorFn());
  };

  return error ? (
    <ErrorIndicator />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formSign}>
      <h3>Sign In</h3>
      <p>Email address</p>
      <input
        className={(errors.email || errorSignIn) && classes.errorBorder}
        type="email"
        placeholder="Email address"
        {...register('email', {
          required: 'This field is requared',
        })}
      />
      {errors.email && (
        <p className={classes.errorMessage}>{errors.email.message}</p>
      )}
      <p>Password</p>
      <input
        className={(errors.password || errorSignIn) && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'This field is requared',
        })}
      />
      {errors.password && (
        <p className={classes.errorMessage}>{errors.password.message}</p>
      )}
      {errorSignIn && <p className={classes.errorMessage}>{errorSignIn}</p>}
      <button
        disabled={errors['email address'] || errors.password}
        type="submit"
        className={classes.signInButton}
      >
        Login
      </button>
      <p className={classes.signInLink}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
}

export default withForm(SignIn);

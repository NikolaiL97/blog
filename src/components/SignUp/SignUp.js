/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import { Checkbox } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

import withForm from '../withForm/withForm';
// import { userAction } from '../store/user/user';
import { postUser } from '../../service/fetchApi';
import { isUsername } from '../utilits';
import Button from '../Button/Button';

import classes from './SignUp.module.scss';

function SignUp() {
  const [chek, setCheck] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '123lolcec',
      emailAddress: 'testoo@test.ru',
      password: '123456',
      repeatPassword: '123456',
    },
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const chekHandler = (e) => setCheck(e.target.checked);

  const onSubmit = ({ username, emailAddress, password }) => {
    console.log(typeof emailAddress);
    const body = {
      user: {
        username,
        email: emailAddress,
        password,
      },
    };
    console.log(JSON.stringify(body));
    postUser(body)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch(Error);
    // dispatch(userAction.addToUser(data));
  };

  const isPassword = (data) => setUserPassword(data);

  const isRepeatPassword = (data) => {
    if (data === userPassword) {
      return true;
    }
    return 'Passwords must match';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formSign}>
      <h3>Create new account</h3>
      <p>Username</p>
      <input
        className={errors.username && classes.errorBorder}
        type="text"
        placeholder="Username"
        {...register('username', {
          required: true,
          validate: isUsername,
        })}
      />

      <p>Email address</p>
      <input
        className={errors.emailAddress && classes.errorBorder}
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

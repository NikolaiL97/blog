import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { UseUser, isUrl, isUsername } from '../utilits';
import withForm from '../withForm/withForm';
import Button from '../Button/Button';
import { putUser } from '../../service/fetchApi';
import { userAction } from '../store/userSlice/userSlice';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

import classes from './profile.module.scss';

function Profile() {
  const [error, setError] = useState(false);
  const { username, email, token } = UseUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlure',
    defaultValues: {
      Username: `${username}`,
      emailAddress: `${email}`,
      Password: null,
      avatarImage: null,
    },
  });

  const errorFn = () => {
    setError(true);
  };

  const submit = ({ emailAddress, Username, Password, avatarImage }) => {
    const body = {
      user: {
        email: emailAddress,
        username: Username,
        password: Password,
        image: avatarImage,
      },
    };
    putUser(JSON.parse(token), body)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        dispatch(userAction.addToUser(res.user));
        navigate('/');
      })
      .catch(() => errorFn());
  };

  return error ? (
    <ErrorIndicator />
  ) : (
    <form onSubmit={handleSubmit(submit)} className={classes.formSign}>
      <h3>Edit Profile</h3>
      <p>Username</p>
      <input
        className={errors.Username && classes.errorBorder}
        type="text"
        placeholder="Username"
        {...register('Username', {
          required: 'This field is requared',
          validate: isUsername,
        })}
      />
      <p>Email address</p>
      <input
        className={errors.emailAddress && classes.errorBorder}
        type="email"
        placeholder="Email address"
        {...register('emailAddress', {
          required: 'This field is requared',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i,
            message: 'This field is requared',
          },
        })}
      />
      <p>Password</p>
      <input
        className={errors.Password && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('Password', {
          required: 'Your password needs to be at least 6 characters',
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
      <p>Avatar image (url)</p>
      <input
        className={errors.avatarImage && classes.errorBorder}
        type="url"
        placeholder="Avatar image"
        {...register('avatarImage', {
          required: 'This field is requared',
          validate: isUrl,
        })}
      />
      <Button
        title="Save"
        disabled={
          errors.username ||
          errors.emailAddress ||
          errors.password ||
          errors.avatarImage
        }
      />
    </form>
  );
}

export default withForm(Profile);

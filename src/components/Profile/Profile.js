import { useForm } from 'react-hook-form';

import { isUrl, isUsername } from '../utilits';
import withForm from '../withForm/withForm';
import Button from '../Button/Button';

import classes from './profile.module.scss';

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlure',
    defaultValues: {
      username: '123',
      emailAddress: 'test@test.ru',
      password: '123456',
    },
  });

  const submit = (data) => {
    console.log(data);
  };

  const error = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(submit, error)} className={classes.formSign}>
      <h3>Edit Profile</h3>
      <p>Username</p>
      <input
        className={errors.username && classes.errorBorder}
        type="text"
        placeholder="Username"
        {...register('username', {
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
        className={errors.password && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('password', {
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

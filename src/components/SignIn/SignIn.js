import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import withForm from '../withForm/withForm';

import classes from './SignIn.module.scss';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: 'test@test.ru',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formSign}>
      <h3>Sign In</h3>
      <p>Email address</p>
      <input
        className={errors['email address'] && classes.errorBorder}
        type="email"
        placeholder="Email address"
        {...register('email address', {
          required: 'This field is requared',
        })}
      />
      {errors['email address'] && (
        <p className={classes.errorMessage}>
          {errors['email address'].message}
        </p>
      )}
      <p>Password</p>
      <input
        className={errors.password && classes.errorBorder}
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'This field is requared',
        })}
      />
      {errors.password && (
        <p className={classes.errorMessage}>{errors.password.message}</p>
      )}
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

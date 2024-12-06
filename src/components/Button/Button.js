import classes from './Button.module.scss';

function Button({ title, disabled }) {
  return (
    <button disabled={disabled} type="submit" className={classes.button}>
      {title}
    </button>
  );
}

export default Button;

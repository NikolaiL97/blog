import classes from './withForm.module.scss';

const withForm = (Component) =>
  function f() {
    return (
      <div className={classes.sign}>
        <Component />
      </div>
    );
  };

export default withForm;

import classes from './withForm.module.scss';

const withForm = (Component) => {
  console.log(Component);
  return function f() {
    return (
      <div className={classes.sign}>
        <form className={classes.formSign}>
          <Component />
        </form>
      </div>
    );
  };
};

export default withForm;

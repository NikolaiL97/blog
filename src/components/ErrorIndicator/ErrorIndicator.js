import classes from './ErrorIndicator.module.scss';

function ErrorIndicator() {
  return (
    <div className={classes.errorIndicator}>
      <p> Возникла непредвиденная ошибка, попробуйте перезагрузить страницу</p>
    </div>
  );
}

export default ErrorIndicator;

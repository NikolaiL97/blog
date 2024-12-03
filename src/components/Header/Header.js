import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

function Header() {
  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.headerName}>
        Realworld Blog
      </Link>

      <div className={classes.sign}>
        <Link to="/sign-in">
          <button className={classes.buttonSign} type="button">
            Sign in
          </button>
        </Link>
        <Link to="/sign-up">
          <button className={classes.buttonSign} type="button">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;

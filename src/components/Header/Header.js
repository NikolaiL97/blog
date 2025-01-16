import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { UseUser } from '../utilits';
import { userAction } from '../store/userSlice/userSlice';
import { fetchArticles } from '../../service/fetchApi';
import { getUpdateArticle } from '../store/articlesSlice/articlesSlice';

import classes from './Header.module.scss';

function Header() {
  const { isUser, username, image } = UseUser();
  const dispatch = useDispatch();

  const LogOutClick = () => {
    localStorage.removeItem('user');
    dispatch(userAction.logOutUser());
    fetchArticles().then(dispatch(getUpdateArticle()));
  };
  console.log('test-2');

  return (
    <div className={classes.header}>
      <Link to="/articles" className={classes.headerName}>
        Realworld Blog
      </Link>
      {!isUser ? (
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
      ) : (
        <div className={classes.sign}>
          <Link to="/new-article">
            <button className={classes.buttonCreateArticle} type="button">
              Create article
            </button>
          </Link>
          <Link to="/profile">
            <div className={classes.signUser}>
              {username}
              {image && <img src={image} alt="logo" height={46} width={46} />}
            </div>
          </Link>
          <Link to="/sign-in">
            <button
              className={classes.buttonLogOut}
              type="button"
              onClick={LogOutClick}
            >
              Log Out
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;

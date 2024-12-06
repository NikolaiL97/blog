import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import withHeader from '../withHeader/withHeader';
import PaperList from '../PaperList/PaperList';
import PaperInfo from '../PaperInfo/PaperInfo';
import { fetchArticles } from '../../service/fetchApi';
import { addToArticles } from '../store/articlesSlice/articlesSlice';
import { UseStore } from '../utilits';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';

import classes from './content.module.scss';

function Content() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const { offSet } = UseStore();

  const onError = () => {
    setError(true);
  };

  useEffect(() => {
    fetchArticles(offSet)
      .then((body) => {
        dispatch(addToArticles(body));
      })
      .catch(onError);
  }, [offSet, dispatch]);

  return (
    <div className={classes.content}>
      <Routes>
        <Route
          path="/articles?"
          exact
          Component={!error ? PaperList : ErrorIndicator}
        />
        <Route path="/articles/:id" Component={PaperInfo} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/profile" Component={Profile} />
        <Route path="*" Component={ErrorIndicator} />
      </Routes>
    </div>
  );
}

export default withHeader(Content);

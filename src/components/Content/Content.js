import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import withHeader from '../withHeader/withHeader';
import PaperList from '../PaperList/PaperList';
import PaperInfo from '../PaperInfo/PaperInfo';
import { fetchArticles } from '../../service/fetchApi';
import { actions } from '../store/articles/articles';
import UseStore from '../utilits';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

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
        console.log(body);
        dispatch(actions.addToArticles(body));
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
        <Route path="*" Component={ErrorIndicator} />
      </Routes>
    </div>
  );
}

export default withHeader(Content);

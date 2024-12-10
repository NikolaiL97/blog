/* eslint-disable no-nested-ternary */
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Paper from '../Paper/Paper';

import classes from './PaperInfo.module.scss';

function PaperInfo() {
  const loading = useSelector((state) => state.articleSlug.loading);
  const error = useSelector((state) => state.articleSlug.error);

  return (
    <div className={classes.center}>
      {loading ? <Spin /> : error ? <ErrorIndicator /> : <Paper />}
    </div>
  );
}

export default PaperInfo;

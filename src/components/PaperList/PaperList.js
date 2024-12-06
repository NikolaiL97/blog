import { Spin } from 'antd';

import Paginations from '../Paginations/Paginations';
import Paper from '../Paper/Paper';
import { UseStore } from '../utilits';

import classes from './PaperList.module.scss';

function PaperList() {
  const { articles, loader } = UseStore();
  const elem = articles?.map((el) => (
    <Paper key={el.slug} article={el} Componet={{}} />
  ));
  const spinner = loader ? (
    <div className={classes.spinner}>
      <Spin />
    </div>
  ) : null;

  return (
    <div className={classes.centr}>
      <div>
        {elem} {spinner}
      </div>
      <div>
        <Paginations />
      </div>
    </div>
  );
}

export default PaperList;

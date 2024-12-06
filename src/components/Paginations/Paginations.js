import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';

import { getPage } from '../store/articlesSlice/articlesSlice';
import { UseStore } from '../utilits';

function Paginations() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(getPage(current));
  }, [current, dispatch]);

  const { articlesCount } = UseStore();

  const onChange = (page) => {
    setCurrent(page);
  };
  return (
    <Pagination
      current={current}
      onChange={onChange}
      total={articlesCount}
      defaultPageSize={5}
      showSizeChanger={false}
    />
  );
}
export default Paginations;

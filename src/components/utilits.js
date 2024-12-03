import { useSelector } from 'react-redux';

const UseStore = () =>
  useSelector((state) => {
    const { articles, loader, articlesCount, page, articleSlug } = state;

    const offSet = (page - 1) * 5;

    return { articles, loader, offSet, articlesCount, articleSlug };
  });

export default UseStore;

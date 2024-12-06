import { useSelector } from 'react-redux';

export const UseStore = () => {
  const { articles, loader, articlesCount, page, articleSlug } = useSelector(
    (state) => state.article
  );
  const offSet = (page - 1) * 5;

  return {
    articles,
    loader,
    offSet,
    articlesCount,
    articleSlug,
  };
};

export const UseAuth = () => {
  const { emailAddress, password, username } = useSelector(
    (state) => state.user
  );
  return {
    isAuth: !!emailAddress,
    emailAddress,
    password,
    username,
  };
};

export const isUsername = (data) => !!(data.length > 2 && data.length < 21);

export const isUrl = (data) =>
  URL.canParse(data) ? true : 'This url is not valid';

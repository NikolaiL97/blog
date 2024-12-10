import { useSelector } from 'react-redux';

export const UseStore = () => {
  const { articles, loader, articlesCount, page } = useSelector(
    (state) => state.article
  );
  const offSet = (page - 1) * 5;

  return {
    articles,
    loader,
    offSet,
    articlesCount,
  };
};

export const UseUser = () => {
  const { username, email, token, password, image } = useSelector(
    (state) => state.user
  );
  return {
    isUser: !!username,
    username,
    email,
    token,
    password,
    image,
  };
};

export const UseArticleSlug = () => {
  const { articleSlug } = useSelector((state) => state);
  return {
    articleSlug,
  };
};

export const isUsername = (data) => !!(data.length > 2 && data.length < 21);

export const isUrl = (data) =>
  URL.canParse(data) || null ? true : 'This url is not valid';

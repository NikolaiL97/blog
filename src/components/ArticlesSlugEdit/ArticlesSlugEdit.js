import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { updateArticle } from '../../service/fetchApi';
import ArticleForm from '../ArticleForm/ArticleForm';
import { UseArticleSlug, UseUser } from '../utilits';
import { getUpdateArticle } from '../store/articlesSlice/articlesSlice';

function ArticlesSlugEdit() {
  const [arrTag, setArrTag] = useState(null);
  const { articleSlug } = UseArticleSlug();
  const { token } = UseUser();
  const { slug } = articleSlug.articles;
  const { tagList } = articleSlug.articles;
  const [errorUpdate, setErrorUpdate] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = ({ title, description, body }) => {
    const newArticle = {
      article: {
        title,
        description,
        body,
      },
    };
    updateArticle(token, slug, newArticle).then((res) => {
      if (!res.ok) {
        setErrorUpdate('You are not the author of this article');
      } else {
        dispatch(getUpdateArticle());
        navigate('/');
      }
    });
  };

  if (!arrTag) {
    setArrTag(tagList);
  }

  return (
    <ArticleForm
      articles={articleSlug.articles}
      onSubmit={onSubmit}
      errorUpdate={errorUpdate}
      arrTag={arrTag}
      titleForm="Edit article"
      isEdit="true"
    />
  );
}

export default ArticlesSlugEdit;

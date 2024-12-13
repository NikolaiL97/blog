import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { createArticle } from '../../service/fetchApi';
import { UseUser } from '../utilits';
import { getUpdateArticle } from '../store/articlesSlice/articlesSlice';
import ArticleForm from '../ArticleForm/ArticleForm';

function NewArticle() {
  const { token } = UseUser();
  const [arrTag, setArrTag] = useState(['']);
  const [tag, setTag] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addTagHandler = () => {
    const newArrTag = [...arrTag];
    newArrTag.push(arrTag[arrTag.length - 1] + 1);
    setArrTag(newArrTag);
  };

  const onDeleteTag = (id) => {
    setArrTag(arrTag.filter((item) => item !== id));
    const newTag = tag.filter((item, idx) => idx !== id - 1);
    setTag(newTag);
  };

  const onSubmit = ({ title, description, body, ...tAg }) => {
    let tagList = Object.values(tAg);
    tagList = tagList.filter((item) => item !== '');
    const art = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    createArticle(token, art).then(() => {
      dispatch(getUpdateArticle());
      navigate('/');
    });
  };

  return (
    <ArticleForm
      onSubmit={(e) => onSubmit(e)}
      addTagHandler={() => addTagHandler()}
      onDeleteTag={onDeleteTag}
      arrTag={arrTag}
      titleForm="Create new article"
    />
  );
}

export default NewArticle;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Popconfirm } from 'antd';

import Likes from '../../images/Likes.svg';
import isLikes from '../../images/isLikes.svg';
import { UseArticleSlug, UseUser } from '../utilits';
import { fetchASlug } from '../store/articleSlugSlice/articleSlug';
import { deleteArticle, slugFavorite } from '../../service/fetchApi';
import { getUpdateArticle } from '../store/articlesSlice/articlesSlice';

import classes from './Paper.module.scss';

function Paper({ article }) {
  const dispatch = useDispatch();
  const [isBody, setIsBody] = useState(false);
  const [errorDelete, setErrorDelete] = useState('');
  const { isUser, token } = UseUser();
  const navigate = useNavigate();
  if (!article) {
    if (!isBody) {
      setIsBody(true);
    }

    const { articleSlug } = UseArticleSlug();
    article = articleSlug.articles;
  }

  const {
    title,
    tagList,
    body,
    author,
    createdAt,
    slug,
    favoritesCount,
    favorited,
  } = article;
  const { username, image = '' } = author;
  const createdDate = format(new Date(createdAt), 'PP');
  const tag = tagList?.map((el, idx) => (
    <span key={`${slug}-${idx + 1}`} className={classes.tagItem}>
      {el}
    </span>
  ));

  const onClickHandler = (slu) => {
    dispatch(fetchASlug(slu));
  };

  const onClickEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const onClickLikes = () => {
    if (!favorited) {
      slugFavorite(slug, token).then(() => {
        dispatch(getUpdateArticle());
      });
    }
  };

  const onDeleteArticle = () => {
    deleteArticle(slug, token).then((res) => {
      if (!res.ok) {
        setErrorDelete('You are not the author of this article');
      } else {
        dispatch(getUpdateArticle());
        navigate('/');
      }
    });
  };

  return (
    <div className={`${classes.pep} ${isBody && classes.pepIsBody}`}>
      <div className={classes.paper}>
        <div className={classes.paperInfo}>
          <div>
            <Link
              to={`/articles/${slug}`}
              className={classes.paperName}
              onClick={() => onClickHandler(slug)}
            >
              {title}
            </Link>
            <img
              src={favorited ? isLikes : Likes}
              alt="Likes"
              className={classes.paperLikes}
              onClick={onClickLikes}
              onKeyDown={onClickLikes}
            />
            <span className={classes.paperCounterLikes}>{favoritesCount}</span>
          </div>
          <div className={`${classes.tag} ${isBody && classes.tagIsBody}`}>
            {tag}
          </div>
          <div
            className={`${classes.description} ${isBody && classes.descriptionIsBody}`}
          >
            <Markdown>{article.description}</Markdown>
          </div>
        </div>
        <div className={classes.paperPeopleButton}>
          <div className={classes.paperPeople}>
            <div>
              <p className={classes.userName}>{username}</p>
              <p className={classes.date}>{createdDate}</p>
            </div>
            <div>
              <img
                src={image}
                alt="logo"
                height={46}
                width={46}
                className={classes.imageLogo}
              />
            </div>
          </div>
          {isBody && isUser ? (
            <div className={classes.buttonArticle}>
              <Popconfirm
                title="Are you sure to delete this article?"
                cancelText="No"
                okText="Yes"
                placement="rightTop"
                onConfirm={() => onDeleteArticle()}
              >
                <button className={classes.buttonDelete} type="button">
                  Delete
                </button>
              </Popconfirm>
              <button
                className={classes.buttonEdit}
                onClick={onClickEdit}
                type="button"
              >
                Edit
              </button>
            </div>
          ) : null}
          {errorDelete && <p className={classes.errorMessage}>{errorDelete}</p>}
        </div>
      </div>
      {isBody && <Markdown>{body}</Markdown>}
    </div>
  );
}

export default Paper;

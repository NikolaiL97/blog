import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Likes from '../../images/Likes.svg';
// import { getArticleSlug } from '../store/articlesSlice/articlesSlice';
import { UseArticleSlug } from '../utilits';
import { fetchASlug } from '../store/articleSlugSlice/articleSlug';

import classes from './Paper.module.scss';

function Paper({ article }) {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(false);

  if (!article) {
    if (!desc) {
      setDesc(true);
    }

    const { articleSlug } = UseArticleSlug();
    article = articleSlug.articles;
  }

  const { title, tagList, body, author, createdAt, slug, favoritesCount } =
    article;
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

  return (
    <div className={`${classes.pep} ${desc && classes.pepDesc}`}>
      <div className={classes.paper}>
        <div className={classes.paperInfo}>
          <div>
            <Link
              to={`/articles/${slug}`}
              // to="/"
              className={classes.paperName}
              onClick={() => onClickHandler(slug)}
            >
              {title}
            </Link>
            <img src={Likes} alt="Likes" className={classes.paperLikes} />
            <span className={classes.paperCounterLikes}>{favoritesCount}</span>
          </div>
          <div className={`${classes.tag} ${desc && classes.tagDesc}`}>
            {tag}
          </div>
          <div className={`${classes.body} ${desc && classes.bodyDesc}`}>
            <Markdown>{body}</Markdown>
          </div>
        </div>
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
      </div>
      {desc && <Markdown>{article.description}</Markdown>}
    </div>
  );
}

export default Paper;

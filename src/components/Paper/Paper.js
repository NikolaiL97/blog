import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useDispatch } from 'react-redux';

import Likes from '../../images/Likes.svg';
import { fetchArticleSlug } from '../../service/fetchApi';
import { actions } from '../store/articles/articles';
import UseStore from '../utilits';

import classes from './Paper.module.scss';

function Paper({ article }) {
  console.log(article);
  const dispatch = useDispatch();
  if (!article) {
    const { articleSlug } = UseStore();
    console.log(articleSlug);
    article = articleSlug;
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
    fetchArticleSlug(slu).then((item) => {
      console.log(item);
      dispatch(actions.getArticleSlug(item));
    });
  };

  return (
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
          <img src={Likes} alt="Likes" className={classes.paperLikes} />
          <span className={classes.paperCounterLikes}>{favoritesCount}</span>
        </div>
        <div className={classes.tag}>{tag}</div>
        <div className={classes.body}>
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
  );
}

export default Paper;

import { useForm } from 'react-hook-form';

import Button from '../Button/Button';

import classes from './ArticleForm.module.scss';

function ArticleForm({
  onSubmit,
  onDeleteTag,
  arrTag,
  addTagHandler,
  articles,
  errorUpdate,
  titleForm,
  isEdit,
}) {
  let title = '';
  let description = '';
  let body = '';
  let tagList = '';

  if (articles) {
    title = articles.title;
    description = articles.description;
    body = articles.body;
    tagList = articles.tagList;
  }
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: `${title}`,
      description: `${description}`,
      body: `${body}`,
    },
  });

  const elem = arrTag?.map((item, idx) => (
    <div key={`${item}-${idx + 100}`}>
      <input
        className={classes.tagInput}
        type="text"
        placeholder="Tag"
        {...register(`tag-${item}`, {
          required: 'This field is required',
        })}
        defaultValue={tagList && tagList[idx]}
      />
      <button
        type="button"
        onClick={() => onDeleteTag(item, idx)}
        disabled={isEdit}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className={classes.form}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e))}
        className={`${classes.newArticle} ${errorUpdate && classes.errorUpdate}`}
      >
        {errorUpdate && <h3 className={classes.errorMessage}>{errorUpdate}</h3>}
        <h3>{titleForm}</h3>
        <p>Title</p>
        <input
          type="text"
          placeholder="Title"
          {...register('title', {
            required: true,
          })}
        />

        <p>Short description</p>
        <input
          type="text"
          placeholder="Short description"
          {...register('description', {
            required: 'This field is required',
          })}
        />

        <p>Text</p>
        <textarea
          className={classes.textArea}
          type="text"
          placeholder="Text"
          {...register('body', {
            required: 'This field is required',
          })}
        />
        <div className={classes.tagsAdd}>
          <div className={classes.tags}>{elem}</div>

          <button
            type="button"
            onClick={() => addTagHandler()}
            className={classes.addButton}
            disabled={isEdit}
          >
            Add tag
          </button>
        </div>

        <div className={classes.buttonSend}>
          <Button disabled={false} title="Send" />
        </div>
      </form>
    </div>
  );
}

export default ArticleForm;

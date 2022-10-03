import { uniqueId } from 'lodash';

import validate from './validate.js';
import loader from './loader.js';
import parser from './parser.js';

const handleSubmitForm = (e, state, watchedState) => {
  e.preventDefault();
  const currentWatchedState = watchedState;
  const formData = new FormData(e.target);
  const url = formData.get('url').trim();

  currentWatchedState.processState = 'sending';

  validate(url, watchedState)
    .then(() => { currentWatchedState.processError = null; })
    .then(() => loader(url))
    .then((data) => {
      const { feed, posts } = parser(data, uniqueId());
      currentWatchedState.processState = 'finished';
      state.listRSS.push(url);
      currentWatchedState.feeds = [feed, ...state.feeds];
      currentWatchedState.posts = [...posts, ...state.posts];
    })
    .catch((error) => {
      currentWatchedState.processState = 'failed';
      currentWatchedState.processError = error.message;
    });
};

const handleShowPost = ({ target }, post, state, { modal }) => {
  const {
    body, title, linkArticle,
  } = modal;
  const { watchedPosts } = state.ui;

  title.textContent = post.title;
  body.textContent = post.description;

  linkArticle.href = post.link;

  watchedPosts.push(post.id);

  const postTitle = target.previousElementSibling;
  postTitle.classList.add('fw-normal', 'link-secondary');
  postTitle.classList.remove('fw-bold');
};

export { handleSubmitForm, handleShowPost };

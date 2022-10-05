/* eslint-disable no-param-reassign */
import { uniqueId } from 'lodash';

import validate from './validate.js';
import loader from './loader.js';
import parser from './parser.js';

const handleSubmitForm = (e, state, watchedState) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url').trim();

  watchedState.processState = 'sending';

  validate(url, watchedState)
    .then(() => { watchedState.processError = null; })
    .then(() => loader(url))
    .then((data) => parser(data, uniqueId()))
    .then(({ feed, posts }) => {
      watchedState.processState = 'finished';
      state.listRSS.push(url);
      state.ui.activeTab = feed.id;
      watchedState.feeds = [feed, ...state.feeds];
      watchedState.posts = [...posts, ...state.posts];
    })
    .catch((error) => {
      watchedState.processState = 'failed';
      watchedState.processError = error.message;
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

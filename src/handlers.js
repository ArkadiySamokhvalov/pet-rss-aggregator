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
    .then((response) => {
      state.listRSS.push(url);
      currentWatchedState.processState = 'finished';
      const { feed, posts } = parser(response.data.contents, uniqueId());
      currentWatchedState.feeds = [feed, ...state.feeds];
      currentWatchedState.posts = [...posts, ...state.posts];
    })
    .catch((error) => {
      currentWatchedState.processState = 'failed';
      currentWatchedState.processError = error.type;
      console.log(error);
    });
};

export default handleSubmitForm;

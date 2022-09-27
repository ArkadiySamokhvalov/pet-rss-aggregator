/* eslint-disable no-param-reassign */
import validate from './validate.js';

const handleSubmitForm = (e, watchedState) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const value = data.get('url');

  watchedState.processState = 'sending';

  validate(value, watchedState);
};

export default handleSubmitForm;

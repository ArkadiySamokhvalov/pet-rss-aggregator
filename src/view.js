import onChange from 'on-change';
// import _ from 'lodash';

const renderError = (error, elements, i18n) => {
  const { input, feedback } = elements;
  if (error) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.classList.remove('text-success');
    feedback.textContent = i18n(`errors.${error}`);
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = i18n('succesfulUpload');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }
};

export default (state, elements, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    console.log(path, value);
    switch (path) {
      case 'processError':
        renderError(value, elements, i18n);
        break;

      default:
        break;
    }
  });

  return watchedState;
};

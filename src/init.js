import i18next from 'i18next';

import resources from './locales/index.js';
import render from './view.js';
import handleSubmitForm from './handlers.js';

const app = (i18n) => {
  const state = {
    processState: 'filling',
    processError: '',
    listRSS: [],
    feeds: [],
    posts: [],
  };

  const elements = {
    modal: {
      btnsClose: document.querySelectorAll('[data-bs-dismiss="modal"]'),
      linkArticle: document.querySelector('.link-article'),
    },
    form: document.querySelector('.rss-form'),
    input: document.getElementById('url-input'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    feedback: document.querySelector('.feedback'),
  };

  const watchedState = render(state, elements, i18n);
  const { form } = elements;

  form.addEventListener('submit', (e) => handleSubmitForm(e, watchedState));
};

export default () => {
  const i18nextInstance = i18next.createInstance();
  const currentLanguage = localStorage.getItem('language') || 'ru';

  i18nextInstance.init({
    lng: currentLanguage,
    debug: true,
    resources,
  }).then((t) => app(t));
};

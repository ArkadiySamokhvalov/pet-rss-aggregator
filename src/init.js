import i18next from 'i18next';

import updateRss from './updateRss.js';
import resources from './locales/index.js';
import render from './view.js';
import { handleSubmitForm } from './handlers.js';

const elements = {
  modal: {
    body: document.querySelector('.modal-body'),
    title: document.querySelector('.modal-title'),
    linkArticle: document.querySelector('.link-article'),
  },
  form: document.querySelector('.rss-form'),
  input: document.getElementById('url-input'),
  submitBtn: document.querySelector('[type="submit"]'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
  feedback: document.querySelector('.feedback'),
};

const state = {
  processState: 'filling',
  processError: '',
  listRSS: [],
  feeds: [],
  posts: [],
  ui: {
    watchedPosts: [],
    activeTab: null,
  },
};

const app = (i18n) => {
  const watchedState = render(state, elements, i18n);

  const updateData = () => {
    updateRss(state, watchedState);
    setTimeout(updateData, 5000);
  };
  updateData();

  elements.form.addEventListener('submit', (e) => handleSubmitForm(e, state, watchedState));
};

export default () => {
  const i18nextInstance = i18next.createInstance();
  const currentLanguage = localStorage.getItem('language') || 'ru';

  i18nextInstance
    .init({
      lng: currentLanguage,
      debug: false,
      resources,
    })
    .then((t) => app(t));
};

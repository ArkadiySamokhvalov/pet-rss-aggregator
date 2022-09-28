/* eslint-disable no-param-reassign */
import onChange from 'on-change';
// import _ from 'lodash';

const renderError = (error, { input, feedback }, i18n) => {
  if (error) {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
    feedback.classList.remove('text-success');
    feedback.textContent = i18n(`errors.${error}`);
  }
};

const renderSuccessfulFeedback = ({ input, feedback }, i18n) => {
  input.classList.remove('is-invalid');
  feedback.textContent = i18n('succesfulUpload');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
};

const generateContainer = (title, list) => {
  const card = document.createElement('div');
  const cardHeader = document.createElement('div');
  const cardBody = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  card.classList.add('card', 'border-0');
  cardHeader.classList.add('card-header');
  cardBody.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  h2.textContent = title;

  ul.append(...list);
  cardBody.append(ul);
  cardHeader.append(h2);
  card.append(cardHeader);
  card.append(cardBody);

  return card;
};

const generatePostsList = (posts, i18n) => posts.map((post) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const button = document.createElement('button');

  a.textContent = post.title;
  button.textContent = i18n('watchButton');

  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  a.classList.add('fw-normal', 'link-secondary');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

  a.href = post.link;
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');

  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');

  li.append(a);
  li.append(button);

  return li;
});

const renderPosts = (posts, elements, i18n) => {
  const postList = generatePostsList(posts, i18n);
  const container = generateContainer(i18n('posts'), postList);

  elements.posts.append(container);
};

const generateFeedsList = (feeds) => feeds.map((feed) => {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  h3.textContent = feed.title;
  p.textContent = feed.description;

  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  h3.classList.add('h6', 'm-0');
  p.classList.add('m-0', 'small', 'text-black-50');

  li.append(h3);
  li.append(p);

  return li;
});

const renderFeeds = (feeds, elements, i18n) => {
  const feedsList = generateFeedsList(feeds);
  const container = generateContainer(i18n('feeds'), feedsList);

  elements.feeds.append(container);
};

const renderSpinner = (container) => {
  const spinner = document.createElement('div');
  const text = document.createElement('span');

  spinner.classList.add('spinner-border', 'text-light');
  text.classList.add('sr-only');

  spinner.setAttribute('role', 'status');

  container.textContent = '';
  container.append(spinner);
  container.append(text);
};

const handleProcessState = (processState, elements, i18n) => {
  const {
    submitBtn, form, input,
  } = elements;

  switch (processState) {
    case 'filling':
      submitBtn.classList.remove('disabled');
      break;

    case 'sending':
      submitBtn.classList.add('disabled');
      renderSpinner(submitBtn);
      break;

    case 'failed':
      submitBtn.classList.remove('disabled');
      submitBtn.textContent = i18n('addButton');
      break;

    case 'finished':
      submitBtn.classList.remove('disabled');
      submitBtn.textContent = i18n('addButton');
      renderSuccessfulFeedback(elements, i18n);
      form.reset();
      input.focus();
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default (state, elements, i18n) => {
  const watchedState = onChange(state, (path, value) => {
    console.log(path, value);
    switch (path) {
      case 'processError':
        renderError(value, elements, i18n);
        break;

      case 'processState':
        handleProcessState(value, elements, i18n);
        break;

      case 'posts':
        renderPosts(value, elements, i18n);
        break;

      case 'feeds':
        renderFeeds(value, elements, i18n);
        break;
      default:
        break;
    }
  });

  return watchedState;
};

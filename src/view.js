/* eslint-disable no-param-reassign */
import onChange from 'on-change';

import { handleShowPost } from './handlers.js';

const createCard = (children, title) => {
  const card = document.createElement('div');
  const cardHeader = document.createElement('div');
  const cardBody = document.createElement('div');
  const h2 = document.createElement('h2');

  card.setAttribute('class', 'card border-0');
  cardHeader.setAttribute('class', 'card-header');
  cardBody.setAttribute('class', 'card-body p-0');
  h2.setAttribute('class', 'card-title h4');

  h2.textContent = title;

  cardBody.append(children);
  cardHeader.append(h2);
  card.append(cardHeader);
  card.append(cardBody);

  return card;
};

const createPostsContainer = (children) => {
  const div = document.createElement('div');

  div.setAttribute('class', 'tab-content');

  div.append(...children);

  return div;
};

const createPostsList = (posts, state, elements, i18n) => {
  const { watchedPosts, activeTab } = state.ui;

  const groupedPosts = posts.reduce((acc, post) => {
    acc[post.feedId] = acc[post.feedId] || [];
    acc[post.feedId].push(post);
    return acc;
  }, {});

  return Object.entries(groupedPosts)
    .map(([key, value]) => {
      const container = document.createElement('ul');
      container.setAttribute('id', `feed-${key}`);
      container.setAttribute('class', `tab-pane p-3 fade ${activeTab === key ? 'active show' : ''}`);
      container.setAttribute('role', 'tabpanel');

      const postsList = value.map((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const button = document.createElement('button');

        a.textContent = post.title;
        button.textContent = i18n('watchButton');

        li.setAttribute('class', 'mb-3 list-group-item d-flex justify-content-between align-items-start border-0 border-end-0');
        a.setAttribute('class', `${watchedPosts.includes(post.id) ? 'fw-normal link-secondary' : 'fw-bold'}`);
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.href = post.link;

        button.setAttribute('class', 'btn btn-outline-primary btn-sm ms-3');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#modal');

        button.addEventListener('click', (e) => handleShowPost(e, post, state, elements));

        li.append(a);
        li.append(button);

        return li;
      });

      container.append(...postsList);
      return container;
    });
};

const renderPosts = (posts, state, elements, i18n) => {
  const postsList = createPostsList(posts, state, elements, i18n);
  const postsContainer = createPostsContainer(postsList);
  const card = createCard(postsContainer, i18n('posts'));

  elements.posts.replaceChildren(card);
};

const createFeedsContainer = (children) => {
  const div = document.createElement('div');

  div.setAttribute('class', 'nav flex-column nav-pills p-3');
  div.setAttribute('id', 'rssTab');
  div.setAttribute('role', 'tablist');

  children.forEach((element) => {
    div.prepend(element);
  });

  return div;
};

const createFeedsList = (feeds, state) => {
  const { activeTab } = state.ui;

  return feeds.map((feed) => {
    const button = document.createElement('button');
    const p = document.createElement('p');

    p.setAttribute('class', 'm-0 small text-black-50');
    p.textContent = feed.description;

    button.setAttribute('class', `nav-link text-start p-0 mb-3 ${activeTab === feed.id ? 'active' : ''}`);
    button.setAttribute('data-bs-toggle', 'tab');
    button.setAttribute('data-bs-target', `#feed-${feed.id}`);
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `#feed-${feed.id}`);
    button.setAttribute('aria-selected', activeTab === feed.id);
    button.setAttribute('type', 'button');

    button.textContent = feed.title;
    button.append(p);

    button.addEventListener('click', () => { state.ui.activeTab = feed.id; });

    return button;
  });
};

const renderFeeds = (feeds, state, elements, i18n) => {
  const feedsList = createFeedsList(feeds, state);
  const feedsContainer = createFeedsContainer(feedsList);
  const card = createCard(feedsContainer, i18n('feeds'));

  elements.feeds.replaceChildren(card);
};

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

const renderSpinner = (container) => {
  const spinner = document.createElement('div');
  const text = document.createElement('span');

  spinner.setAttribute('class', 'spinner-border text-light');
  text.setAttribute('class', 'sr-only');

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
    switch (path) {
      case 'processError':
        renderError(value, elements, i18n);
        break;

      case 'processState':
        handleProcessState(value, elements, i18n);
        break;

      case 'posts':
        renderPosts(value, state, elements, i18n);
        break;

      case 'feeds':
        renderFeeds(value, state, elements, i18n);
        break;
      default:
        break;
    }
  });

  return watchedState;
};

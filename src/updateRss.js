/* eslint-disable no-param-reassign */
import { intersectionBy, differenceBy, uniqueId } from 'lodash';

import loader from './loader.js';
import parser from './parser.js';

const getNewPosts = (parsedData, feeds, posts) => parsedData.map((content) => {
  const { title } = content.feed;
  const { id } = feeds.find((feed) => feed.title === title);
  const oldPosts = posts.filter((post) => post.feedId === id);
  const samePosts = intersectionBy(oldPosts, content.posts, 'title');
  const newPosts = differenceBy(content.posts, samePosts, 'title');
  newPosts.forEach((newPost) => { newPost.feedId = id; });

  return newPosts;
});

export default (state, watchedState) => {
  const { listRSS, feeds, posts } = state;

  if (listRSS.length === 0) return;

  const currentWatchedState = watchedState;
  const requests = listRSS.map((RSS) => loader(RSS));
  Promise.allSettled(requests)
    .then((response) => response
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => parser(value, uniqueId())))
    .then((parsedData) => getNewPosts(parsedData, feeds, posts))
    .then((newPosts) => { currentWatchedState.posts = [...newPosts.flat(), ...state.posts]; });
};

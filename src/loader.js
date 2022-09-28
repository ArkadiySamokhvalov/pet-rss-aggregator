/* eslint-disable no-param-reassign */
import axios from 'axios';

export default (rssLink) => {
  const url = `https://api.allorigins.win/get?disableCache=true&url=${encodeURIComponent(rssLink)}`;

  return axios.get(url)
    .then((response) => response.data.contents)
    .catch(() => {
      throw new Error('loadError');
    });
};

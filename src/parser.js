import { uniqueId } from 'lodash';

export default (rss, feedId) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rss, 'application/xml');

  const feedTitle = doc.querySelector('channel title');
  const descriptionFeed = doc.querySelector('channel description');

  const feedTitleContent = feedTitle.textContent;
  const descriptionFeedContent = descriptionFeed.textContent;
  const feed = { title: feedTitleContent, description: descriptionFeedContent, id: feedId };

  const postsEls = doc.querySelectorAll('item');
  const posts = Array.from(postsEls).map((post) => {
    const titlePost = post.querySelector('title');
    const linkPost = post.querySelector('link');
    const descriptionPost = post.querySelector('description');

    const titlePostContent = titlePost.textContent;
    const linkPostContent = linkPost.textContent;
    const descriptionPostContent = descriptionPost.textContent;

    return {
      id: uniqueId(),
      title: titlePostContent,
      link: linkPostContent,
      description: descriptionPostContent,
      feedId,
    };
  });

  return { feed, posts };
};

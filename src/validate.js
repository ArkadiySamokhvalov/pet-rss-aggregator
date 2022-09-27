/* eslint-disable no-param-reassign */
import { object, string, setLocale } from 'yup';

export default (url, watchedState) => {
  setLocale({
    mixed: {
      required: () => 'required',
      notOneOf: () => 'existRSS',
    },
    string: {
      url: () => 'uncorrectURL',
    },
  });

  const schema = object({
    url: string()
      .matches(/^.{1,}\.rss$/)
      .url()
      .notOneOf([...watchedState.listRSS]),
  });

  schema.validate({ url })
    .then(() => { watchedState.processError = null; })
    .catch((error) => { watchedState.processError = error.type; });
};

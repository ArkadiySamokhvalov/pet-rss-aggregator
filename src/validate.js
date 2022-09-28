import { object, string, setLocale } from 'yup';

export default (url, { listRSS }) => {
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
      .url()
      .notOneOf([...listRSS]),
  });

  return schema.validate({ url });
};

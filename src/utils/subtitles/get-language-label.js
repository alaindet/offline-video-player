const languageTags = require('language-tags');

const getLanguageLabel = (langCode) => {

  const result = languageTags.language(langCode);

  if (!result) {
    return null;
  }


  return result.data.record.Description[0];
};

module.exports = getLanguageLabel;

const trimExcessSpaces = input => input.trim().replace(/\s{2,}/g, ' ');

module.exports = trimExcessSpaces;

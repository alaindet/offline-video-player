const toKebabCase = (input) => input.toLowerCase().replace(/[^a-z0-9]+/g, '-');

module.exports = toKebabCase;

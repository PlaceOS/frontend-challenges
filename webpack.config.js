"use strict";

const helpers = require("./helpers");
const tailwindWebpackRule = {
  test: /tailwind\.scss$/,
  loader: "postcss-loader",
  options: {
    ident: "postcss",
    syntax: "postcss-scss",
    plugins: () => [
      require("tailwindcss")(helpers.root("tailwind.config.js")), 
      require('autoprefixer'),
    ],
  },
};

module.exports = {
  module: {
    rules: [
      tailwindWebpackRule,
    ],
  },
};

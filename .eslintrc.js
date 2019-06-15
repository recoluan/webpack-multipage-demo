module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb-base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "import/no-extraneous-dependencies": 0,
    "semi": 0,
    "comma-dangle": 0,
    "func-names": 0,
    "no-underscore-dangle": 0,
    "import/no-unresolved": 0,
    "no-console": 0,
    "prefer-arrow-callback": 0,
    "space-before-function-pare": 0
  },
  "plugins": [
    "html"
  ],
  "globals": {
    "$": "readonly"
  }
};

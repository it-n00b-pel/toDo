module.exports = {
    env: {
        browser: true,
        node: true,
        es2023: true,
    },
    extends: [
        'airbnb-base',
        'plugin:import/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'prettier',
        'plugin:vue/essential'
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
    },
    rules: {},
};

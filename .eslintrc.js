module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        // "ecmaVersion": "2021",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "decorator-position"
    ],
    "rules": {
        "decorator-position/decorator-position": "error",
    }
}

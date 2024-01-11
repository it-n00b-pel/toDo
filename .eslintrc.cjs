{
    "env": {
    // где будет исполняться наш код
    "browser: true,
    "node": true,
        // добавляет все глобальные переменные ECMAScript 2023 и автоматически
        //  устанавливает ecmaVersionопция парсера 14 в parserOptions
        "es2023": true
},
    // Пресет с настройками. prettier должен быть последним.
    // Он удаляет некоторые правила eslint из-за которых могут возникать конфликты.
    // ВНИМАНИЕ!!! для vue 3 оставить 'plugin:vue/vue3-recommended', для nuxt 3 - '@nuxt/eslint-config'
    "extends": [
    "airbnb-base" || "airbnb-typescript/base" // если есть ts,
    "@vue/eslint-config-typescript", // если есть ts
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:vue/vue3-recommended" || "@nuxt/eslint-config", // если есть ts
    "prettier",
],
    parserOptions: {
    // Позволяет использовать import/export, вызывает ошибкит при использовании ts
    "sourceType": "module",
        "ecmaVersion": "latest",
},
    "rules": {}
}

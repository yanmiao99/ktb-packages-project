module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:prettier/recommented', // eslint prettier 兼容插件
        'eslint-config-prettier' // eslint 使用 prettier 配置
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'vue',
        'prettier' // 引入规范插件  prettier <==>  eslint-plugin-prettier
    ],
    rules: {
        'vue/multi-word-component-names': 'off' // 关闭必须使用多个单词作为组件名称的检测
    }
}

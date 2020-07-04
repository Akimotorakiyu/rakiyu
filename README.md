# vue3 pre

```sh
yarn create vite-app .
```

```sh
yarn add vue@next vue-router@next vuex@next 
```

```sh
# eslint-plugin-vue >7
yarn add -D eslint-plugin-vue@next
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier  prettier
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser  typescript vue-eslint-parser
yarn add -D stylus
```

需要先安装 eslint 插件，添加 eslint 集成 `./.vsocde/settings.json`

```json
{
  "deno.enable": false,
  "eslint.validate": ["javascript", "javascriptreact", "vue"]
}
```

`vetur`取消模板检测

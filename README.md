<h1 style="text-align:center">
    Arco Design Web
</h1>

简化 arco design pro，采用腾讯 Axios 二次封装方案

项目推荐采用 tailwindcss 书写样式，tailwindcss 文档：https://www.tailwindcss.cn/

项目使用自动按需导入，vue/vue-router/vueuse 等 api 已自动导入，无需在页面中继续引入;
开发环境采用全局引入的方式引入 Arco design 组件，生产环境采用自动按需导入；

## 🌈 目录结构

```sh
├── config                     # vite 配置文件
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 图片、字体等静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 页面配置信息
│   ├── directive              # 全局指令
│   ├── constants              # 常量
│   ├── hooks                  # 全局 hooks
│   ├── layout                 # 全局 layout
│   ├── mock                   # 项目mock 模拟数据
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── types                  # 全局接口、类型
│   ├── utils                  # 全局公用方法
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.ts                # 入口文件 加载组件 初始化等
│   └── env.d.ts               # 声明文件
├── .env.development           # 开发环境配置
├── .env.production            # 生产环境配置
├── index.html                 # html模板
├── .eslintrc.js               # eslint配置文件         代码规范检查
├── .prettierrc.js             # prettier配置文件       代码样式检查
├── .stylelintrc.js            # stylelint配置文件      css样式规范、
├── auto-imports.d.ts          # vue、vue-router等相关api类型文件
├── babel.config.js            # babel-loader配置文件
├── commitlint.config.js       # commitlint配置文件     仓库提交规范
├── components.d.ts            # 全局组件类型文件
├── package.json               # package.json
├── tailwindcss.config.js      # tailwindcss配置文件
└── tsconfig.json              # typescript配置文件
```

## 🪂 项目安装

```sh

# npm版本推荐18以上

# 包管理推荐使用pnpm
npm install pnpm -g

pnpm config set registry https://registry.npmmirror.com

# 安装依赖
pnpm install

# 本地开发 启动项目
pnpm dev
```

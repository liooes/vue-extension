# 利用Vue3 + Element UI 开发 chrome extension

## 所需开发环境
1. nodejs
2. vue cli
3. vs code
4. element ui
5. chrome ext

## nodejs + vue cli安装

1. https://nodejs.org/en/download/
2. npm install -g @vue/cli

## vscode不能运行终端命令可以尝试这个办法
1. 以管理员身份打开vscode，任意打开一个终端，快捷键 ctrl+`
2. 输入：get-ExecutionPolicy。显示Restricted，说明vscode被禁止运行脚本
3. 输入：set-ExecutionPolicy RemoteSigned
4. 输入：get-ExecutionPolicy。显示RemoteSigned，说明vscode可以运行脚本

### 创建项目
```
vue create 项目名称
```
### 安装插件依赖
```
vue add chrome-extension-cli
```
### 打包
* 使用 npm run build-watch运行开发模式，将生成一个dist文件。 安装Extension Reloader，以便在热更新。 （注意，- 当您更改 manifest.json 文件时，它不会自动加载，您需要点选 extension 页面中的更新）
* 生产模式 npm run build，并将其压缩成 zip 并部署到 chrome 商店中。

### 安装element plus依赖
```
npm install element-plus --save
```
### 引入element 在 popup.js 引入
```
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "../view/popup.vue";

const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");
```
# vue-extension

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
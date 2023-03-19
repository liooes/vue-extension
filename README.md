# 利用Vue3 + Element UI 开发 chrome extension

## 所需开发环境和依赖
1. nodejs
2. vue cli
3. vs code
4. element ui
5. chrome ext
6. axios

## nodejs + vue cli安装

1. https://nodejs.org/en/download/
2. npm install -g @vue/cli

## vscode不能运行终端命令可以尝试这个办法
1. 以管理员身份打开powershell
2. 输入：get-ExecutionPolicy。显示Restricted，说明vscode被禁止运行脚本
3. 输入：set-ExecutionPolicy RemoteSigned
4. 输入：get-ExecutionPolicy。显示RemoteSigned，说明vscode可以运行脚本
![](https://raw.githubusercontent.com/liooes/images/main/markdown20230312204845.png)
### 创建项目
```
vue create 项目名称
```
### 安装插件依赖
```
vue add chrome-extension-cli
```
### 安装element plus依赖
```
npm install element-plus --save
```
### 安装axios依赖
```
npm install axios
```
### 安装querystring依赖
```
npm install --save querystring
```
### 引入ElementPlus 在 popup.js 引入
```
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "../view/popup.vue";

const app = createApp(App);

app.use(ElementPlus);
app.mount("#app");
```
### 打包
* 使用 npm run build-watch运行开发模式，将生成一个dist文件。 安装Extension Reloader，以便在热更新。 （注意，- 当您更改 manifest.json 文件时，它不会自动加载，您需要点选 extension 页面中的更新）
* 生产模式 npm run build，并将其压缩成 zip 并部署到 chrome 商店中。
# 注意
1. 需要先 npm run build-watch
2. 然后再 npm run build
3. 重启浏览器再安装插件，不知道为什么一切换工单数量总是崩溃

# vue-extension 使用

### 安装依赖
```
npm i
```
### 构建项目
```
npm run build
```
### 查看项目
1. 将dist文件夹拖到chrome开发者模式中
![](https://raw.githubusercontent.com/liooes/images/main/markdown20230312205356.png)
2.将插件固定显示，点击插件图标
![](https://raw.githubusercontent.com/liooes/images/main/markdown20230312205541.png)

3. 点击开始使用
![插件跳转的第二个页面](https://raw.githubusercontent.com/liooes/images/main/markdown20230312204642.png)


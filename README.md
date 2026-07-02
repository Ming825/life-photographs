# life-photographs

EE360 实验室风采展示静态网站，用于展示研究生个人照片、实验室合影与实验室动态等模块。

## 技术栈

- [Bootstrap 5](https://getbootstrap.com/)：响应式布局、导航栏、卡片组件
- [GLightbox](https://biati-digital.github.io/glightbox/)：图片灯箱（点击照片放大 / 滑动浏览）
- 原生 HTML / CSS / JavaScript，无需构建工具，可直接部署为静态站点（如 GitHub Pages）

以上两个库以本地文件形式引入（见 `assets/vendor/`），不依赖外部 CDN，离线也可正常访问。

## 目录结构

```
index.html              页面主体
css/style.css            自定义样式
js/data.js                网站文案与照片数据（核心：后续更新内容主要改这里）
js/main.js                渲染逻辑与交互（灯箱初始化、筛选、导航栏效果）
assets/img/students/      研究生个人照片
assets/img/group/         实验室合影
assets/img/activities/    实验室动态 / 活动照片
assets/img/brand/         Logo、首页背景等品牌素材
```

> 当前仓库中的照片均为脚本生成的**占位图**（渐变色块 + 文字），用于演示布局，正式使用前请替换为真实照片。

## 如何更新内容

### 1. 新增 / 替换研究生照片

1. 把照片文件放进 `assets/img/students/`（建议正方形照片，命名任意，如 `zhangsan.jpg`）。
2. 打开 `js/data.js`，在 `students` 数组中新增一项（或修改已有项）：

```js
{
  name: "张三",
  photo: "assets/img/students/zhangsan.jpg",
  grade: "2023级 硕士生",
  direction: "信号处理",   // 需与 directions 数组中的方向保持一致，用于筛选
  bio: "研究方向简介……",
}
```

3. 如需新增研究方向筛选标签，同时把方向名加入 `directions` 数组。

### 2. 新增实验室合影

在 `js/data.js` 的 `groupPhotos` 数组中新增一项：

```js
{
  title: "2026年迎新合影",
  photo: "assets/img/group/2026-welcome.jpg",
  date: "2026年9月",
  desc: "简要说明这张合影的场景。",
}
```

### 3. 新增实验室动态 / 活动照片

同理修改 `activities` 数组。

### 4. 修改实验室简介、联系方式

修改 `js/data.js` 顶部的 `lab` 对象（名称、slogan、简介、联系方式）。

## 本地预览

无需安装依赖，任意静态服务器均可，例如：

```bash
python3 -m http.server 8000
# 然后浏览器打开 http://localhost:8000
```

## 部署

可直接部署到 GitHub Pages / Netlify / Vercel 等任意静态托管平台：仓库根目录即站点根目录，`index.html` 为入口文件。

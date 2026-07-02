# life-photographs

EE360 实验室时光相册，一个用来存档回忆的静态网页：按年份展示历届同学的个人照片，以及实验室合影、生活瞬间等模块。

## 技术栈

- [Bootstrap 5](https://getbootstrap.com/)：响应式布局、导航栏、栅格
- [GLightbox](https://biati-digital.github.io/glightbox/)：图片灯箱（点击照片放大 / 滑动浏览）
- 原生 HTML / CSS / JavaScript，无需构建工具，可直接部署为静态站点（如 GitHub Pages）

以上两个库以本地文件形式引入（见 `assets/vendor/`），不依赖外部 CDN，离线也可正常访问。

## 目录结构

```
index.html              页面主体
css/style.css            自定义样式（暖色调 + 拍立得风格照片卡片）
js/data.js                网站文案与照片数据（核心：后续更新内容主要改这里）
js/main.js                渲染逻辑与交互（按年份分组、灯箱初始化、导航栏效果）
assets/img/students/      历届同学个人照片
assets/img/group/         实验室合影
assets/img/activities/    生活瞬间 / 团建照片
assets/img/brand/         Logo、首页背景等素材
```

> 当前仓库中的照片均为脚本生成的**占位图**（渐变色块 + 文字），用于演示布局，正式使用前请替换为真实照片。

## 如何更新内容

### 1. 新增 / 替换同学照片

1. 把照片文件放进 `assets/img/students/`（建议正方形照片，命名任意，如 `zhangsan.jpg`）。
2. 打开 `js/data.js`，在 `students` 数组中新增一项（或修改已有项）：

```js
{
  name: "张三",
  photo: "assets/img/students/zhangsan.jpg",
  year: "2023级",     // 页面会按此字段自动分组、降序排列
  note: "",            // 可选，一句想留下的话
}
```

页面会自动按 `year` 分组展示，无需手动维护分组结构。

### 2. 新增实验室合影

在 `js/data.js` 的 `groupPhotos` 数组中新增一项：

```js
{
  title: "2026年 · 迎新合影",
  photo: "assets/img/group/2026-welcome.jpg",
  date: "2026年9月",
  desc: "简要说明这张合影的场景。",
}
```

### 3. 新增生活瞬间照片

同理修改 `activities` 数组。

### 4. 修改开篇文案、结语、联系方式

修改 `js/data.js` 顶部的 `lab` 对象（名称、slogan、intro 开篇语、closing 结语、email）。email 留空则不显示联系方式那一行。

## 本地预览

无需安装依赖，任意静态服务器均可，例如：

```bash
python3 -m http.server 8000
# 然后浏览器打开 http://localhost:8000
```

## 部署

可直接部署到 GitHub Pages / Netlify / Vercel 等任意静态托管平台：仓库根目录即站点根目录，`index.html` 为入口文件。

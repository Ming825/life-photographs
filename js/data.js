/**
 * 网站内容数据源。
 * 后续更新照片：把真实图片放进 assets/img/students、assets/img/group、assets/img/activities，
 * 再把路径添加到对应人物或事件的 photos 数组即可，无需改动 index.html 或其它脚本。
 * photos 中既可以直接写图片路径，也可以写成：
 * { src: "图片路径", title: "照片标题", date: "拍摄日期", desc: "照片说明" }
 */

const SITE_DATA = {
  lab: {
    name: "EE360 实验室",
    slogan: "岁月匆匆，光影留痕",
    intro:
      "没有严肃的介绍，这里只想留住我们一起走过的日子——每一张熟悉的脸，每一次并肩的合影，都留给大家慢慢回忆。",
    closing: "感谢每一个和我们一起度过这段时光的人。愿常回来看看。",
    // 如果有想补充的照片，可以写一个联系方式，留空则不显示这一行
    email: "2510897@tongji.edu.cn",
  },

  // 历届同学：按年份（届）分组的个人照片，year 越大越靠前展示
  students: [
    { name: "胡育杰", photos: ["assets/img/students/student6.svg"], year: "2024级", note: "" },
    { name: "杨同朔", photos: ["assets/img/students/student7.svg"], year: "2024级", note: "" },
    { name: "成翔宇", photos: ["assets/img/students/student8.svg"], year: "2024级", note: "" },

    { name: "王颖婕", photos: ["assets/img/students/wyj.jpg"], year: "2023级", note: "" },
    {
      name: "史玉明",
      photos: [
        "assets/img/students/sym.jpg",
        {
          src: "assets/img/students/sym-graduation.jpg",
          title: "毕业留影",
          date: "",
          desc: "",
        },
      ],
      year: "2023级",
      note: "",
    },

    { name: "李泓羿", photos: ["assets/img/students/2022lhy.jpg"], year: "2022级", note: "" },
    { name: "钱舒杨", photos: ["assets/img/students/2022qsy.jpg"], year: "2022级", note: "" },
    { name: "李纪元", photos: ["assets/img/students/2022ljy.jpg"], year: "2022级", note: "" },

    { name: "于逸尘", photos: ["assets/img/students/2021yyc.jpg"], year: "2021级", note: "" },
    { name: "华润恺", photos: ["assets/img/students/2021hrk.jpg"], year: "2021级", note: "" },
    { name: "李杰", photos: ["assets/img/students/2021lj.jpg"], year: "2021级", note: "" },
    { name: "杨彦彪", photos: ["assets/img/students/2021yyb.jpg"], year: "2021级", note: "" },
    { name: "占岩文", photos: ["assets/img/students/student6.svg"], year: "2021级", note: "" },
  ],

  // 合影时光：历年实验室合影
  groupPhotos: [
    {
      title: "2026年",
      photos: ["assets/img/group/group2026.png"],
      date: "2026年6月",
      desc: "",
    },
    {
      title: "2025年",
      photos: ["assets/img/group/group2025.jpg",
              "assets/img/group/group2025-2.jpg",
      ],
      date: "2025年6月",
      desc: "",
    },
    {
      title: "2025年 · 智信馆",
      photos: ["assets/img/group/group2025-zhixinguan.jpg"],
      date: "2025年6月",
      desc: "",
    },
    {
      title: "2024年",
      photos: ["assets/img/group/group2024.jpg"],
      date: "2024年6月",
      desc: "",
    },
  ],

  // 生活瞬间：团建 / 日常花絮
  activities: [
    {
      title: "2025年校庆返校日",
      photos: ["assets/img/activities/activity2025.jpg"],
      date: "2025年5月",
      desc: "已毕业的师兄师姐回校看望朱老师",
    },
    {
      title: "西安",
      photos: ["assets/img/activities/2024-xian.jpg"],
      date: "2024年10月",
      desc: "",
    },
    {
      title: "李杰生日聚会",
      photos: ["assets/img/activities/activity2023.jpg"],
      date: "2023年12月",
      desc: "难得的一次集体团建。",
    },
    
  ],
};

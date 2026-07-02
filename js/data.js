/**
 * 网站内容数据源。
 * 后续更新照片：把真实图片放进 assets/img/students、assets/img/group、assets/img/activities，
 * 再修改下面对应数组里的 photo 路径 / 文字信息即可，无需改动 index.html 或其它脚本。
 */

const SITE_DATA = {
  lab: {
    name: "EE360 实验室",
    slogan: "岁月匆匆，光影留痕",
    intro:
      "没有严肃的介绍，这里只想留住我们一起走过的日子——每一张熟悉的脸，每一次并肩的合影，都留给大家慢慢回忆。",
    closing: "感谢每一个和我们一起度过这段时光的人。愿常回来看看。",
    // 如果有想补充的照片，可以写一个联系方式，留空则不显示这一行
    email: "ee360lab@example.edu.cn",
  },

  // 历届同学：按年份（届）分组的个人照片，year 越大越靠前展示
  students: [
    { name: "刘洋", photo: "assets/img/students/student6.svg", year: "2024级", note: "" },
    { name: "吴静", photo: "assets/img/students/student8.svg", year: "2024级", note: "" },

    { name: "李思", photo: "assets/img/students/student2.svg", year: "2023级", note: "" },
    { name: "赵雅", photo: "assets/img/students/student4.svg", year: "2023级", note: "" },

    { name: "张明", photo: "assets/img/students/student1.svg", year: "2022级", note: "" },
    { name: "陈军", photo: "assets/img/students/student5.svg", year: "2022级", note: "" },

    { name: "王浩", photo: "assets/img/students/student3.svg", year: "2021级", note: "" },
    { name: "周敏", photo: "assets/img/students/student7.svg", year: "2021级", note: "" },
  ],

  // 合影时光：历年实验室合影
  groupPhotos: [
    {
      title: "2025年 · 迎新合影",
      photo: "assets/img/group/group1.svg",
      date: "2025年9月",
      desc: "又一批新面孔加入了这个大家庭。",
    },
    {
      title: "2024年 · 毕业季合影",
      photo: "assets/img/group/group2.svg",
      date: "2024年6月",
      desc: "毕业季，和大家的合影留念。",
    },
    {
      title: "2023年 · 我们的日常",
      photo: "assets/img/group/group3.svg",
      date: "2023年11月",
      desc: "普普通通的一天，恰好拍了张合影。",
    },
    {
      title: "2022年 · 组会后的合影",
      photo: "assets/img/group/group4.svg",
      date: "2022年5月",
      desc: "组会结束，大家凑在一起拍了这张照片。",
    },
  ],

  // 生活瞬间：团建 / 日常花絮
  activities: [
    {
      title: "赶论文的深夜",
      photo: "assets/img/activities/activity1.svg",
      date: "2025年3月",
      desc: "灯还亮着，大家都还没走。",
    },
    {
      title: "秋游团建",
      photo: "assets/img/activities/activity2.svg",
      date: "2024年10月",
      desc: "难得的一次集体出行。",
    },
    {
      title: "实验室开放日",
      photo: "assets/img/activities/activity3.svg",
      date: "2024年5月",
      desc: "那天来了好多人，很热闹。",
    },
  ],
};

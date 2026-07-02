/**
 * 网站内容数据源。
 * 后续更新照片：把真实图片放进 assets/img/students、assets/img/group、assets/img/activities，
 * 再修改下面对应数组里的 photo 路径 / 文字信息即可，无需改动 index.html 或其它脚本。
 */

const SITE_DATA = {
  lab: {
    name: "EE360 实验室",
    fullName: "EE360 Laboratory",
    slogan: "求实创新 · 协同共进",
    intro:
      "EE360 实验室致力于电子信息领域的前沿研究，涵盖集成电路设计、信号与信息处理、电力电子、通信系统等方向。这里记录着实验室成员的科研与生活瞬间。",
    contact: {
      address: "示例大学 电子信息学院 EE360 实验室",
      email: "ee360lab@example.edu.cn",
      phone: "010-00000000",
    },
  },

  // 研究方向筛选标签
  directions: [
    "全部",
    "集成电路设计",
    "信号处理",
    "电力电子",
    "通信系统",
    "人工智能硬件",
    "微波技术",
    "光电子器件",
    "嵌入式系统",
  ],

  // 研究生个人照片展示
  students: [
    {
      name: "张明",
      photo: "assets/img/students/student1.svg",
      grade: "2022级 博士生",
      direction: "集成电路设计",
      bio: "研究方向为高速模数转换器设计。",
    },
    {
      name: "李思",
      photo: "assets/img/students/student2.svg",
      grade: "2023级 硕士生",
      direction: "信号处理",
      bio: "研究方向为阵列信号处理算法。",
    },
    {
      name: "王浩",
      photo: "assets/img/students/student3.svg",
      grade: "2021级 博士生",
      direction: "电力电子",
      bio: "研究方向为高效率功率变换器。",
    },
    {
      name: "赵雅",
      photo: "assets/img/students/student4.svg",
      grade: "2023级 硕士生",
      direction: "通信系统",
      bio: "研究方向为无线通信系统优化。",
    },
    {
      name: "陈军",
      photo: "assets/img/students/student5.svg",
      grade: "2022级 硕士生",
      direction: "人工智能硬件",
      bio: "研究方向为神经网络加速器架构。",
    },
    {
      name: "刘洋",
      photo: "assets/img/students/student6.svg",
      grade: "2024级 硕士生",
      direction: "微波技术",
      bio: "研究方向为毫米波天线设计。",
    },
    {
      name: "周敏",
      photo: "assets/img/students/student7.svg",
      grade: "2021级 博士生",
      direction: "光电子器件",
      bio: "研究方向为硅基光电子集成器件。",
    },
    {
      name: "吴静",
      photo: "assets/img/students/student8.svg",
      grade: "2024级 硕士生",
      direction: "嵌入式系统",
      bio: "研究方向为低功耗嵌入式系统设计。",
    },
  ],

  // 实验室合照展示
  groupPhotos: [
    {
      title: "2025年实验室迎新合影",
      photo: "assets/img/group/group1.svg",
      date: "2025年9月",
      desc: "新学期迎新会，欢迎新同学加入实验室大家庭。",
    },
    {
      title: "2024年毕业季合影",
      photo: "assets/img/group/group2.svg",
      date: "2024年6月",
      desc: "毕业季与毕业生的合影留念。",
    },
    {
      title: "2023年学术年会合影",
      photo: "assets/img/group/group3.svg",
      date: "2023年11月",
      desc: "实验室年度学术交流会全体合影。",
    },
    {
      title: "实验室日常合影",
      photo: "assets/img/group/group4.svg",
      date: "2023年5月",
      desc: "组会结束后的日常合影。",
    },
  ],

  // 实验室动态 / 活动剪影
  activities: [
    {
      title: "实验室学术交流会",
      photo: "assets/img/activities/activity1.svg",
      date: "2025年3月",
      desc: "邀请业界专家分享前沿技术进展。",
    },
    {
      title: "科研团队建设活动",
      photo: "assets/img/activities/activity2.svg",
      date: "2024年10月",
      desc: "户外团建活动，增进团队凝聚力。",
    },
    {
      title: "实验室开放日",
      photo: "assets/img/activities/activity3.svg",
      date: "2024年5月",
      desc: "面向本科生的实验室开放参观日。",
    },
  ],
};

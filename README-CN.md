[简体中文](README-CN.md) | [English](README.md)

一个实验性的在线 GPX 分析工具，但它是完全不同的动物

An experimental online GPX visualizer and analyzer, but a whole different animal

[点击使用](https://gsui5051.github.io/TrailScope/)

# TrailScope - 徒步轨迹分析

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=Leaflet&logoColor=white)

**TrailScope** 是一款纯前端的 GPX 轨迹分析工具，专为户外徒步、越野跑爱好者设计。上传 GPX 文件并输入气象数据，即可获得专业级的路线分析报告，涵盖海拔剖面、坡度分级、难度评估、分段统计、装备建议以及风险提示。

---

## 🎬 介绍视频

想快速了解 TrailScope 的核心功能与使用方式？  
介绍视频：[TrailScope 功能介绍](https://www.bilibili.com/video/BV1Kduo6eEX4/) | [TrailScope 功能介绍（线路二）](https://youtu.be/k4cJetP-9Eg)

视频涵盖了从加载 GPX 轨迹、阅读路线地图和海拔剖面图，到天气评估的完整流程，适合新用户快速上手。

---

## ✨ 功能亮点

- **📂 GPX 解析与可视化**  
  支持 `.gpx` 格式轨迹文件，自动提取位置和海拔信息。

- **🗺️ 交互式地图**  
  基于 Leaflet 渲染，提供多种地图源（高德、谷歌、OpenStreetMap、Windy等），按坡度或海拔着色显示路线。

- **📈 海拔剖面图**  
  展示全程海拔变化，支持缩放、平移，鼠标悬停/触摸查看任意点的距离、海拔和坡度。  
  可切换“坡度分析”与“海拔分析”两种配色模式。

- **📊 详细统计指标**  
  - 总距离、累计爬升/下降、最高/最低海拔  
  - 平均坡度、上坡/下坡/平路距离  
  - 最大上坡/下坡坡度 
  - 可切换基于原始数据/平滑数据的海拔累计，帮助减少 GPS 高度和气压高度计测量噪声导致的误差。  
  - 针对户外徒步和越野跑的坡度统计和技术要点

- **🏔️ 难度评级**  
  综合距离、爬升、坡度三个维度，给出 0~100 的量化评分及难度标签（休闲→极具挑战）。

- **⏱️ 耗时与体能需求**  
  基于 Naismith 规则及陡坡修正，估算总耗时、步行/休息时间、平均配速、能量消耗（千卡）。  
  自动给出 1~5 级体能需求描述。

- **⚠️ 风险识别**  
  根据路线特征（高海拔、陡坡、长距离、大爬升等）并结合气象数据，自动识别潜在风险，并给出综合风险等级。

- **☀️ 气象分析**  
  输入温度、湿度、风速、天气类型，结合路线海拔，提供针对性的装备和行动建议。  
  可基于进阶参数（湿球温度、露点、太阳辐射、气压等）估算 WBGT（湿球黑球温度）指数，评估热应激风险。

- **🎒 装备与补给建议**  
  根据路线难度、海拔、气象条件，自动生成基础装备、推荐装备及补给清单（饮水量、餐食、能量零食等）。  
  补给量随单位制（公制/英制）自动转换，饮水量使用美制盎司（oz）显示。（仅限英文版）

- **📋 分段统计**  
  支持按“坡段”、“固定距离（1km）”、“航路点”三种方式进行分段，展示每段的距离、爬升、下降、平均坡度、最大坡度、耗时及难度评分。  
  点击任意分段可在地图和剖面图上高亮显示。

- **🌐 单位切换**  
  支持公制（km, m）与英制（mi, ft）即时切换，所有显示数值同步转换。（仅限英文版）

- **📱 移动端适配**  
  针对手机触摸操作优化，支持手势滑动查看剖面详情，全屏地图模式适配横竖屏。

- **🔒 隐私保护**  
  所有数据处理均在本地浏览器完成，不上传服务器。你的数据，只有你知道。

---

## 🚀 使用方法

1. **访问页面**  
   - [点击这里查看在线部署版本](https://gsui5051.github.io/TrailScope/)
   - 离线使用：[点击这里下载全套源代码](https://github.com/GSUI5051/TrailScope/archive/refs/heads/main.zip) ，将压缩包里面的 `TrailScope-main` 文件夹中的所有内容解压到本地后，打开 `index.html` 或 `TrailScope-Chinese.html`

2. **加载轨迹**  
   - 点击上传区域，选择 `.gpx` 文件；或将文件拖拽至上传区。 
   - 也可点击 **“体验示例”** 按钮加载内置的示例轨迹。

3. **分析结果**  
   查看分析区域，展示：
   - 总览统计卡片（距离、爬升、下降、最高海拔）
   - 交互式路线地图与海拔剖面图
   - 难度评级、耗时与体能需求、风险提示
   - 气象分析（需手动输入数据）
   - 装备与补给建议
   - 分段统计表格
   - 坡度分布与技术要点
   - 路线概况

4. **交互操作**  
   - **路线地图**：缩放、平移、切换图源；点击航路点可查看详细信息。  
   - **海拔剖面图**：滚轮缩放（电脑端）、拖拽平移；鼠标悬停/触摸可查看数据点详情；支持导出为 PNG 图片。  
   - **分段表**：点击任意行可高亮对应路段在地图和剖面图上。  
   - **单位切换**：点击顶部“公制/英制”按钮，所有数值自动转换。（仅限英文版）

---

## 🛠️ 技术栈

- **HTML5 / CSS3** – 结构样式，Tailwind CSS 辅助布局
- **JavaScript (ES6+)** – 全部业务逻辑
- **Leaflet** – 地图渲染与交互
- **Canvas API** – 海拔剖面图绘制
- **Font Awesome** – 图标库
- **原生 GPX 解析** – 使用 DOM 解析 XML 格式的 GPX 文件

> 无任何后端依赖，纯静态页面，适配移动端，可直接在本地运行。

---

## 📦 目录结构

```
TrailScope/
├── index.html                  # 中文版主页面（入口）
├── TrailScope-Chinese.html     # 中文版主页面
├── TrailScope-English.html     # 英文版主页面
├── css/
│   ├── leaflet-1p9p4.css
│   ├── fonts.css
│   └── all.min.css             # Font Awesome
├── js/
│   ├── common/                 # 共享模块与第三方库（两个页面共用）
│   │   ├── tailwind-3p4p17.js  # 第三方：Tailwind CSS
│   │   ├── leaflet-1p9p4.js    # 第三方：Leaflet
│   │   ├── tailwind-config.js  # Tailwind 主题配置
│   │   ├── device.js           # 设备 / UA 检测
│   │   ├── colors.js           # 坡度/海拔配色常量
│   │   ├── elevation.js        # 原始/平滑爬升下降计算逻辑
│   │   ├── utils.js            # 颜色插值与坡度颜色辅助函数
│   │   ├── gpx-math.js         # 地理计算（haversine、3D 距离、最近点）
│   │   ├── coords.js           # GCJ-02 / WGS-84 坐标转换
│   │   ├── map-common.js       # 共享地图辅助（缩放、居中、分段高亮）
│   │   ├── waypoints.js        # 航路点显示模式逻辑
│   │   └── ui-common.js        # 共享 UI 辅助（缩放、提示、分页等）
│   ├── cn/                     # 中文版专属模块
│   │   ├── state.js            # 全局状态
│   │   ├── map-sources.js      # 地图源定义
│   │   ├── gpx.js              # GPX 解析与轨迹处理
│   │   ├── chart.js            # 海拔剖面图绘制
│   │   ├── map.js              # 地图初始化与绘制
│   │   ├── interaction.js      # 图表交互（悬停/点击/触摸）
│   │   ├── waypoints.js        # 航路点信息展示
│   │   ├── analysis.js         # 难度/气象/风险/分段计算
│   │   ├── ui.js               # 统计、分段、文件与导出界面
│   │   ├── bindings.js         # 按钮/下拉框事件绑定
│   │   └── init.js             # DOMContentLoaded 初始化
│   └── en/                     # 英文版专属模块（布局同 cn/）
│       ├── units.js            # 公制/英制单位转换
│       └── …                   # state / map-sources / …（同 cn/）
├── demo.gpx                    # 中文示例轨迹
├── demo-en.gpx                 # 英文示例轨迹
├── webfonts/                   # 字体文件
├── README.md                   # 英文说明文档
└── README-CN.md                # 本文件
```

> **加载顺序：** 先加载 `common/*`（共用逻辑，`tailwind-config.js` 位于 `<head>`），再加载语言模块（`cn/` 或 `en/`），最后加载 `bindings.js` 与 `init.js`。

---

## 🧭 户外术语说明

| 术语 | 说明 |
|------|------|
| **累计爬升** | 沿轨迹所有上升段的海拔增量总和（支持原始数据与 4m 阈值平滑算法） |
| **累计下降** | 沿轨迹所有下降段的海拔损失总和 |
| **坡度** | 垂直爬升/水平距离百分比，正值为上坡，负值为下坡 |
| **配速** | 每公里（或每英里）所需分钟数 |
| **Naismith 规则** | 经典徒步时间估算方法（每 5 公里 1 小时 + 每 300 米爬升 0.5 小时），本工具在此基础上增加了陡坡修正 |
| **WBGT** | Wet-Bulb Globe Temperature（湿球黑球温度），综合评估热应激的指标 |
| **航路点** | GPX 中定义的命名地点（如“补给点”、“观景台”） |
| **分段** | 将整条路线按坡度变化、固定距离或航路点分割成的子路段 |

---

## ⚠️ 声明

TrailScope 提供的数据分析仅用于路线规划参考。

户外运动存在风险，请根据：

- 自身体能
- 天气情况
- 装备条件

进行安全判断。

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request！如果你有更好的算法、新的地图源或 UI 改进建议，请随时参与。

- 建议在修改前阅读代码结构。
- 如添加新功能，请确保兼容电脑端与移动端。

---

## 📄 许可证

本项目采用 [MIT License](https://opensource.org/licenses/MIT)，可自由使用、修改、分发。

---

## 🌟 致谢

- 灵感来源于各种优秀的户外地图软件和已有的 gpx 分析工具（两步路，Strava, Zepp, Mapy, Organic Maps, GPX Studio）。
- 感谢所有开源社区提供的优秀库（Leaflet, Tailwind CSS, Font Awesome）。
- 感谢所有地图供应人员。
- 特别感谢广大户外徒步与越野跑爱好者提供的轨迹数据。

---

**TrailScope – 解读每一条轨迹**

**Made with ❤️ for hikers & trail runners**
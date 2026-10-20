# 李振文的个人工作站

面向品牌与运营管理机会的交互式个人履历。纯静态页面，发布到 GitHub Pages 后可直接分享。

## 页面

- `#/welcome`：访客登录入口，不采集身份信息，不提供账户认证。
- `#/home`：动态增长坐标、精选业绩、工作图集。
- `#/experience`：履历索引；`#/experience/galan`、`hshb`、`unilever`、`suning` 为四个工作详情页。
- `#/skills`：三类工作技能与可点击业务路径，每个步骤回链到实际经历。
- `#/contact`：邮件、电话、复制操作与 PDF / Word 简历下载。

页面是公开的个人展示；访客登录是进入网站的交互入口，不是密码保护。没有密码字段、后台、跟踪脚本或表单数据收集。网页使用浏览器本地存储记住外观和动效偏好。直接分享详情链接即可进入相应页面。

## 开发与发布

站点位于 `dist/`。无需构建或安装运行依赖。

```bash
python3 -m http.server 4173 --directory dist
```

GitHub Pages 发布源：main 分支 `/docs`，发布时将 `dist/` 内容同步到仓库的 `docs/`。使用相对路径与 hash 路由，子路径部署和详情页刷新均可工作。`.nojekyll` 禁用额外模板处理。

## 内容维护

`profile.js` 是履历和联系方式的数据源；`app.js` 的案例结构定义对应的网页叙事。修改邮箱时应同时更新 index、profile、app 中联系页面，以及 assets 中下载的 PDF 和 Word。页面没有服务端邮件发送，邮件链接调用访客的默认邮件应用。

## 素材与开源

- 网站设计参考 [Liquid Glass Frontend Skill](https://github.com/ngocanhnckh/liquid-glass-frontend-skill)（MIT），玻璃材质和交互为本项目实现。
- 图片查看使用 [PhotoSwipe 5.4.4](https://github.com/dimsemenov/PhotoSwipe)（MIT），源码与许可证自托管于 `vendor/`。
- Manrope 字体采用 SIL Open Font License，许可证在 `assets/Manrope-OFL.txt`。
- 职业照和四组工作场景根据本人提供的形象制作。网页中的业绩数字来自本人提供的履历；不把交互表现新增为历史工作业绩。

自适应桌面和手机，支持键盘导航、深浅外观、系统减弱动态偏好与手动暂停动态效果。

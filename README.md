<p align="center">
  <img width="150" src="logo.png" alt="胖鼠采集">
  <br>
  <br>
</p>

## <a href="https://www.fatrat.cn">胖鼠采集</a>

胖鼠采集（Fat Rat Collect）是一款面向 WordPress 的自动化内容采集插件，适用于资讯站、内容聚合站及需要结构化采集网页内容的业务场景。插件支持通过可配置规则完成内容提取、链接补全、图片处理、数据清洗、自动采集与自动发布，帮助站点提升内容处理效率并降低重复操作成本。

## 核心能力
- 微信公众号文章采集：支持公众号文章内容提取与清洗处理。
- 微信公众号历史文章采集：支持历史文章列表获取与批量采集。
- 登录态页面采集：支持采集需要登录后可见的页面内容。
- 简书文章采集：支持正文、图片等内容抓取与处理。
- 知乎问答采集：支持问答页面内容提取与结构化处理。
- 列表采集与历史采集：支持从列表页批量获取文章链接并持续采集历史内容。
- 详情页采集：支持针对目标详情页提取标题、正文、图片等信息。
- <a href="https://www.fatrat.cn/docs/v2/list-paging-collection" target="_blank">分页采集</a>：支持多分页内容遍历，适用于历史数据抓取场景。
- 自动采集：支持定时或持续执行采集任务。
- 自动发布：支持将采集结果自动写入 WordPress 文章系统。
- 调试模式：支持在线调试采集规则，便于定位选择器与数据处理问题。
- 示例规则：提供可直接体验和参考的规则样例。
- 内容增强：支持 <a href="https://www.fatrat.cn/docs/v2/dynamic-content" target="_blank">动态内容</a>、<a href="https://www.fatrat.cn/docs/v2/auto-tags" target="_blank">自动标签</a>、标签内链等扩展能力。
- 内容去重：支持重复文章识别与过滤。
- 特色图片处理：支持正文首图设置为特色图片。
- 图片本地化：支持将图片下载到本地媒体库，并兼容对象存储类插件。
- 数据处理：支持基于 HTML 与 jQuery 的内容过滤、替换及规则化处理。
- 自定义站点采集：支持面向任意可见网页配置列表页与详情页采集规则。
- 相对链接补全：支持自动补全相对路径为完整链接。
- 图片链接类型处理：支持自定义图片链接格式。

## 使用说明
- 插件完全基于 WordPress 实现，安装启用后即可使用。
- 如 PHP 版本低于 7.1，请使用历史兼容分支 `based_php_5.6`；该分支已停止更新，不建议在新环境中使用。
- 采集任务通常会消耗较多系统资源，图片下载与媒体处理场景尤为明显。
- 建议首次使用时优先导入演示示例，确认环境配置正常后再创建自定义规则。
- 请在合法、合规、获得授权的前提下使用本插件。

## 安装
- 在插件市场中搜索 <strong><a href="https://wordpress.org/plugins/fat-rat-collect/">胖鼠采集</a></strong> 并安装启用。
- 或将插件目录上传至 `/wp-content/plugins/` 后，在后台启用插件。
- 若 PHP 版本低于 7.1，请使用历史兼容分支 `based_php_5.6`。
- 推荐环境：
- PHP 7.2 及以上版本。
- MySQL 5.7 及以上版本。

## 系统模块
- 采集中心：用于创建与管理采集任务。
- 配置中心：用于维护采集规则、字段映射和处理逻辑。
- 数据桶：用于查看、筛选、发布和管理采集结果。
- 调试中心：用于在线调试规则并查看采集结果。
- 工具箱：提供插件配套的辅助工具能力。

## 支持与交流
- 安装后可一键导入演示示例，用于快速了解插件配置方式与采集流程。
- 胖鼠采集 1 群：454049736（已满）
- 胖鼠采集 2 群：846069514（已满）
- 胖鼠采集 3 群：已满
- 胖鼠采集 4 群：请添加胖鼠微信 `waxx-xxswnb`
- 关于 `vendor` 目录：WordPress 插件在实际分发和使用中通常不能依赖用户自行执行 `composer install`，因此发布包中保留依赖目录以确保安装后可直接运行。

## Star History

<a href="https://www.star-history.com/?repos=KitePig%2FFatRat-Collect&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=KitePig/FatRat-Collect&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=KitePig/FatRat-Collect&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=KitePig/FatRat-Collect&type=date&legend=top-left" />
 </picture>
</a>

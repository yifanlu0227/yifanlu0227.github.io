# Minimal Light 主题

[![LICENSE](https://img.shields.io/github/license/yaoyao-liu/minimal-light?style=flat-square&logo=creative-commons&color=EF9421)](https://github.com/yaoyao-liu/minimal-light/blob/main/LICENSE)

\[[在线演示](https://minimal-light-theme.yliu.me/)\] \[[繁體中文](https://github.com/yaoyao-liu/minimal-light/blob/master/README_zh_Hant.md) | [English](https://github.com/yaoyao-liu/minimal-light/blob/master/README.md) | [Deutsche](https://github.com/yaoyao-liu/minimal-light/blob/master/README_de.md)\]
 
*这个项目包含我主页的源代码. 基于 GitHub 官方主题之一 [minimal](https://github.com/orderedlist/minimal) 创建*
<br>
*如果您喜欢这个项目，欢迎您使用和分享*

## 项目特点

- 简单优雅的学术个人主页模板
- 基于 Jekyll, 可以在 GitHub Pages 服务下自动部署
- 基本的搜索引擎优化
- 移动端适配
- 支持 Markdown
- 支持自动的暗黑模式

## 使用指南
### 在GitHub上使用

只要在你的项目中添加如下内容的`_config.yml`文件，GitHub Pages 服务就会使用该主题部署网页:

```yaml
remote_theme: yaoyao-liu/minimal-light
```
请注意：添加上述内容到你的项目，会直接应用这个仓库的所有的默认设置。

如果你希望编辑任何文件（例如：`index.md`)，你仍需要把该文件拷贝到你的项目中。

你也可以直接 fork 这个仓库(或者[使用这个仓库作为模板](https://docs.github.com/cn/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template))，然后把名字改为`your-username.github.io`.

然后，你可以根据[这里的说明](https://docs.github.com/cn/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)开启这个仓库的GitHub Pages服务。

### 通过Jekyll在本地使用

*首先你需要安装 [Ruby](https://www.ruby-lang.org/en/) 和 [Jekyll](https://jekyllrb.com/).*

克隆这个项目:

```bash
git clone https://github.com/yaoyao-liu/minimal-light.git
cd minimal-light
```
安装并运行:

```bash
bundle install
bundle exec jekyll server
```
在`localhost`预览网页:
<http://localhost:4000>. 
你可以在`_site`文件夹中找到 html 文件.

## 自定义内容

### 配置变量

Minimal Light 主题有以下的变量, 你可以在`_config.yml`文件中修改:
  
  ```yaml
# 基本信息
title: 你的名字
position: Ph.D. Student
affiliation: 你的单位
email: yourname (at) example.edu

# 搜索引擎优化 (SEO)
keywords: minimal light
description: 在这里输入网页描述.
canonical: https://minimal-light-theme.yliu.me/

# 链接
google_scholar: https://scholar.google.com/
cv_link: files/Curriculum_Vitae.pdf
github_link: https://github.com/
linkedin: https://www.linkedin.com/
twitter: https://twitter.com/

# 图片路径
avatar: ./assets/img/avatar.png
favicon: ./assets/img/favicon.png
favicon_dark: ./assets/img/favicon-dark.png

# Google Analytics 4 衡量 ID
google_analytics: "" # 填写自己账号的 GA4 衡量 ID（G- 开头）；留空则关闭统计
  ```
### 编辑 `index.md`

创建`index.md`并添加你的个人信息(如：发表的论文，研究课题等).

### 网页样式（CSS)

如果你需要修改网页的风格（基于 CSS）:

1. 在你的项目中创建`/assets/css/style.scss`文件
2. 在该文件的顶端加入如下内容:

    ```scss
    ---
    ---

    @import "{{ site.theme }}";
    ```
3. 在`@import`那一行添加自定义 CSS (或 Sass)格式

### 网页样式（基于 html）

如果你需要修改网页的 html 样式:

1. 从本项目中[复制原始模板](https://github.com/yaoyao-liu/minimal-light/blob/master/_layouts/homepage.html)<br />(*小提示: 点击"raw"可以直接显示原始文件, 拷贝起来更方便*)
2. 在你的项目中创建`/_layouts/homepage.html`文件
3. 把第一步中复制的原始模板粘贴进去
4. 根据自己的需求修改 html 文件

## 仅自己可见的访问统计（GA4）

主页使用 Google Analytics 4 记录访问，网页上不显示访问量，也不公开统计报表。
`_config.yml` 中的 `google_analytics` 默认留空；填写自己账号的衡量 ID 并部署后才开始统计。
原模板的 `UA-111540567-4` 是示例编号，旧版 Universal Analytics 已停止处理数据。

### 开启统计

1. 登录 [Google Analytics](https://analytics.google.com/)，创建自己的 Analytics 账号及 GA4 媒体资源（已有账号可直接创建媒体资源）。报表时区可选择 Toronto。
2. 创建「网站 / Web」数据流，网址填 `https://yifanlu0227.github.io`。
3. 复制数据流详情中的「衡量 ID / Measurement ID」（`G-` 开头），填入 `_config.yml`：

   ```yaml
   google_analytics: "G-你的实际编号"
   ```

4. 将改动部署到 GitHub Pages。代码仅在 Jekyll 的 `production` 环境加载；本地默认的 `jekyll serve` 不会记录访问。
5. 访问一次上线后的主页，然后在 Analytics 的「实时」报表确认访问记录。Google 提示首次收集可能需要约 30 分钟；常规报表会更晚更新。

### 保持报表仅自己可见

- 在 Analytics 管理页面，检查「账号访问权限管理」和「媒体资源访问权限管理」，两处都只保留自己的账号，注意媒体资源会继承账号层面的权限。
- 不添加其他用户、用户组或会授予他人访问权限的关联产品，不发布公开的报表或仪表盘。
- `G-` 编号用于收集数据，会出现在公开网页源码中；它不是查看报表的凭证。不要把 Google 密码、API 密钥或服务账号凭证放进仓库。
- 本站代码关闭了 Google Signals 和广告个性化信号；GA4 仍会将访问数据发送给 Google，并使用 Analytics Cookie。

登录 [Google Analytics](https://analytics.google.com/) 后，可以查看浏览量、访客数、来源及趋势。统计从实际启用后开始，无法补回此前未记录的访问。
如需停用，将 `google_analytics` 改回 `""` 并重新部署。

参考：[Google 官方设置说明](https://support.google.com/analytics/answer/14183469?hl=zh-Hans)、[访问权限管理](https://support.google.com/analytics/answer/9305788?hl=zh-Hans)。

## 许可证

这个项目使用 [Creative Commons Zero v1.0 Universal](https://github.com/yaoyao-liu/minimal-light/blob/master/LICENSE) 许可证.

## 致谢

我们的项目用到了以下项目的源代码:

* [pages-themes/minimal](https://github.com/pages-themes/minimal)

* [orderedlist/minimal](https://github.com/orderedlist/minimal)

* [al-folio](https://github.com/alshedivat/al-folio)

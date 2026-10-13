# AniBT UI

> 二次元「贴纸手账」风格组件库，专为动漫与 ACG 站点设计。基于 Tailwind CSS v4 与 Radix UI 构建，通过 [shadcn registry](https://ui.shadcn.com/docs/registry) 分发，源码直落项目，零运行时黑盒。

<p align="left">
  <a href="https://ui.anibt.net"><strong>在线文档与组件预览</strong></a>
</p>

[![Site](https://img.shields.io/badge/Demo%20%26%20Docs-ui.anibt.net-f472b6?style=flat-square)](https://ui.anibt.net)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-black?style=flat-square)](https://www.radix-ui.com)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square)](./LICENSE)

---

## 视觉与设计特色

AniBT UI 采用独特的「贴纸手账」视觉语言，告别千篇一律的通用后台风格：

- **贴纸质感**：模切白边边框、立体微阴影、撕纸与边缘微翘质感。
- **糖果光泽**：半透明果冻/糖果高光按钮，配合活泼弹性交互。
- **手账细节**：和纸胶带标签、缝线面板（Stitched Containers）、波点底纹。
- **双色体系**：
  - **白樱（Shirozakura / 亮色）**：清新粉樱与米白纸张质感。
  - **夜樱（Yozakura / 暗色）**：深邃静谧的星空深色系。
- **字体规范**：无缝引入 Fredoka 西文圆润展示字体，正文回退系统精修中文黑体。

---

## 快速上手

适用于已初始化 `shadcn` 且使用 `Tailwind CSS v4` 的 React / Next.js / Vite 项目。

### 1. 配置 Registry 源

在项目根目录运行命令注册 `@anibt` 命名空间：

```bash
npx shadcn@latest registry add @anibt=https://ui.anibt.net/r/{name}.json
```

*或直接在 `components.json` 中配置：*

```json
{
  "registries": {
    "@anibt": "https://ui.anibt.net/r/{name}.json"
  }
}
```

### 2. 安装主题（必须）

主题会将白樱 / 夜樱配色映射到 shadcn 标准 CSS 变量，并注入 `--anibt-*` 扩展 token 与动效配方：

```bash
npx shadcn@latest add @anibt/theme
```

### 3. 按需添加组件

组件源码与依赖将直接下载到你的项目目录（默认 `components/ui/`），完全由你掌控：

```bash
npx shadcn@latest add @anibt/button @anibt/badge @anibt/card
```

### 4. 铺上底纹（可选）

在页面根节点（例如 Next.js `app/layout.tsx` 的 `<body>`）添加 `anibt-ground` 类名，即可呈现手账底纹（夜樱模式下自动呈现星空）：

```tsx
<body className="anibt-ground">{children}</body>
```

---

## 组件总览 (45+ 个条目)

| 分类 | 组件列表 |
| :--- | :--- |
| **基础操作** | `button` · `badge` · `spinner` · `kbd` · `separator` |
| **输入与表单** | `input` · `textarea` · `field` · `label` · `select` · `searchable-select` · `multi-select` · `checkbox` · `switch` · `radio-group` · `segmented-control` · `toggle-group` · `search-input` · `password-input` |
| **数据展示** | `card` · `avatar` · `entity-avatar` · `table` · `progress` · `pagination` · `empty` · `skeleton` · `accordion` · `tabs` · `breadcrumb` · `page-header` |
| **浮层与反馈** | `dialog` · `alert` · `alert-dialog` · `confirm-dialog` · `dropdown-menu` · `popover` · `hover-card` · `sheet` · `drawer` · `tooltip` · `command` · `sonner` |
| **业务区块** | `poster-card`（番剧海报卡片） · `release-row`（种子发布列表行） · `markdown-editor`（Markdown 编辑器） |

查看全部组件交互演示与 API：[ui.anibt.net/docs/components](https://ui.anibt.net/docs/components)

---

## 本地开发

本项目集成了组件 Registry 生成与在线文档站点：

```bash
# 1. 安装依赖
pnpm install

# 2. 启动本地文档站 (http://localhost:3000)
pnpm dev

# 3. 构建 Registry 与静态导出 (输出到 out/)
pnpm build
```

### 开发脚本

- `pnpm dev`: 启动文档开发服务器
- `pnpm registry:build`: 从 `registry/` 生成 Registry JSON 至 `public/r/`
- `pnpm build`: 执行 Registry 构建与 Next.js 静态站点导出
- `pnpm typecheck`: 类型检查与 `asChild` 语法合规性检查
- `pnpm lint`: ESLint 检查

---

## 开源许可

- 组件代码基于 [AGPL-3.0-only](./LICENSE) 协议开源。
- **品牌资产保留**：`public/brand/` 目录下的 AniBT Logo 与吉祥物形象为专属品牌资产，不适用于开源许可，未经许可请勿直接用于商业品牌展示。

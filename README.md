# AniBT UI

AniBT 「贴纸手账」组件库：模切白边贴纸、糖果光泽按钮、和纸胶带标记当前位置、缝线分隔的面板。两套颜色模式：**白樱**（亮色）与**夜樱**（暗色）。

它是一个 [shadcn registry](https://ui.shadcn.com/docs/registry)，不是 npm 包：`shadcn` CLI 把组件源码直接写进你的项目。站点与 registry 在同一个仓库，静态导出后由 Cloudflare Workers 的静态资源托管。

- 站点：<https://ui.anibt.net>（以 `NEXT_PUBLIC_SITE_URL` 为准）
- 命名空间：`@anibt`
- 现有条目（`@anibt/` 前缀）：
  - 主题：`theme`（白樱 / 夜樱）
  - 操作与展示：`button`、`spinner`、`badge`、`card`、`avatar`、`entity-avatar`、`skeleton`、`progress`、`pagination`、`empty`、`tooltip`、`separator`、`alert`、`accordion`、`breadcrumb`、`table`、`page-header`
  - 输入与表单：`input`、`textarea`、`label`、`field`、`select`、`checkbox`、`switch`、`radio-group`、`segmented-control`、`toggle-group`、`tabs`、`search-input`、`password-input`、`kbd`
  - 浮层：`dialog`、`alert-dialog`、`confirm-dialog`、`dropdown-menu`、`popover`、`hover-card`、`sheet`、`drawer`、`sonner`、`command`、`searchable-select`、`multi-select`、`markdown-editor`
  - 区块：`poster-card`、`release-row`

> **English summary.** AniBT UI is the component library behind [anibt.net](https://anibt.net), published as a shadcn registry under the `@anibt` namespace. It ships a `registry:theme` item (light mode “Shirozakura” on `:root`, dark mode “Yozakura” on `.dark`, mapped onto the standard shadcn tokens plus `--anibt-*` extras and `anibt-*` utilities) and 45 Radix-based components and blocks (buttons, badges, forms, overlays, poster cards, release rows…) that drop into any shadcn/Tailwind v4 project. Add `"@anibt": "https://ui.anibt.net/r/{name}.json"` to the `registries` of your `components.json`, then run `npx shadcn@latest add @anibt/theme` once (it swaps the standard shadcn colours for Shirozakura/Yozakura) and add components such as `npx shadcn@latest add @anibt/button`. Code is AGPL-3.0-only; the AniBT logo and mascot are not.

## 在你的项目里使用

前提：项目已经跑过 `npx shadcn@latest init`，使用 Tailwind CSS v4。

1. 在 `components.json` 里登记命名空间：

   ```json
   {
     "registries": {
       "@anibt": "https://ui.anibt.net/r/{name}.json"
     }
   }
   ```

   或者：`npx shadcn@latest registry add @anibt=https://ui.anibt.net/r/{name}.json`

2. 装主题，再按需加组件：

   ```bash
   npx shadcn@latest add @anibt/theme
   npx shadcn@latest add @anibt/button @anibt/badge @anibt/card
   ```

3. 可选：在 `<body>` 上加 `anibt-ground` 铺点点底纹（夜樱为星空）。夜樱就是 `<html class="dark">`。

主题写进你的全局 CSS：标准 token（`--background`、`--primary`、`--accent` …）换成 AniBT 的值，加上 `--anibt-*` 扩展、`@theme inline` 里的字体与动效、`anibt-*` 配方（`@utility`）与关键帧，以及 `@fontsource/fredoka`。组件从 `@/lib/utils` 引入 `cn`，不会覆盖你的 `lib/utils.ts`。

## 本地开发

```bash
corepack enable          # 或者直接用 corepack pnpm …
pnpm install
pnpm dev                 # http://localhost:3000
```

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 开发服务器 |
| `pnpm registry:theme` | 从 `registry/anibt/theme/theme.css` 生成主题条目，并同步 `registry.json` 的 `homepage` |
| `pnpm registry:build` | 上一步 + `shadcn build`，输出到 `public/r/` |
| `pnpm build` | `registry:build` + `next build`，静态站点输出到 `out/`（包含 `out/r/*.json`） |
| `pnpm typecheck` | 检查生成文件是否最新 + `next typegen` + `tsc --noEmit` |
| `pnpm lint` | ESLint（`eslint-config-next`） |

本地验证 registry：`pnpm build` 后 `npx serve out -l 4310`，在另一个项目的 `components.json` 里把 `@anibt` 指向 `http://127.0.0.1:4310/r/{name}.json`。

### 目录

```
registry.json                     registry 源（name、homepage、include、组件条目）
registry/anibt/theme/theme.css    主题唯一的源：token、@theme、@utility、@keyframes
registry/anibt/theme/registry.json  由脚本生成的 registry:theme 条目（提交进仓库）
registry/anibt/ui/*.tsx           组件源码（会被写进使用者的项目）
scripts/registry-theme.mjs        theme.css → 条目 JSON；--check 校验是否最新
lib/site-url.mjs                  站点 URL 常量（NEXT_PUBLIC_SITE_URL）
app/                              Next.js 页面；globals.css = 标准 shadcn init + 主题
components/site/                  站点外壳与文档组件
components/demos/                 文档里的在线示例（预览 + 代码）
content/docs/                     文档（MDX，fumadocs）
public/brand/                     品牌素材（不在 AGPL 许可内）
```

### 加一个组件

1. 源码放到 `registry/anibt/ui/<name>.tsx`：从 `@/lib/utils` 引入 `cn`，同库组件用 `@/registry/anibt/ui/<x>`，材质只用 `anibt-*` 配方和 token。给 Radix 原语传 `asChild` 时写成 `{...{ asChild: true }}`（见下方维护者备注）。
2. 在 `registry.json` 的 `items` 里加条目：`registryDependencies` 至少有 `@anibt/theme`，npm 依赖写在 `dependencies`（`@anibt/*` 只能出现在 `registryDependencies`）。
3. 示例放到 `components/demos/<name>-*.tsx` 并在 `components/demos/index.ts` 登记。
4. 文档写在 `content/docs/components/<name>.mdx`，加进同目录的 `meta.json`。
5. 需要新配方或 token 时只改 `theme.css`，然后 `pnpm registry:theme`。

## 部署到 Cloudflare Workers

站点是纯静态导出。根目录的 `wrangler.jsonc` 把 `out/` 作为 Worker `anibt-ui` 的静态资源，没有 Worker 脚本。这份文件在仓库里时，`npx wrangler deploy` 会直接上传 `out/`，不会再检测 Next.js、也不会安装 OpenNext。

`out/` 在 `.gitignore` 里。Workers Builds 不执行 `wrangler.jsonc` 里的自定义构建。连接这个仓库时，安装依赖之后的部署命令是 `npx wrangler deploy`，面板上的构建命令是空的。因此 `pnpm install` 在 `WORKERS_CI=1` 时会跑 `scripts/ensure-export.mjs`：`out/` 不存在就执行 `pnpm build`。本地安装不会构建。

部署命令保持 `npx wrangler deploy`。构建命令留空。面板里再填一次 `pnpm build` 会把站点构建两遍，结果相同。

| 设置 | 值 |
| --- | --- |
| Build command | 留空 |
| Deploy command | `npx wrangler deploy` |
| 生产分支 | `main` |
| Node.js | 22。仓库 `.node-version` 已写明；也可设 `NODE_VERSION=22`。Next.js 16 要求 ≥ 20.9 |
| `PNPM_VERSION` | `10.34.5`（构建镜像默认的 pnpm 更旧，且不会从 lockfile 推断版本） |
| `NEXT_PUBLIC_SITE_URL` | 站点的正式域名，默认 `https://ui.anibt.net` |

面板里的 Worker 名称必须是 `anibt-ui`，与 `wrangler.jsonc` 的 `name` 一致。名称不一致时，构建失败。

删掉 `wrangler.jsonc` 后再跑 `npx wrangler deploy`，Wrangler 会把项目改成 OpenNext。静态导出没有 `.next/standalone`，会在 `next build` 成功之后失败。

**`NEXT_PUBLIC_SITE_URL` 必须和 Worker 实际绑定的域名一致。** 它决定 `registry.json` 的 `homepage`、站内所有安装命令和 `components.json` 示例里的地址。不一致时，用户复制的命令会指向错误的地址。构建时 `registry:theme` 会按它改写 `registry.json` 的 `homepage`。自定义域名还没绑定时，把这个变量设成当前的 `*.workers.dev` 地址，或者先绑定域名再构建。

`public/_headers` 会进入 `out/`。Workers 解析这个文件，不把它当作页面。`/r/*` 带 `Access-Control-Allow-Origin: *`，浏览器里的工具可以读取 registry JSON。未知路径返回 `out/404.html`，状态码 404。`docs/components/button.html` 对应地址 `/docs/components/button`。

## 许可

代码以 GNU Affero General Public License v3.0 发布，仅此版本（SPDX：`AGPL-3.0-only`），全文见 [LICENSE](./LICENSE)。`shadcn add` 写入项目的组件源码适用同一许可。**品牌素材除外**：`public/brand/` 下的 AniBT logo 与吉祥物图片不在该许可内，只用于本站展示，不通过 registry 分发。

## 维护者备注：已核对的 shadcn registry 事实

技术选型：Next.js 16.3（App Router，`output: "export"`）+ Tailwind CSS 4.3 + fumadocs（`fumadocs-mdx` 负责 MDX 与页面树，`fumadocs-core` 负责加载与 shiki 高亮）。外壳与文档组件是自己写的 A 风格，没有用 `fumadocs-ui` 的外观：它自带的布局和配色会和贴纸手账打架。没有从官方模板 [shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template) 起步：它是 Next 15.5 的单页示例，没有文档系统、MDX 和主题切换；本仓库沿用了它的约定（根目录 `registry.json`、`registry/<style>/…`、`shadcn build` 输出到 `public/r`、`components.json`）。

2026-10-06 读过的文档：

- [Registry 介绍](https://ui.shadcn.com/docs/registry)、[Getting Started](https://ui.shadcn.com/docs/registry/getting-started)：根目录 `registry.json`，可用 `include` 组合多个 `registry.json`（构建后扁平化）；`shadcn build` 默认输出到 `public/r`；命名空间用 `registry add @x=<url>/{name}.json` 或 `components.json` 的 `registries` 登记；可用 `list` / `search` / `view` / `add` 测试。
- [registry.json](https://ui.shadcn.com/docs/registry/registry-json)：`name`、`homepage`、`include`、`items`；条目名在整个（含 include 的）registry 内唯一。
- [registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json)：`type` 有 `registry:base` / `block` / `component` / `font` / `lib` / `hook` / `ui` / `page` / `file` / `style` / `theme` / `item`；`files[].target` 对 `registry:page` 和 `registry:file` 必填，可用 `@ui/`、`@components/`、`@lib/`、`@hooks/` 占位；`cssVars` 有 `theme` / `light` / `dark`；`css` 支持 `@layer`、`@utility`、`@keyframes`、`@plugin`、`@import`；另有 `envVars`、`font`、`docs`、`categories`、`meta`。`tailwind` 字段已废弃。
- [Namespaces](https://ui.shadcn.com/docs/registry/namespace)：`{name}` 必填、`{style}` 可选；命名空间以 `@` 开头，只含字母数字、`-`、`_`；支持鉴权头与参数。
- [Registry Directory](https://ui.shadcn.com/docs/registry/registry-index)：登记方式是向 `shadcn-ui/ui` 的 `apps/v4/registry/directory.json` 提 PR；要求开源、公开、扁平、`files` 里不带 `content`。列表在 [registries.json](https://ui.shadcn.com/r/registries.json)。
- [CLI](https://ui.shadcn.com/docs/cli)：`shadcn build [registry] -o <dir> -c <cwd>`；`init -d` 等于 `--template=next --preset=nova`。
- [Examples](https://ui.shadcn.com/docs/registry/examples)：`registry:theme`、`registry:font`、`registry:base`、`@utility`、`@keyframes` 加 `--animate-*` 的写法。

在 `shadcn@4.21.2` / `@shadcn/registry@0.1.1` 源码与实测里确认的行为：

- `@anibt/<name>` 的解析不经过 npm：CLI 合并内置 registry、项目 `package.json` 的 `registries` 字段、`components.json` 的 `registries`，未知命名空间再查官方 registries 索引。npm 只用来安装条目 `dependencies` 里的包。
- cssVars 只有在解析出的依赖树里有 `registry:theme` / `style` / `font` / `base` 时才覆盖已有的值，所以主题是 `registry:theme`，每个组件都依赖它。
- `light` 写进 `:root`，`dark` 写进 `.dark`，`theme` 写进 `@theme inline`；每个变量都会在 `@theme inline` 里补一条映射：颜色值（`#`、`rgb`、`hsl`、`oklch`）变成 `--color-<名字>`，其它值变成 `--<名字>: var(--<名字>)`（无害的自引用）。
- 有 `radius` 时会补上倍数刻度（sm = ×0.6、md = ×0.8、lg、xl = ×1.4 …）。
- `css` 里的 `@keyframes` 会被写进 `@theme inline`；Tailwind 只输出被已输出 CSS 引用到的关键帧。
- `@utility` 里只能有一层嵌套规则；带内容的嵌套 at-rule 会被写成坏规则。JSON 也放不下同一属性写两次。`scripts/registry-theme.mjs` 遇到这些会直接报错。
- 安装时会删掉形如 `cn-*` 的类名，所以配方都叫 `anibt-*`。
- `base-*` 风格（现在 `init -d` 默认的 `base-nova`，Base UI）会把文件里 JSX 的 `asChild` 改写成 `render`：registry 文件里不要写 `<X asChild>` 的 JSX（组件自己声明 `asChild` 属性没问题）。
- 安装时 `@/registry/<style>/ui/x` 改写为使用者的 `aliases.ui`，`@/lib/utils` 改写为 `aliases.utils`。
- 现在的默认 `init` 生成 `lib/utils.ts` = `export { cn } from "cn"`，不装 `radix-ui`；装 `@anibt/button` 时 CLI 会补装 `radix-ui`。
- **base-* 项目的安装改写（shadcn 4.21.2 实测）**：`components.json` 的 `style` 以 `base-` 开头时（`shadcn init` 的默认 `base-nova`），`shadcn add` 会删掉安装文件里每个带闭合标签的 JSX 元素上的字面 `asChild` 属性，并把子元素改写成 `render`。我们的组件基于 Radix，所以源码里一律写成展开形式 `{...{ asChild: true }}`；`scripts/check-as-child.mjs` 挂在 `typecheck` 和 `registry:build` 上，`--fix` 可自动改写。
- **主题要单独安装**：只有直接 `add @anibt/theme` 时，CLI 才会覆盖 shadcn 的标准颜色变量；作为组件依赖带进来时只补 `--anibt-*` 和配方。stock init 在 `@theme` 里写了 `--font-sans: var(--font-sans)` 且 CLI 不覆盖已有的 `@theme` 键，所以正文字体栈放在 `:root` / `.dark`。

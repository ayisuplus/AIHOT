# MyHOT 频道 Fork 搭建记录

更新：2026-11-16。站名按用户决定暂用 MyHOT。

## 当前可用状态

- Fork：https://github.com/ayisuplus/AIHOT 。`origin` 是自己的 Fork，`upstream` 是 KKKKhazix/AIHOT。
- 本地站点：http://localhost:3080 ，后台：http://localhost:3080/admin 。仅绑定本机；数据库与后端 API 没有对外映射端口。
- Docker 应用镜像与 PostgreSQL 17 镜像已下载；数据库迁移与 10 个信源种子导入完成，API、worker、web 正常运行，数据库健康。
- 站点部署 smoke 全部通过，覆盖主要页面、API、RSS、图片和 MCP。内置浏览器已确认 MyHOT 首页可打开；目前没有精选内容。
- `.env` 由 vault 的 opencodego 条目生成，不进入 Git。管理员密码在本地 `.env` 的 `ADMIN_PASSWORD`；日志与文档不记录密码或 API key。
- 模型：`https://opencode.ai/zen/go/v1` / `deepseek-v4.1-flash`；所有步骤沿用 default 路由，没有备用供应商。
- 自动采集、常驻进程的模型调用和全部 10 个来源仍暂停；对外推送关闭。启动成功不等于批量采集已验收。

## 已验证的网络与模型修正

Docker Desktop 跟随系统代理，但 Windows 构建客户端的认证请求仍需显式代理环境变量。本机直连 `auth.docker.io` 超时，显式使用 `http://127.0.0.1:7897` 返回 HTTP 200；传给 Docker 命令后，目标镜像信息读取、下载、构建及启动均成功。规则已写入项目 `AGENTS.md`，无需更换镜像源或修改系统代理。

中文项目路径曾触发 BuildKit session header 非 ASCII 错误。已创建英文 junction：`C:/Users/36322/.codex/workspaces/china-us-ai-news`，指向原项目，不是另一份代码。

Opencodego `/models` 返回 HTTP 200 且包含指定模型。首次生成返回 `MissingSessionID`；按服务端要求补充：

- `LLM_USER_AGENT=MyHOT/0.1`：如实标识本客户端。
- `LLM_SESSION_HEADER=x-opencode-session`：由站点地址和工作项 subject 计算稳定哈希。同一工作项重试不变，不同工作项分开，不发送原始 subject。
- 以上仅作用于 default 模型，不改其他具名供应商。调用仍经过原有回执、预算与状态机制。

修正后通过单独命令临时开启模型调用，成功将 [Hugging Face 的真实条目](https://huggingface.co/blog/nvidia/simready-assets-robot-pick-and-place)整理成中文标题和摘要，回执 ID 为 2。此次是单条输入到结构化输出的验证，未声称完整预筛、双评分、入选、归组或日报流水线已验收。常驻 worker 的模型开关没有被开启。

模型来源：[OpenCode Go 官方说明](https://opencode.ai/docs/console/go/)。继续使用 vault 已有且实测可用的 zen/go/v1 地址，没有替换供应商或伪装成编码工具。Go 主要面向编码代理，批处理的持续可用性仍以实际服务响应为准；遇到明确拒绝不绕过。

## 首轮信源实际试抓

通过 AIHOT 自身的 `previewSource` 在运行容器内验证，不只是直接请求上游。

| 来源 | 结果 |
|---|---|
| OpenAI RSS | 1385 条候选 |
| Google DeepMind RSS | 100 条候选 |
| Hugging Face RSS | 907 条候选 |
| NVIDIA RSS | 18 条候选 |
| MoonshotAI、zai-org、Tencent-Hunyuan 新仓库发现 | 各 30 条候选 |
| deepseek-ai、QwenLM、MiniMax-AI 新仓库发现 | HTTP 403；保留暂停，原因未确认，不当作已接通 |

预览条数不是实际导入条数；首次导入配置最多回灌 3 条且限制一个月。GitHub 创建时间仅表示仓库创建，不代表模型发布时间；还需要补齐 Release、README 更新与闭源产品公告。原始试抓结果在 `.data/source-preview.log`，前期上游探测在 `.data/source-probes.json`。其余候选见 [信源清单](channel-source-shortlist.md)。

## 验证记录

- Windows：类型检查、网页构建通过。此前独立测试 271/274，通过 Linux 运行进一步核对；Windows Node 24.15.0 低于项目要求。
- 运行容器：Node 24.22.3。初次完整后端测试 1141/1145，四个失败均报告测试容器缺少 git；生产镜像本身不需要 git。后续在独立测试容器安装 git，挂载只读 Git 元数据，使用专用 `myhot_test` 数据库重跑。测试不会调用真实付费服务。
- WebKit 2311 已通过现有代理下载，重新执行网页测试。
- 最终测试结果见下方追加的验收结果；详细日志在 `.data/`，不进入 Git。

## 本机启动与更新

仅首次初始化执行 `vault run -- node scripts/channel-init.ts`；现有 `.env` 不要重建。

```powershell
$env:HTTP_PROXY = 'http://127.0.0.1:7897'
$env:HTTPS_PROXY = 'http://127.0.0.1:7897'
$project = 'C:/Users/36322/.codex/workspaces/china-us-ai-news'
docker compose --project-directory $project -f "$project/docker-compose.yml" build
# 仅在上一条成功后运行：
docker compose --project-directory $project -f "$project/docker-compose.yml" up -d
node scripts/smoke.ts --base http://localhost:3080
```

代理端口有变化先核对系统设置和监听端口。容器运行时的访问与主机构建是两条链，分别验证，不要把主机的 127.0.0.1 填进容器当成主机代理。

下一步：诊断三个 GitHub 403 来源，核对已抓到条目的日期、正文和增量，再逐源启用；完成一条新闻的完整分析链后再打开批量任务。

## 本次最终验收结果

- Node 24.22.3 / Linux：类型检查通过；完整后端测试 1147 项，1146 通过、0 失败、1 跳过。跳过的是 root 身份下无法模拟权限拒绝的目录备份用例。新增会话标识测试验证了认证头保留、工作项间隔离及同一工作项稳定性。
- Windows 网页测试：65 项，63 通过、2 失败。失败为 WebKit 的目录键盘滚动和长列表返回阅读位置；本次没有修改这些页面逻辑，原因尚未进一步定位，不声称全部网页测试通过。
- 最终部署 smoke 全部通过；模型真实生成成功；7/10 个来源的引擎预览成功，另外 3 个 GitHub 来源返回 403。
- 本次明确完成：镜像下载、应用构建与本地启动、代理规则记录、模型会话标识接入。批量自动采集及完整新闻编辑流水线仍待验证。

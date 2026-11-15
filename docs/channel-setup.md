# MyHOT 频道 Fork 搭建记录

2026-11-16。站名按用户决定暂用 MyHOT。

## 已完成

- GitHub Fork：https://github.com/ayisuplus/AIHOT 。`origin` 指向自己的 Fork，`upstream` 指向 KKKKhazix/AIHOT。
- 通过 vault 的 opencodego 条目生成本地 `.env`；密钥、管理员密码及数据库密码均不进入 Git 或工具输出。初始化脚本拒绝覆盖已有文件。
- 模型 base URL：`https://opencode.ai/zen/go/v1`；模型 ID：`deepseek-v4.1-flash`。所有处理步骤沿用引擎的 default 路由，没有配置其他供应商或自动回退。
- 使用该凭据访问 `/models` 返回 HTTP 200，列表包含指定模型。尚未执行生成请求，不代表推理或完整业务链已验证。
- 本地部署计划监听 `127.0.0.1:3080`；Compose 项目名独立为 `china-us-ai-news`。数据库、API 不对外暴露端口。
- 首轮配置为 4 个 RSS（OpenAI、DeepMind、NVIDIA、Hugging Face）和 6 个中国厂商 GitHub 组织的新仓库发现（DeepSeek、Qwen、Kimi、智谱、MiniMax、腾讯混元）。10 个配置通过引擎字段校验；全部默认暂停，自动采集与模型调用也保持关闭。
- 六个组织的公开 API 均返回 HTTP 200，每个抽取到三条含名称、链接、创建日期的真实条目。记录在忽略目录 `.data/source-probes.json`。这只验证上游接口及字段，不是 AIHOT 完整采集验收；创建日期不等于模型发布日期，已有仓库的 Release/README 更新尚未覆盖。

其余候选继续见 [信源清单](channel-source-shortlist.md)。此次没有改分类、评分标准、阈值、品牌或发布条款，也没有启用对外推送。

## 实际检查结果与阻挡

| 检查 | 结果 |
|---|---|
| npm ci | 成功；本机 Node 24.15.0 低于仓库要求的 24.22.1，产生引擎警告 |
| npm run typecheck | 通过；初次 Vite 临时目录创建失败，创建该目录后通过 |
| npm run build -w @aihot/web | 通过 |
| npm run test:standalone | 构建后重跑：274 项，271 通过、3 失败；出站网络测试出现 Windows Node 原生断言/子进程失败，未认定为本次配置导致，也未修改上游测试绕过 |
| npm test | 未运行到测试：缺少专用 *_test / *_ci 数据库，被保护检查拒绝 |
| npm run test:web | 一项通过后 WebKit 用例失败并挂起，已终止此次测试树；单独诊断确认缺少 Playwright webkit-2311 可执行文件 |
| Docker Compose build | 尚未通过；中文工作目录导致 session header 非 ASCII 错误，英文 junction 解决该错误；之后两次均在 Docker Hub auth.docker.io 拉取 Node 基础镜像令牌时网络超时 |
| 数据库迁移、后端启动、站点 smoke、真实模型处理 | 未执行，依赖镜像构建及数据库就绪 |

详细本地检查日志保存在 `.data/`，不进入 Git。没有启动成功的站点可供访问。

## 在本机继续

初始化仅首次执行（已有 `.env` 不要重建）：

```powershell
& 'C:/Users/36322/.codex/tools/vault/vault.cmd' run -- node scripts/channel-init.ts
```

此机器已创建英文目录入口 `C:/Users/36322/.codex/workspaces/china-us-ai-news`，是指向项目的 junction，实际文件仍在原项目目录。Docker Desktop 已启动。

恢复 Docker Hub 网络后：

```powershell
$project = 'C:/Users/36322/.codex/workspaces/china-us-ai-news'
docker compose --project-directory $project -f "$project/docker-compose.yml" build
# 仅在上一条成功后运行：
docker compose --project-directory $project -f "$project/docker-compose.yml" up -d
node scripts/smoke.ts --base http://localhost:3080
```

随后在支持的 Node 版本和专用测试数据库上完成全套检查，补齐 Playwright 测试浏览器。按原有回执和预算机制做一条真实模型请求，再逐源试抓、抽查标题/链接/日期/正文和增量；通过后才启用来源与采集。管理员密码在本地 `.env` 的 `ADMIN_PASSWORD`，无需写进文档。

模型资料：[OpenCode Go 官方说明](https://opencode.ai/docs/console/go/)。官方当前文档列出了模型 ID，但接口路径已使用 inference/go/openai/v1；此处仍使用 vault 原有 zen/go/v1，模型列表已实测成功，未擅自替换。文档说明 Go 主要面向编码代理请求，因此新闻批处理的服务适配与实际可用性仍需验证；不要伪装编码客户端或绕过服务拒绝。

下一步优先解决 Docker Hub 网络阻挡，完成运行环境与单条业务验证，再继续补齐 Anthropic、Meta、Grok、字节等官网入口以及国内厂商闭源产品公告。

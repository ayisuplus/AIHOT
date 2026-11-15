# 中美 AI 新闻频道：首批信源清单

日期：2026-11-16（Asia/Shanghai）

状态：选源建议稿，尚未配置或启用采集。目标是支持真人口播与 HyperFrames 动画解读。

## 仓库基线与核对范围

- 上游：[KKKKhazix/AIHOT](https://github.com/KKKKhazix/AIHOT)
- 本次克隆基线：`594c7ce876e9fe22bc6efe4f58e3d4583923e341`，保留原有 Git 历史。
- 已核对本地 `README.md`、`AGENTS.md`、`docs/customize.md` 的信源章节、`docs/sources.md` 的相关接口说明和 `industry/sources.json`。
- 上游包含 18 个示范信源；已有配置不代表本机采集成功。此次没有安装依赖、启动服务、调用付费采集或模型。
- 下表的“网页已读”只表示本次读取到公开页面；“仓库示例”只表示上游提供地址；“待核对”表示尚未验证该入口。所有来源的自动采集都未实测。
- 表中的优先级、筛选方法和节目用途是本频道的建议，不是来源自述，也没有写入运行配置。

## 选择原则

P0：第一轮优先验证和接入。P1：首批选题工作可使用，自动化放在 P0 跑通之后。P2：储备。

先确保中美主要厂商的一手消息都能进入视野，再增加社区与媒体。优先收模型/产品发布、API 与价格变化、开放权重及许可变化、可复现的能力进展。普通教程、招聘、重复转载和没有新信息的榜单截图先降低优先级。

不要为了凑中美比例强行配对。相同任务、版本、推理设置和成本口径具备可比性时才作比较；官方公告是“该厂商作出此声明”的一手证据，不自动证明其性能宣传成立。

## A. 厂商与实验室：优先建立一手覆盖

| 优先级 | 对象与入口 | 重点看什么 | 建议接入方式 | 本次核对状态 |
|---|---|---|---|---|
| P0 | [OpenAI News](https://openai.com/news/) | 模型、产品、API、技术报告 | RSS：`https://openai.com/news/rss.xml`；定价/更新日志另作后续变化监控 | 仓库示例 |
| P0 | [Anthropic News](https://www.anthropic.com/news) | Claude、编程工具、Agent、研究 | `web_list`，待确认静态页面结构与日期 | 网页已读 |
| P0 | [Google DeepMind](https://deepmind.google/blog/) | Gemini、生成媒体、基础研究 | RSS：`https://deepmind.google/blog/rss.xml` | 仓库示例；Google Research 作为补充，避免同事件重复 |
| P0 | [Meta AI Blog](https://ai.meta.com/blog/) | 模型、开放生态、多模态 | `web_list`，待试抓 | 网页已读 |
| P0 | [Grok / x.ai 新闻入口](https://x.ai/news) | Grok、API、产品变化 | `web_list`，待试抓；品牌与发布主体以原文当时标注为准 | 网页已读 |
| P0 | [NVIDIA Blog](https://blogs.nvidia.com/) | 算力、推理成本、AI 软件与生态 | RSS：`https://blogs.nvidia.com/feed/`，按 AI 主题过滤 | 仓库示例 |
| P0 | [DeepSeek GitHub](https://github.com/deepseek-ai) | 新模型、技术报告、权重与许可 | 组织新仓库发现 + 重点仓库 Release/README；需要确定具体仓库与变更规则 | 组织页已读；API 与变更监控未测 |
| P0 | [Qwen GitHub](https://github.com/QwenLM) / [官网](https://qwen.ai/) | 通义模型、多模态、开放生态 | 优先核对组织仓库与模型卡；官网新闻入口单独核对 | GitHub 页面已读；官网本次未返回可读正文 |
| P0 | [MoonshotAI GitHub](https://github.com/MoonshotAI) | Kimi、长上下文、Agent、开放模型 | 同上；后续补官方产品与 API 更新入口 | 组织页已读；采集未测 |
| P0 | [Z.ai / 智谱 GitHub](https://github.com/zai-org) | GLM、编程、Agent、开放模型 | 同上；不把组织首页直接当新闻流 | 组织页已读；采集未测 |
| P0 | [MiniMax GitHub](https://github.com/MiniMax-AI) | 语言、语音、多模态与开放模型 | 同上；后续补官方产品发布页 | 组织页已读；采集未测 |
| P0 | [ByteDance Seed](https://seed.bytedance.com/en/) | 语言、图像、视频、音频研究与发布 | 从 Blog & Publication 入口配置 `web_list`，过滤招聘 | 官网已读；具体选择器未测 |
| P0 | [Tencent Hunyuan GitHub](https://github.com/Tencent-Hunyuan) | 混元、生成媒体、开放权重 | 组织发现 + 重点仓库更新，补充官方公告 | 组织页已读；采集未测 |

中国厂商的 GitHub 是第一轮可核对的一手入口，不足以覆盖闭源产品和商业 API 更新。正式启动前必须补充各家的官网公告、产品更新日志或经核实的官方账号，不能把“没有 Release”解释为“没有新闻”。组织新仓库、README 修改和 Release 是三种不同事件；普通 commit 不应逐条成为新闻。

## B. 开源、论文和社区：发现值得追的线索

| 优先级 | 来源 | 节目价值与范围 | 接入建议及边界 | 本次状态 |
|---|---|---|---|---|
| P0 | [Hugging Face Blog](https://huggingface.co/blog) | 模型发布、生态、工具；后续定向跟踪上述厂商的模型卡 | 仓库 RSS：`https://huggingface.co/blog/feed.xml`；模型榜与模型卡需单独接入 | RSS 为仓库示例，模型卡监控未测 |
| P0 | GitHub 定向监控 | 以上厂商 + 从选题发现的重点开源项目 | 优先具体项目与作者；Trending 只作发现线索，不全站收 commits | 本次读取了表 A 的组织页，未实现监控 |
| P1 | [Hacker News](https://news.ycombinator.com/) | 开发者反馈、Show HN、争议与实际使用问题 | 候选 RSS：`https://news.ycombinator.com/rss`；若需热度/评论，官方 API 要先取 ID 再取详情，不能把 ID 数组直接喂给 `json_list` | RSS 在网页工具中因 XML 类型不支持而未读；[官方 API 文档](https://github.com/HackerNews/API)已读，接口未调用 |
| P1 | [Reddit r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) | 本地部署、量化、开放模型使用反馈 | 先人工挑选；API/RSS 可用性、访问条件另核对；不把热门帖子当性能证明 | 社区页面已读；自动接入待核对 |
| P1 | [Hugging Face Daily Papers](https://huggingface.co/papers) | 论文热度与传播线索 | 先读榜单再回论文及作者代码；网页/接口接入另测 | 页面已读 |
| P1 | [arXiv](https://info.arxiv.org/help/rss.html) | 研究原文；初选 `cs.AI`、`cs.CL`、`cs.LG`，有视觉选题再加 `cs.CV` | 官方 RSS 格式已核对，如 `https://rss.arxiv.org/rss/cs.AI+cs.CL+cs.LG`；去重跨分类条目，只将与选题相关者送深入分析 | 官方 RSS 文档已读；订阅未实测；预印本不等于同行评审 |
| P1 | [Nature 机器学习专题](https://www.nature.com/subjects/machine-learning) | 有新闻价值的科学进展、AI for Science | 页面提供 RSS/Atom 入口；低频筛选，必要时回论文；不限定研究材料只能来自 Nature | 专题页已读，订阅及全文可用性未测 |

## C. 对比数据：作为证据材料，单独记录快照

| 优先级 | 来源 | 回答的问题 | 边界与接入状态 |
|---|---|---|---|
| P1 | [Arena](https://arena.ai/leaderboard) | 人类使用与偏好评价里，哪些模型出现变化？ | 本次旧 `lmarena.ai/leaderboard` 跳转至此；页面已读。先人工记录类别、模型版本、日期和样本信息；自动快照未实现 |
| P1 | [OpenRouter Rankings](https://openrouter.ai/rankings) | 平台上哪些模型被更多调用？ | 页面按经其 API 处理的 token 排名；不代表全行业份额或能力排名。页面已读，自动快照未实现 |
| P1 | [Artificial Analysis](https://artificialanalysis.ai/) | 相应测试下，能力、成本、速度如何取舍？ | 页面已读；引用时保留测试版本、推理设置、价格及延迟口径。API、授权及快照方式待核对 |

这类页面即使 URL 不变，数据也可能更新。普通文章 RSS/去重不能替代历史快照；记录观测时间，与新闻的发布时间分开。先人工用于试播，之后再决定是否实现定时差分。

## D. 解读与媒体：少量补足，不重复搬运

| 优先级 | 来源 | 用途 | 入口与状态 |
|---|---|---|---|
| P1 | [Simon Willison](https://simonwillison.net/) | 工具实测、模型行为、技术细节 | `https://simonwillison.net/atom/everything/`，仓库示例；引用测试需保留条件 |
| P1 | [TechCrunch AI](https://techcrunch.com/category/artificial-intelligence/) | 商业发布、融资、产品与公司动态 | `https://techcrunch.com/category/artificial-intelligence/feed/`，仓库示例 |
| P1 | [The Verge AI](https://www.theverge.com/ai-artificial-intelligence) | 消费产品、平台变化与社会影响 | `https://www.theverge.com/rss/ai-artificial-intelligence/index.xml`，仓库示例 |

同一官方公告被多家媒体转述，仍然只有同一个原始证据；只有新增采访、实测或独立材料才增加证据。

## E. 保留但不抢第一轮自动化的来源

| 来源 | 建议位置 | 为什么稍后做 |
|---|---|---|
| X 官方账号、研究者与开发者 | 高价值补充；先选上述厂商官方账号和少量具体研究者，不扫全站关键词 | AIHOT 的 `x_search` 需要 SocialData 付费服务；账号、覆盖、额度和运行可用性均未核对 |
| 即刻 AI 圈子、知乎 AI 话题 | 中文用户需求、争议、叙事差异；先人工选送原帖 | 具体圈子、话题入口与自动访问方式待核对；高赞不等于事实可靠 |
| 官方 Discord 的公告频道 | 产品更新补漏；只考虑经授权可访问的公告区 | 需要确定服务器、频道及权限；当前未选定或测试，不采集私人讨论 |
| 机器之心、量子位、晚点 LatePost、其他中文媒体 | 中文报道、采访与公司背景的候选名单 | 本次未验证入口；从实际能补充独立信息的栏目中选少量加入，公众号渠道另核成本 |
| 百度文心、阶跃星辰、其他中国厂商；Microsoft、AWS、Apple、Mistral 等 | 第二批扩展，或重大新闻时定向查证 | 不是认为不重要；先完成首批中美一手覆盖，再按漏报情况补充。Mistral 是国际补充，不归入美国厂商 |

## 接入时的具体约定

1. 先验证表 A 的一手来源与 Hugging Face Blog；重点是补齐国内来源，不能只开已有海外 RSS 就宣布完成。
2. 对每个技术端点记录：来源主体、语言、用途、规范 URL、获取方式、发布时间/时区、最近成功时间、失败原因、费用或认证要求。同一主体的官网、GitHub、HF 和 X 关联到同一实体。
3. 用 AIHOT 的 `editorial` / `hot_signal` / `isolated` 按具体用途配置。社区默认作为线索；作者自己的可复现实测可单独审阅，不把整个平台一律当一手。
4. 通过标准：至少抽查 3 条真实条目的标题、原始链接、发布时间、正文或摘要；静态列表日期缺失、空正文、登录页均不得标“已接通”。再检查重复项、历史内容和一次增量更新。
5. GitHub 需要分别验证组织发现和选定仓库的更新，不假定每个模型仓库都发 Release；普通网页列表不执行 JavaScript，不能靠改选择器读取空壳页面。
6. 榜单先人工留存有日期的引用；全文展示和对外再分发默认关闭。录制前再核对价格、版本和关键结论。
7. 先产出几张选题卡，记录“有独立信息 / 重复 / 无关 / 采集失败”，再据此增删信源；此清单不创建提醒或定时任务。

## 下一步

从此表选择首轮具体端点，按“已有 RSS → 中国厂商官方入口 → 需要额外接入的渠道”逐批试抓；输出可用性记录后才生成正式信源配置。频道名称、出刊时间、模型与预算另按部署时实际需要确定。

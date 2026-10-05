# 2026-09-28｜四专题研究审计

> 严格窗口：2026-09-27 18:00—2026-09-28 18:00（Asia/Shanghai）。本文件记录检索、时间、去重、证据等级与排除，不以渠道数量或篇幅替代有效证据。

## 1. 工作流与责任分离

- 四个独立专题代理分别完成组织扁平化、人才密度、岗位序列与晋升机制；主代理交叉核验并生成总览。
- 渠道代理分别覆盖：官方／一手与 ATS、国内外权威媒体和公司案例、咨询／学术／专业研究及社媒／职场线索。
- 独立内部知识源代理读取 `digest.md`、最近 14 日 `daily/`、`daily-report/`、`knowledge/`、历史专题与滚动基线，只用于去重和校准。
- 按 `operations/information-editorial-standard.md`，本任务未编辑、重排或覆盖 `digest.md`、`daily/`、`daily-report/`；对广谱信息流有价值的发现另列 `information-candidates.md`，尚未声称已入信息库。

## 2. 证据等级与判定规则

| 等级 | 本次口径 |
|---|---|
| L3/L4 | 有制度文本、运行数据或多方独立验证，可支持机制／结果判断 |
| L2 | 公司官方职位、具名高管陈述或可核原始材料，只支持其明确披露的窄事实 |
| L1 | 供应商观察、转载、单方结果陈述、日期不精确或方法披露不足 |
| L0/Context | 匿名、观点、旧材料、仅检索摘要或没有制度／结果验证，只作待验证线索 |

职位发布只证明目标职责，不证明已录用、已运行或产生结果；转载不算独立事实根；搜索索引时间不等于事件时间。跨窗口旧事件只可作 Context。一个事实根在四专题可分别解释，但新增计数只计一次。

## 3. 严格窗口一手证据

| 事实根 | 可核时间（上海） | 等级 | 可用事实 | 明确边界 |
|---|---:|---|---|---|
| Cursor Regional Director FDE | 9/28 11:29:07 | L2 | 直接管理并扩展 6—8 名 FDE；负责招聘、技术绩效、成长路径、复杂交付、客户与产品反馈 | 不证明公司减层、实际跨度、到岗与结果 |
| Cursor FDE | 9/28 11:29:28 | L2 | 发现、原型、生产硬化、监控、迭代与事故响应端到端责任 | 不证明人才密度、职级或晋升机制 |
| OpenAI Paris HRBP | 9/28 16:45:05 | L2 | CSE 选举／咨询／沟通／文档；经理赋能；Legal、ER、People Ops、Total Rewards 升级 | 不证明 CSE 已运行或员工体验改善 |
| Anthropic Applied AI Architect | 9/28 15:22:51 | L2 | 技术—伙伴—商业—教学—产品反馈复合责任；广告薪酬 £150k—£190k | 单岗不能推出独立序列、溢价或实际支付 |
| Mistral DesignOps | 9/28 16:24:31 | L2 | 自动化重复协调／汇报／跟踪，删除无效仪式，保留决定论坛、记录和跨团队接口；`team-of-one` | 不证明节时、减层或净负担下降 |
| Databricks APAC 三岗位 | 9/28 11:55—17:08 | L2 | 宽责任 owner 仍调用教育、支持、专业服务、产品与工程；Scale SE 使用 AI 工作流覆盖多客户 | 不证明人员减少、同岗薪酬或交付结果 |
| Cohere Solutions Architect | 9/28 17:42:14 | L2 | 客户全生命周期复合责任 | 无薪酬、等级与运行结果 |

主要原始链接：

- https://jobs.ashbyhq.com/cursor/c30b1b69-518a-4fdd-a316-667380bcd608
- https://jobs.ashbyhq.com/cursor/166c3951-1d2a-4e61-b79b-bedefe96073b
- https://jobs.ashbyhq.com/openai/923eebc8-5591-4057-892f-5825de1a5460
- https://job-boards.greenhouse.io/anthropic/jobs/5432583008
- https://jobs.ashbyhq.com/mistral.ai/f144a78d-f4dc-4ffb-ab3a-220ca9437c7d
- https://databricks.com/company/careers/open-positions/job?gh_jid=8849669002
- https://databricks.com/company/careers/open-positions/job?gh_jid=8735828002
- https://databricks.com/company/careers/open-positions/job?gh_jid=8849858002
- https://jobs.ashbyhq.com/cohere/d1ab4fbd-3271-4057-8b20-dfaad4270fa8

## 4. 媒体与公司案例

- 人民网 9 月 28 日 13:59 转载科锐国际数据：AI 职位发布量、职位占比与算法／应用结构的精确数字可互证；原始页面没有完整样本、站点、关键词与去重方法，定为 **L2、仅限数据集**。事件是 9 月 17 日报告，今日增量是权威再发布与可追溯事实链，不写成当日市场突变。
- 9 月 28 日发布的阿里云霍嘉访谈描述 9 月 23 日云栖大会机制：No-go 价值门控、周度交付、SA／FDE／产品 One Team 与前线反哺产品。为具名高管陈述 **L2**，周期结果无分母与独立验证，降为 **L1**。
- 科锐国际 FDE 文章提出 Echo／Delta 可由互补小队形成，薪酬为服务商观察且无样本；定为 **L1**。
- 国际权威媒体严格窗口高质量新增为 **0**；Reuters、FT、WSJ、CNBC、Fortune、TechCrunch、The Verge、Hacker News 未发现满足时间、直接相关和正文可核的新增事实。Forbes／Raspberry 仅作 Context。

## 5. 咨询、学术与社媒覆盖

- 严格窗口内 McKinsey、BCG、Deloitte、HBR 原创直接相关材料：**0**。
- 严格窗口内可核方法与发布时间的直接相关学术／预印本：**0**。
- ETHRWorld SEA 当日文章复述 BCG 旧自报调查；ETHRWorld × Tekstac 为商业圆桌匿名案例；WorldatWork 日期可核但精确时间不足。三者均只作 Context。
- LinkedIn Pulse 与 Substack 分别提出初级学习管道、员工知识训练 agent 的收益分配问题；无公司制度和运行数据，仅作员工风险线索。Reddit、X、知乎、小红书未获得可核的高置信新事实。

## 6. ATS 扫描与四专题零结果

- 官方／ATS 扫描覆盖 Cursor、OpenAI、Anthropic、Mistral、Databricks、Cohere、Perplexity 等；Perplexity MTS 虽 ATS 时间入窗，但外部镜像显示 9 月 24 日已出现，按重列／刷新降级，不计新岗位。
- 高置信企业减层／中层减少结果：**0**。
- 高人才密度识别—招聘—授权—激励—保留运行闭环结果：**0**。
- 正式新岗位／职族／序列规则与运行结果：**0**。
- 完整固定／即时／项目晋升制度及运行后效：**0**。

## 7. 内部知识源去重与缺口

- `daily/2026-09-28.md` 和 `daily-report/2026-09-28.md` 的卡片均为窗口外旧事件、日期级更新或已收录弱信号，未升级为今日专题新增事实。
- 最近 14 日已反复出现的 FDE、复合人才、岗位变宽、AI 人才数据与 GitLab 历史晋升制度，只用来校准边界，不重新包装为今日发现。
- `daily/2026-09-26.md` 与 `daily-report/2026-09-26.md` 缺失，记为内部交付缺口，不能解释为“当天没有信息”，本任务不越权回填。
- 稳定基线继续保留：先删等待／转述／复核／无价值审批；人才看真实任务和机会分母；岗位采用稳定主干＋动态任务技能价格层；晋升使用证据常开、永久职级固定校准。

## 8. 代表性检索账本

外部检索优先使用 AnySearch CLI（本地调用），随后对关键 ATS、原始公司页和转载链定向补证。代表性搜索词：

- `AI organization layers managers September 28 2026 official`
- `site:jobs.ashbyhq.com AI manager career growth September 28 2026`
- `site:boards.greenhouse.io AI architect salary September 28 2026`
- `site:mckinsey.com OR site:bcg.com OR site:deloitte.com AI organization work design September 2026`
- `site:hbr.org AI promotion performance career architecture 2026`
- `site:36kr.com OR site:jiqizhixin.com OR site:huxiu.com 2026-09-28 AI 组织 岗位 人才`
- `AI 人才需求 119% 2026 9 28`
- `阿里云 霍嘉 FDE 2026 9 28`
- `AI promotion instant promotion skills badge employee review September 2026`
- `AI job family career architecture salary premium 2026`

搜索限制：付费媒体只返回标题／摘要时不纳入；相对时间缺绝对分钟时降级；原始来源不可得时不以格式和字数制造结论。

## 9. 主代理交叉验证结论

今日最强证据是职责、跨度、接口和治理的**设计信号**，不是结构与人才机制的**运行结果**。四份专题与总览均把事实、判断、Context、行动建议和来源分开；任何关于减层、人才密度、正式序列、即时晋升和薪酬溢价的扩张性表述均被降级或删除。

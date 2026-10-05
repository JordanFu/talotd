# 2026-09-05｜研究审计

> 正式窗口：2026-09-04 18:00—2026-09-05 18:00（Asia/Shanghai）。扫描发现时间不替代原始发布时间；窗外事件、仅有日期无时分的页面和同一事件根的转译／转载只进入 Context。

## 研究流程与分工

- 内部知识源代理：读取 `digest.md`、近 14 天 `daily/` 与 `daily-report/`、`knowledge/`、专题历史和职级基线，识别重复事件根、内部回流与判断变化。
- 主渠道代理：扫描官方／一手、Reuters 等权威媒体、咨询与学术、中国科技媒体和公司材料。
- 信号渠道代理：扫描学术、招聘 JD／薪酬和社媒／职场平台，并将不可核身份、分母或绝对时间的材料降为线索。
- 四个专题代理：独立形成扁平化、人才密度、岗位族群与晋升机制四稿；主代理负责窗口核验、证据交叉、冲突校准与总览。

## 工具与检索审计

- 优先检索工具：AnySearch CLI（本地调用）；脚本 SHA256 `e520555be51c39e129320bbdd367ac18d6298fd854901dc81c6b8a0b3d2a5380`；Python 3.11.2。
- 学术域发现按要求先执行 `list_domains --domain academic`，后端返回 `API Error: tool 'list_domains' not found: tool not found`；另一代理的同命令出现 `Connection Error: Unable to reach the API endpoint.`。因此改用通用实时搜索与官方页面复核，未把失败查询当作零结果证据。
- 一次 `batch_search` 因超过五条查询返回 `Error: batch_search supports a maximum of 5 queries`；拆批后成功。
- 代表检索词：
  - `September 5 2026 AI organization workforce restructuring managers talent promotion official`
  - `site:reuters.com September 4 2026 AI jobs workforce organization management promotion`
  - `site:mckinsey.com OR site:bcg.com OR site:deloitte.com OR site:hbr.org September 5 2026 AI organization talent workforce`
  - `2026年9月5日 AI 组织 调整 人才 岗位 晋升 大厂`
  - `site:arxiv.org AI workplace management organization promotion jobs submitted September 4 2026`
  - `site:nber.org OR site:ssrn.com AI workplace employees management September 4 2026`
  - `site:jobs.ashbyhq.com OR boards.greenhouse.io AI salary Sep 4 2026 organization`
  - `site:reddit.com OR teamblind.com AI promotion layoffs managers Sep 4 2026`

## 窗口核验表

| 事件根 | 原始／最强时间锚点 | 窗口判定 | 处理 |
|---|---|---|---|
| OpenAI 德国公共 Wiki 侧信道 | Reuters 转录 2026-09-04 06:05 EDT＝10:05 UTC＝北京时间 18:05；Reuters 官方账号 10:37 UTC；TechCrunch 2026-09-04 09:21 PDT＝北京时间 09-05 00:21 | 两家独立报道均明确入窗 | 以“公开研究＋两家媒体报道＋公司回应”的窄治理事实使用；数量与 OpenAI 归因保留边界 |
| Salesforce 高管递延薪酬计划 | SEC `ACCEPTANCE-DATETIME 20260904160524`（EDT）＝北京时间 09-05 04:05:24 | 入窗 | L2 计划条款；不外推留任、人才密度或晋升效果 |
| GreenCore 采购／交易代理 | PR Newswire 2026-09-04 16:56 EDT＝北京时间 09-05 04:56 | 入窗 | L1 公司自述的人机签署边界；交易量与效果未独立审计 |
| Exemplar CPO 任命 | PR Newswire 2026-09-04 10:44 EDT＝北京时间 09-04 22:44 | 入窗 | L1—L2 任命与职责事实；无 AI 因果和成效 |
| 京东物流 CFO 接续 | 港交所 2026-09-04 16:42（香港／上海同区） | 窗口前 1 小时 18 分 | 只作历史 Context，不计今日新增 |
| SpaceXAI Haggle Bot | 官方页面仅标 2026-09-04，无时分 | 无法确认 | L1 Context；不计严格窗口新增 |
| 四组招聘 JD | 聚合页仅标 2026-09-04，无小时与时区 | 无法确认 | L1 Context；不证明到岗、组织运行或真实支付 |

## 去重与证据边界

- OpenAI 8 月官方报告、METR 8 月调查是旧线边界，不计作两个今日新来源；`digest → knowledge entity/concept/wiki → specials` 是内部加工链，不是独立互证。
- 京东物流 CFO 公告早于窗口；后续转载和翻译不能重置事件时间。Adobe CEO 接班、Datamaran CTO、36氪 AI 招聘稿、旧 HBR 文章均为窗外事件根。
- 招聘页只证明雇主公开需求；社媒匿名评论只提示复核负荷，不代表行业或企业制度。
- Salesforce 计划条款可核，但计划批准日早于披露日；今天的新事实是监管披露，不是今天开始运行的证明。

## 渠道覆盖与零结果

| 渠道 | 结果 |
|---|---|
| 官方／一手 | SEC、公司稿与独立研究项目取得入窗材料 |
| 权威媒体／咨询 | Reuters、TechCrunch 有 OpenAI 事件报道；McKinsey／BCG／Deloitte／HBR 无合格新机制稿 |
| 公司案例 | Salesforce、GreenCore、Exemplar；均缺组织／人才后效 |
| 学术／专业研究 | 无严格窗口内直接相关的新同行评审论文 |
| 招聘 JD／薪酬 | 有日期匹配、无可核时分的四组 L1 线索；正式新增为 0 |
| 社媒／职场 | 无身份、原文、绝对时间和机制原件同时可核的新增 |
| 国内企业／媒体 | 无中国大厂正式组织、岗位族、职级、晋升或薪酬制度原件；零结果不等于没有变化 |

## 人本与数据治理边界

任何代理或组织系统都必须先给员工带来可感知的减负与更好工作，再谈组织数据。只使用经授权、在工作中自然产生且完成任务所必需的证据；明确用途、访问、保留、纠错、删除和独立申诉。若节省的时间全部被换成更多并发、目标和加班，应记录为**工作负荷强化**，不能写成无条件生产率提升。

# 2026-10-26｜四课题研究审计

## 时间、去重与编辑边界

- 严格事实窗口：2026-10-25 18:00—2026-10-26 18:00（Asia/Shanghai）。
- 按最早可核公开时间判定；页面刷新、转载、接口更新时间、迟到摘要和同一事件的新闻稿／PDF／媒体转述不生成新事实根。
- 严格窗口取得3个独立外部根：SKT正式治理机制、People Matters具名访谈、Gartner咨询预测。两份OpenAI岗位是L1招聘意图记录，不计完整机制根；Anthropic仅有接口更新时间，降为Context。
- `digest.md`、`daily/`、`daily-report/`、`knowledge/`只读；广谱候选写入`information-candidates.md`，未接收不得称已入信息库。
- `daily-report/digest.json`最高只到2026-07-20，只作历史索引，不用于判断10月26日增量。

## 多代理分工

| 分工 | 交付 |
|---|---|
| 专题一代理 | `01-flat-organization.md`；核组织层级、跨度、决定权、经理去向、后效与SKT／Gartner |
| 专题二代理 | `02-talent-density.md`；核识别、招聘、项目、回报、学习、盘点、留任与People Matters |
| 专题三代理 | `03-job-family-career-architecture.md`；核人类岗位、动态技能、智能体资产、价格与官方招聘接口 |
| 专题四代理 | `04-promotion-system.md`；核固定／即时／项目／认证／徽章／AI贡献／校准／薪酬与申诉 |
| 分渠道代理 | 官方、媒体／咨询、公司制度、学术、招聘薪酬、社媒／国内／公众号交叉扫描；底稿`/tmp/odic-1026-channels.md` |
| 内部知识源代理 | 最近14日去重、判断变化、反例、人本边界和待验证；底稿`/tmp/odic-1026-internal.md` |
| 主代理 | 时间根、等级、同源依赖、跨专题归因和人本边界复核；总览、候选、页面、质量门禁、发布与线上验证 |

## AnySearch检索记录

外部检索优先使用 `python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py`，对高价值页面继续抽取正文、接口字段、PDF页码和最早公开时间。核心查询包括：

1. `AI organization restructuring layoffs managers promotion jobs October 26 2026`
2. `AI talent skills hiring compensation promotion policy October 26 2026`
3. `site:reuters.com AI workforce management jobs October 26 2026`
4. `site:36kr.com AI 组织 岗位 人才 晋升 2026年10月26日`
5. `"October 26, 2026" AI workforce employees managers organization`
6. `"Oct. 26, 2026" AI jobs promotion employees company`
7. `2026年10月26日 AI 组织 人才 岗位 薪酬 晋升`
8. `site:techcrunch.com AI jobs workforce October 25 2026 OR October 26 2026`
9. `SK Telecom first AI Governance Report October 2026 workforce agents official`
10. `site:sktelecom.com AI Governance Report 2026`
11. `site:news.sktelecom.com AI governance report agent workforce October 2026`
12. `SK텔레콤 AI 거버넌스 리포트 2026 PDF`
13. `SKT AI Governance Report 2026 PDF employee ID agents`
14. `site:sktelecom.com/img 2026 AI Governance Report PDF SKT`
15. `site:linkedin.com/posts AI organization employees managers October 26 2026`
16. `site:reddit.com AI workplace managers promotion October 26 2026`
17. `AI middle management flattening October 25 2026 October 26 2026`
18. `October 26 2026 AI workforce organization employees promotion`
19. `People Matters Nandini Tandon October 26 2026 reskilling cybersecurity`
20. `Gartner top AI trends infrastructure operations 2027 October 26 2026`
21. `China employment risk reviews AI deployment workforce heavy sectors October 26 2026 official`
22. `IIT Madras report AI entry-level jobs India October 26 2026 official report`
23. `site:nature.com OR site:sciencedirect.com AI employee organization promotion October 26 2026`
24. `site:jobs.ashbyhq.com OR site:greenhouse.io AI job compensation October 26 2026`
25. `site:36kr.com OR site:huxiu.com OR site:jiemian.com AI 组织 人才 2026年10月26日`
26. `微信公众号 AI组织进化论 2026年10月26日`
27. `site:weibo.com OR site:zhihu.com AI 职场 晋升 2026-10-26`
28. `site:cerai.iitm.ac.in "How AI Is Reconfiguring Work in India"`

完整分渠道检索词、URL、时刻、抽取结果与同源依赖保存在`/tmp/odic-1026-channels.md`；四专题各自的定向查询保留在来源索引或待验证部分。

## 事实根裁定与交叉纠错

| 候选 | 最早可核时间（上海） | 等级 | 正式裁定 |
|---|---|---|---|
| SKT新闻稿＋40页AI治理报告 | 2026-10-26；页面无分钟，PDF10月22日制作 | L2—L3公司正式机制 | 窗口内，同根计1；工号概念6月已公开，今日增量是完整治理链和评价接口，不是人类制度结果 |
| People Matters／Indusface高管访谈 | 2026-10-26；截止前取得全文 | L1—L2具名主张 | 窗口内独立根；支持buy／build方法，不支持公司项目与后效 |
| Gartner I&O趋势发布 | 2026-10-26；截止前可检索 | L1—L2咨询预测 | 窗口内独立根；支持职能重组假设，不支持已实施减层或结果 |
| OpenAI数据中心基础设施架构师 | 官方接口2026-10-25 23:10 | L1招聘意图 | 窗口内岗位记录；支持职责／薪资意图，不计企业制度或结果 |
| OpenAI政府应用AI架构师 | 官方接口2026-10-26 14:03 | L1招聘意图 | 窗口内岗位记录；支持端到端责任与专家分工，不计职族成熟 |
| Anthropic计算化学岗位 | 接口`updated_at`为2026-10-26 08:37 | L1岗位文本 | 只证明更新时间，不能冒充首次发布；Context |
| IIT Madras CeRAI白皮书 | 多家媒体2026-10-26；官方原文未取得 | L1—L2二手候选 | 不进入事实主干；明日补官方PDF、作者、日期和方法 |
| 中国AI就业风险政策 | 原始发布2026-10-23 | L3政策一手 | 窗外；10月26二次解读不刷新 |
| Barclays约5000人裁员 | 原始披露2026-10-22 | L2媒体／公司信息 | 窗外；不计今日 |
| 影石黄金键帽 | 报道2026-10-25 11:40／13:09 | L1—L2认可线索 | 窗外；不是职级、调薪或晋升制度 |
| Everything-PR 50份岗位分析 | 2026-10-25 14:07 | L1—L2目的抽样 | 窗外；昨日已处理，不重复 |
| `Scientific Reports`绩效论文 | 2026-10-25 08:00 | L2方法研究 | 窗外；昨日已处理，且作者否定直接用于高影响人事决定 |
| Latent、Anthropic其他岗位、Agoda | 最早时间均早于窗口或仅转载／在列 | L1 | 窗外或非新根；只作背景材料 |

## 四专题证据计数

- 直接减层制度、层级／跨度／决定权迁移、经理去向与可归因后效：0。
- 高人才密度完整“识别—招聘—项目—回报—留任”机制，及实际薪酬／股权／快速晋升／90—365天留任后效：0。
- 完整人类新岗位、职族、职业序列制度与同岗同级同地区成交价格对照：0。
- 直接人类晋升制度、完整资格／机会／证据／岗位／评审／校准／薪酬／理由／申诉规则与可归因后效：0。
- 可升级的窄判断：智能体自主性提高时，身份、真人责任、权限、日志、停止、分级监督和退出应同步加强；这些机制必须与人类岗位、绩效、薪酬和晋升分开治理。

## 内部知识源校准

- 已读`digest.md`、`daily/2026-10-12.md`至`2026-10-26.md`、`daily-report/`同周期、`knowledge/catalog.json`、`knowledge/index.md`、相关`wiki/`、`summaries/`、`concepts/`、基线档案和10月12—25日专题。
- 10月26日晨间信息库已收NYT、绩效论文、影石、Everything-PR、Latent、Anthropic等，不在晚间专题重复计新。
- 最近两周持续削弱“AI自然压平组织”“岗位说明书消失”“技能库替代职级”“AI使用量代表人才或晋升价值”等强断言。
- 今日加强的四层方法：人类岗位层、动态技能／项目层、智能体资产层、可逆价格层；身份、技能、价格、奖励和永久职级不混用。

## 人本、隐私与收益分配审查

- 员工价值先于组织数据价值：每项机制先说明员工少做什么、获得什么正常工时、支持、机会、自主权或回报。
- 优先使用已授权工作中自然产生的质量、返工、等待、升级、人工接手、客户结果和风险记录；不新增详细日报。
- 智能体日志首先服务智能体治理。若要用于个人绩效、薪酬、晋升或裁员，必须重新定义目的、最小范围、保留期限、可见者、解释、更正、申诉和禁止用途。
- 不采私人对话、屏幕、个人提示词、在线时长、情绪、健康或非工作数据；不以调用量、令牌、成本或智能体数量给员工排名。
- 学习、训练、核验、举证、导师与值守均是正式工作，须进入正常工时、容量和回报；自动化拿走入口任务时应补替代练习和经验管道。
- 同时看组织收益和员工净收益。省下一小时又追加一小时复杂任务，应写劳动强度变化，不写员工生产率提升。

## 覆盖缺口与停止条件

- 未取得中国互联网／科技企业的减层、岗位族、任职资格、薪带或晋升制度原件。
- 未取得SKT智能体数量、负责人负荷、错误／停止／终止分母、奖励规则、员工申诉与净收益结果。
- 未取得Indusface项目原件、Gartner预测中的具名实施案例、OpenAI岗位到岗与内部职族归属。
- IIT Madras CeRAI白皮书未取得官方原文；指定公众号「AI组织进化论」原文未取得，渠道覆盖不完整，不能说没有更新。
- 两轮定向补证后仍只有岗位刷新、课程、摘要、供应商观点、同源转载或匿名体验时，停止扩大检索；保留为Context或线索，不用字数和数量制造结论。

# 2026-10-27｜四课题研究审计

## 时间、去重与编辑边界

- 严格事实窗口：2026-10-26 18:00—2026-10-27 18:00（Asia/Shanghai）。
- 按最早可核公开时间判定；页面刷新、转载、相对时间、接口更新时间、媒体估算和同一事件的多份转载不生成新事实根。
- 可用稳定页面元数据确认落窗的4个独立根：Microsoft VEO、Principal具名访谈、华盛顿州培训资金公告、EZRA Loop供应商发布。
- BCG审批研究、Oracle产品公告和Gartner摘要只有日期级锚，保留为当轮补证，不加入严格分钟计数；AWS为旧线补读，Reddit为匿名弱信号。
- SKT治理报告已在10月26专题作为新根处理；今日只作连续背景，不重复计新。
- `digest.md`、`daily/`、`daily-report/`、`knowledge/`只读；新增广谱候选仅写入`information-candidates.md`，未接收不得称已入信息库。

## 多代理分工

| 分工 | 交付 |
|---|---|
| 专题一代理 | `01-flat-organization.md`；核层级、跨度、决定权、经理去向、员工后效与Microsoft／BCG |
| 专题二代理 | `02-talent-density.md`；核识别、培养、项目、回报、留任与Principal／Washington／EZRA |
| 专题三代理 | `03-job-family-career-architecture.md`；核岗位、技能、职族、序列、价格工具与不新增条件 |
| 专题四代理 | `04-promotion-system.md`；核固定／即时／项目／认证／徽章／AI贡献／校准／申诉 |
| 分渠道代理 | 七类渠道扫描、时间与同源依赖；底稿`/tmp/odic-1027-channels.md` |
| 内部知识源代理 | 最近14日去重、反例、判断变化、人本边界；底稿`/tmp/odic-1027-internal.md` |
| 主代理 | 直接核页面元数据、统一时间冲突、事实根计数、跨专题归因、人本边界、总览、候选、页面、门禁和发布 |

## AnySearch与渠道检索记录

外部检索优先使用`python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py`。主代理与专题代理的核心查询包括：

1. `October 27 2026 AI workforce organization jobs promotion`
2. `AI organization restructuring middle managers October 27 2026`
3. `AI talent skills pay hiring promotion October 27 2026 official`
4. `AI job architecture career framework promotion system October 27 2026`
5. `site:blogs.microsoft.com OR site:bcg.com OR site:mckinsey.com AI workforce October 27 2026`
6. `site:newsroom OR site:about October 27 2026 AI workforce reorganization managers`
7. `October 27 2026 AI talent density hiring compensation skills official`
8. `October 27 2026 job architecture career framework AI jobs official`
9. `October 27 2026 promotion system skills badges internal mobility AI`
10. `Microsoft voluntary exit offer level 70 October 26 2026 official`
11. `Principal Financial AI literacy 20000 employees October 26 2026`
12. `Washington Employment Security 13.2 million training October 26 2026`
13. `EZRA Loop connected human AI coaching October 27 2026 official`
14. `site:36kr.com OR site:huxiu.com OR site:jiqizhixin.com OR site:jiemian.com AI 组织 人才 岗位 晋升 2026年10月27日`
15. `site:linkedin.com OR site:reddit.com AI workplace managers promotion October 27 2026`
16. `微信公众号 AI组织进化论 2026年10月27日`

AnySearch批量调用首次受网络沙箱限制，提升网络权限后恢复；对Microsoft、Principal和华盛顿州页面又用公开HTML直接核验元数据。BCG与Gartner正文抽取失败时，没有用摘要补写方法；只采用当天信息库已核内容并保留日期级边界。

## 事实根裁定与交叉纠错

| 候选 | 最早可核时间（上海） | 等级 | 正式裁定 |
|---|---|---:|---|
| Microsoft VEO | 2026-10-26 23:33:56 | L2公司一手 | 严格窗内；支持三层选择接口，不支持减层、AI替岗、晋升或后效 |
| Principal培养访谈 | 2026-10-26 19:00 | L2具名披露 | 严格窗内；支持岗位化培养与容量，不支持能力、净收益、薪酬晋升或留任因果 |
| Washington培训资金 | 2026-10-26 20:00 | L2政府一手 | 严格窗内；两笔资金同根，支持资金与条件分账，不支持就业和留任后效 |
| EZRA Loop | 2026-10-26 18:00 | L1—L2供应商一手 | 严格窗内；支持产品功能与隐私问题，不支持独立效果或员工同意 |
| BCG审批研究 | 2026-10-26，分钟未核 | L2研究／L1匿名案例 | 日期级补证；不加入严格分钟计数，不支持减层因果 |
| Oracle Fusion Companion | 2026-10-26，分钟未核 | L2供应商一手 | 日期级能力公告；不支持客户上线或员工减负 |
| Gartner省时去向 | 2026-10-26，分钟未核 | L1研究摘要 | 日期级弱信号；21%为时间去向，不是员工比例 |
| AWS高级FDE管理岗 | 截止2026-10-21 | L1岗位意图 | 窗外旧线；反驳“小队化等于无管理”，不证明组织图 |
| Reddit工程师体验 | 绝对日期／身份未核 | L1匿名线索 | 只进入Context，不作趋势或岗位事实 |
| SKT治理报告 | 已在前一窗口计新 | 历史L2—L3 | 本期连续背景，不能重复计数 |

跨代理时间口径曾出现冲突：专题一／三／四初稿把Microsoft或Principal写成“分钟未知”；内部代理提供元数据后，主代理直接核验并统一修正。分渠道代理所称“精确分钟强制度根0”与4个分钟级事实根并不矛盾：4个是局部方案／披露／产品根，仍没有减层、人才闭环、新序列或晋升的完整强制度根。

## 四专题证据计数

- 直接减层制度、层级／跨度／决定权迁移、经理去向与可归因员工后效：0。
- 高人才密度完整“识别—招聘—项目—回报—留任”机制，及实际薪酬／股权／快速晋升／90—365天自愿留任后效：0。
- 完整新岗位、职族、职业序列制度及同岗同级同地区实际薪酬对照：0。
- 直接人类晋升制度、完整资格／机会／证据／岗位／评审／校准／薪酬／理由／申诉规则与可归因后效：0。
- 可升级的窄判断：选择权分层、支持容量纳入机制、培训／项目／绩效／薪酬／退出／晋升分账、学习与教练数据先服务个人。

## 内部知识源校准

- 已读`digest.md`、`daily/2026-10-14.md`至`2026-10-27.md`、`daily-report/`同周期、`knowledge/catalog.json`、`knowledge/index.md`、相关`wiki/`、`summaries/`、`concepts/`、基线档案与近14日专题。
- 今日信息库已经接收Microsoft、BCG、Principal、Washington、Oracle、Gartner、AWS和Reddit；专题不重复回流。EZRA为专题新核候选，只进入`information-candidates.md`。
- 最近两周持续削弱“AI自然压平组织”“参与率等于能力”“岗位说明书消失”“技能库替代职级”“AI使用量代表人才或晋升价值”等强断言。
- 本期增强四层分账：长期岗位身份、动态技能／项目、可逆市场价格、永久职级；退出、绩效、调薪与晋升另行分账。

## 人本、隐私与收益分配审查

- 个人价值先于组织数据价值：每项机制先说明员工少做什么、获得什么正常工时、支持、机会、自主权或回报。
- 优先使用已授权工作中自然产生的质量、返工、等待、升级、人工接手和客户结果；不新增详细日报、录屏或私聊开放。
- 自愿退出、自愿学习和自愿使用教练均需真实替代选项、拒绝保护和不会反向影响评价的规则。
- 教练对话、协作信号、情绪／强度推断、私人知识库和细粒度行为不得默认进入人才盘点、绩效、晋升或离职预测。
- 员工应知道数据来源、用途、可见者和保留期，并能查看、更正、补证、拒绝和申诉。
- 学习、训练、核验、举证、导师和值守均是正式工作，须进入正常工时、容量和回报；自动化移走入门任务后要补练习与经验阶梯。
- 同时看组织收益与员工净收益。省下一小时又追加一小时复杂任务，应写劳动强度变化，不写员工生产率提升。

## 覆盖缺口与停止条件

- 未取得中国互联网／科技企业的减层、人才密度完整闭环、岗位族／序列或晋升制度原件。
- 未取得Microsoft方案的金额、接受分母、拒绝保护、内部机会、交接和余留负荷。
- 未取得Principal的机会分母、导师工时、旧任务退出、独立能力、调薪晋升和长期留任。
- 未取得EZRA的数据同意、退出、字段、组织可见、保留期、敏感推断和自报效果方法。
- 指定公众号「AI组织进化论」原文未取得，渠道覆盖不完整，不能说没有更新。
- 两轮定向补证后仍只有产品主张、课程覆盖、旧岗位、同源转载或匿名体验时，停止扩大检索；保留为Context，不用字数和数量制造结论。

# 2026-09-03｜研究审计记录

> 唯一正式研究窗口：**2026-09-02 18:00—2026-09-03 18:00（Asia/Shanghai）**。本记录保留检索口径、纳入排除理由与工具异常，不作为第二独立证据来源。

## 1. 工作流与分工

- 渠道代理一：官方／一手、权威媒体、咨询与中国公司材料。
- 渠道代理二：学术／专业研究、招聘岗位说明、薪酬与社媒／职场弱信号。
- 内部知识源代理：审计 `digest.md`、近 7—14 天 `daily/` 与 `daily-report/`、`knowledge/`、历史专题和基线，负责去重、反例与稳定判断。
- 四个专题代理：独立撰写组织扁平化、人才密度、岗位族群序列与晋升机制；主代理只做跨专题校准、总览、页面与发布验证。

## 2. 检索工具与异常

- 外部检索优先使用 AnySearch CLI（本地调用）。
- 运行时：Python 3.11.2；脚本 SHA256：`e520555be51c39e129320bbdd367ac18d6298fd854901dc81c6b8a0b3d2a5380`。
- 按技能说明调用学术垂直域发现时，原样报错：`API Error: tool 'list_domains' not found: tool not found`。随后回退到常规 AnySearch、出版机构页面与定向站点检索；回退后仍未取得严格窗口内、能回答四专题的高质量新增学术研究。

## 3. 代表性检索词

- `September 3 2026 AI organization restructuring managers layoffs promotion jobs official`
- `site:reuters.com September 3 2026 AI workforce organization restructuring`
- `site:microsoft.com OR site:sec.gov Microsoft agents infrastructure reportable segments September 2026`
- `Microsoft Agents and Infra Devices and Consumer September 2 2026 Reuters reportable segments`
- `site:uber.com simpler faster Uber September 2026 layoffs layers teams P&L`
- `Uber simpler faster layers micro teams P&L September 2 2026 Reuters Axios exact time`
- `site:techcrunch.com OR site:theverge.com OR site:fortune.com September 3 2026 AI jobs organization teams`
- `2026年9月3日 AI 组织 调整 人才 岗位 晋升`
- `site:36kr.com OR site:huxiu.com OR site:jiqizhixin.com OR site:jiemian.com 2026年9月3日 AI 组织 人才`
- `Deloitte Open Model Engineering practice September 2 2026 official`
- `OpenAI Participation Economy September 2 2026 workforce policies skilled work report`
- `UKG 387 AI tools 12000 agents employees September 2 2026 official`
- `September 3 2026 AI workforce skills promotion calibration research`
- `WIRED Meta drops AI token counts performance reviews September 3 2026`
- 对 OpenAI／Anthropic 官方材料、Greenhouse／Ashby 招聘页，以及 LinkedIn、Reddit、Blind、Glassdoor、知乎、小红书进行定向检索。

## 4. 纳入、降级与排除

| 材料 | 窗口判定 | 处理 | 理由 |
|---|---|---|---|
| 微软改用“智能体与基础设施”“设备与消费者业务”两个可报告分部 | SEC 文件 2026-09-02 16:30:24 美东，即 2026-09-03 04:30:24 上海 | 窄机制 L3 | 8-K／附件一手材料与 Reuters 等独立报道互证；只证明用于经营管理与财务报告，不证明法律实体、组织图、减层、人员预算或经营结果 |
| Uber “Simpler, faster Uber”重组 | Guardian 2026-09-02 12:45 美东，即 2026-09-03 00:45 上海；官方同一事件根 | 窄结构 L3 | 官方披露约 10% 团队、七层以上占比、微型团队、跨度、团队合并、单一损益责任与远程政策，Reuters／Guardian 交叉；公司未归因 AI，结果尚未发生 |
| Greg Casar 办公室公布 OpenAI／Anthropic 回函及追问 | 新闻稿 2026-09-02 16:13:44 美东，即 2026-09-03 04:13:44 上海 | 治理增量 L2 | 可证议员要求补充透明度，以及 OpenAI 披露监测、升级、人工暂停和自动停机建设；不能证明自动停机已部署或控制有效 |
| Deloitte 新建 Open Model Engineering 全球业务单元 | 官方稿 2026-09-02 无时分；稿源镜像 11:00，落入窗口 | 机制 L2 | 可证跨区域业务单元、持续客户问题、混合模型交付与 FY2027 招聘／培训／认证前线部署工程师；同源稿不能证明人数、薪带、晋升或结果 |
| UKG 员工众创 AI 应用组合 | Fortune 2026-09-02 12:26 美东，即 2026-09-03 00:26 上海 | 案例 L2 | 可证公司受访者披露提案、筛选、工具、客服和结果维度；数字是公司自报，且旧文 24,000 小时／月与本次 8,500 小时／月口径冲突，不能相加或写趋势 |
| Meta 调整 AI 绩效措辞 | WIRED 2026-09-03 01:32:02 UTC，即 09:32:02 上海 | 制度事件 L2 | 三名收到通知员工、Meta 发言人及第二媒体支持删除 AI 用量措辞和不用 Token 数评价影响；无公开政策原件，不能外推全员、晋升或薪酬，员工叙述与公司表述有冲突 |
| 微软印度区 Work Trend Index | 官方页 2026-09-03 14:57:21 上海 | 调查／案例 L2 | 可证官方披露的 AI 用户样本、能力偏好和客户案例自报；分母不是印度劳动人口，不能证明因果、扁平化、评审公平或员工分享节时 |
| 波士顿联储 Workers' Perspectives on AI | 2026-09-02 17:35 UTC，即 2026-09-03 01:35 上海 | 研究 L3（内容） | 方法与附录公开、两期约 1,300 户主代表性样本；证明自报感知和任务层差异，不证明 AI 实际生产率或失业因果 |
| OpenAI《The Participation Economy》 | 文档标 2026-09-02，分钟不明 | 日期匹配的倡议 L2，入窗边界保守 | 可作端到端重构、员工授权、复用和收益分配框架；自有样本里的“请求工作”不等于完成、节时或企业普遍实施 |
| Anthropic 聘任 Matt Clifford | Guardian 2026-09-02 12:00 上海，已纳入 9 月 2 日正式稿 | 排除今日新增 | 同一聘任事件根不因议会评论或内部重复转写而重置；利益冲突评论若有新字段只作治理 Context |
| 中国前线部署工程组合卡 | 混合 8 月 29 日湖北政策、动态招聘页、9 月 2 日无时分媒体与既有案例 | Context L1—L2 | 可作“前线宽责任＋后台深专家”的累计信号；不能整体计入今日新增，不能证明成熟岗位族、实际到岗或后效 |
| HBR 智能体跨孤岛编排文章 | 页面缺可审计绝对时分，方法、样本和结果不足 | Context L1—L2 | 只形成流程编排问题，不证明企业普遍落地、减层或生产率改善 |
| Anthropic 动态政策设计招聘页 | `updated_at`／首次发布时间不可核 | 招聘线索 L1 | 职责文本不等于今日新设、编制、到岗或岗位族 |
| Uber Reddit 等员工讨论 | 匿名、动态、自选择，身份与时分不完整 | 社媒线索 L1 | 只形成协调转嫁、管理负荷和迁移成本问题，不代表员工总体或证明结果 |
| Apple 接班、Meta Project OT、KPMG 调整等 | 事件根早于窗口 | 不计今日新增 | 仅在必要处作历史反例，不以转发或生效日重置事件根 |

## 5. 零结果

- 今日新增的 AI 因果明确、且具 30／90／180 天后效的减层案例：**0**。Uber 是强结构动作，但公司没有把重组归因于 AI。
- 今日新增的完整人才密度闭环（识别、招聘、配置、薪酬、授权、学习、盘点、保留及全成本结果）：**0**。
- 今日新增的成熟岗位族／序列制度原件（岗位编码、复数任职、分级、薪带、流动、申诉与退出）：**0**。
- 今日新增的固定晋升窗、周期外晋升、人才委员会、同行评审、AI 贡献评估、薪酬校准和申诉完整制度：**0**。
- 国内科技公司官方组织图、经理数、岗位序列或晋升薪酬制度原件：**0**。

## 6. 内部知识源边界

`daily → digest → daily-report → specials → weekly → knowledge → baseline` 是同一内部加工链，同一 URL 只算一个来源根。现有 2026-09-03 09:40 文件采用 **2026-09-02 08:31—2026-09-03 08:33**，比正式窗口提前 9 小时 29 分、并漏掉 9 月 3 日 08:34—18:00，只能保留为错误窗口候选池；其 Anthropic 聘任重复、中国前线部署工程多期拼接和晋升零结果均已在正式研究中校正。

旧《AI时代的职级变革—全球大公司组织架构调整追踪》含“AI 系统性移除中层”“按代理完成工作衡量贡献”等过强旧判断，正式稿以 6 月 30 日以后专题基线和 8 月 27 日—9 月 3 日反事实为准，不直接复述。

## 7. 人本校验

所有建议按“个人效用 → 愿意且有意义使用 → 可信工作上下文 → 有效组织洞察”审计。员工工具先减少切换、等待、返工和重复填报；只取经授权的自然工作证据，不新增细粒度日报、截图、键鼠、私人通信或提示词上报。用途、访问、保留、纠错、反对二次用途与独立申诉必须透明。若节时全部重新装载为更多任务，统一写为**工作负荷强化**，不写无条件生产率提升；若删掉协调岗位却把协调劳动转嫁给经理与骨干，也不得宣称协调成本已经消失。

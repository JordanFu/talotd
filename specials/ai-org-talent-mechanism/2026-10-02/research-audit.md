# 2026-10-02｜四专题研究审计

## 1. 研究窗口与编辑边界

- 严格新增窗口：**2026-10-01 18:00—2026-10-02 18:00（Asia/Shanghai）**。
- 窗口外材料仅作历史连续性、方法补读、反例与 Context，不进入“今日新增事实”。
- 四专题只写深度研究，不改写或重排 `digest.md`、`daily/`、`daily-report/`。广谱增量只写入 `information-candidates.md`。
- 职位说明只证明目标责任与广告薪酬；调查只证明样本自报；组织公告只证明已宣布安排。三者均不自动证明到岗、运行结果或因果。

## 2. 多代理与交叉验证

- 内部知识源代理：读取 `digest.md`、近 14 日 `daily/` 与 `daily-report/`、`knowledge/`、近 14 日专题、四份 baseline，输出 `/tmp/internal-sources-2026-10-02.md`。
- 渠道代理 A：官方／一手、公司案例／制度、招聘与薪酬，输出 `/tmp/channel-primary-2026-10-02.md`。
- 渠道代理 B：国内外权威媒体、咨询、学术／专业研究、社媒／职场线索，输出 `/tmp/channel-research-social-2026-10-02.md`。
- 四个专题分别由独立专题代理形成初稿；主代理核对事实根、窗口、转载依赖、证据等级、相互冲突与人本边界，再生成总览、HTML 和发布文件。

## 3. 内部知识源读取与去重

- `daily/2026-10-02.md`、`daily-report/2026-10-02.md`：已包含 Revelio、Microsoft、DCHA、SB 947、ServiceNow 与 OpenAI People Innovation Labs 等材料。
- `specials/ai-org-talent-mechanism/2026-10-01/`：SB 947、ServiceNow Design Systems Documentation Lead、OpenAI People Innovation Labs TPM 已作为前一专题窗口事实使用，今日不重复计新。
- `specials/ai-org-talent-mechanism/baseline/`：用于核对连续判断；10 月 2 日自动更新时间不等于证据账本已有当日正式结论。
- `daily-report/digest.json`：最新记录只到 2026-07-20，不能承担近 14 日去重，故以 Markdown 正文、URL、事件名和岗位 UUID 为准。

## 4. 代表性外部检索词

外部检索优先使用 `python3 /Users/tal/.codex/skills/anysearch/scripts/anysearch_cli.py`；高价值候选回到官方原文、JSON-LD、官方 ATS 或方法附录。

- `October 2 2026 AI workforce organization restructuring layoffs managers promotion job architecture talent Reuters official`
- `2026-10-02 AI hiring skills based pay promotion workplace official company blog`
- `2026年10月2日 AI 组织 调整 岗位 人才 晋升 大厂`
- `Microsoft Ryan Roslansky leaves October 1 2026 leadership reorganization`
- `Revelio AI Labor Market Tracker September 2026 90% within occupations`
- `site:36kr.com 2026-10-02 AI 组织 人才 岗位 晋升`
- `site:jiqizhixin.com 2026-10-02 AI 团队 岗位 组织`
- `site:huxiu.com 2026-10-02 AI 裁员 中层 组织`
- `site:jiemian.com 2026-10-02 AI 招聘 人才 组织`
- `site:mckinsey.com OR site:bcg.com OR site:deloitte.com October 1 2026 AI workforce organization talent`
- `site:linkedin.com/posts OR site:reddit.com October 1 2026 AI workplace promotion employees`

## 5. 当窗事实根与证据等级

| 事实根 | 时间核验 | 等级 | 能支持 | 不能支持 |
|---|---|---:|---|---|
| Nike Pace 运营模式 | JSON-LD 2026-10-02 04:20 上海 | L2 已宣布动作 | 三地理区、权责与资源靠近市场、长期岗位减少、2027—FY2028 时间线 | 已减层、减少中层、AI 因果、员工后效 |
| Microsoft 领导汇报线调整 | 官方博客 2026-10-01，媒体具时分入窗 | L2 已宣布动作 | 新汇报线、年底前顾问过渡 | 整体扁平化、决定提速、离任动机外推 |
| Revelio 9 月劳动市场追踪 | 官方发布日期 2026-10-01 | L2 研究观察 | 90% 同比活动变化发生于职业内部；招聘／在线档案口径 | AI 因果、企业正式岗位制度、当月完整实绩 |
| IBM 加拿大 CHRO 研究 | 2026-10-02 12:01 上海 | L2 调查 | 不可见劳动、责任缺口、员工自报负担 | 因果、全球基准、净减负 |
| Preply 学习调查 | 2026-10-01 19:00 上海 | L1—L2 | 高使用与迁移困难并存 | AI 导致困难、绩效或晋升后效 |
| OpenAI 13 个官方职位 | ATS 精确 UTC 转上海，均入窗 | L1 招聘信号 | 宽结果岗与深专业岗并存、广告薪带 | 到岗、净增编、正式序列、薪酬因果 |
| Challenger 9 月报告 | 具时分转载为 2026-10-02 02:25 上海 | L2 公告计数／L0 因果 | 年度与当月公告理由差异 | AI 替代量、层级变化、实际离职 |
| DCHA 医疗人才报告发布说明 | 2026-10-01 公开 | L2 发布事实 | 有薪路径、教育与工作衔接的设计方向 | 就业、留任、公平与项目效果 |

## 6. 零结果与排除项

- 当窗完整企业减层运行结果：**0**。
- 当窗高人才密度识别—培养—配置—激励—保留闭环：**0**。
- 当窗企业正式新岗位族／序列原件与运行结果：**0**。
- 当窗完整晋升窗口、例外、校准、薪酬落位、理由、申诉与后效制度：**0**。
- Anthropic Greenhouse 只有 `updated_at`、缺首次发布时间，排除为当窗新增。
- McKinsey、OECD、Frontiers、NBER、ASQ 候选均因越窗、仅二次上线或基础研究已早先公开而降为 Context。
- 国内 36氪、机器之心、虎嗅、界面在严格窗口内可升级的一手机制事实为 0；搜索无结果不等于平台没有更新。
- 社媒／职场平台没有可升级制度事实；匿名体验与营销内容只作后续搜索入口。

## 7. 主代理交叉结论

当日最强张力不是“AI 是否必然删掉中层”，而是：Nike 把权力、责任与资源推近市场并预告更少岗位；OpenAI 同时购买人员发展、产品／客户结果、专家调度和容量配置等经理责任；Revelio 又显示大部分任务变化发生在职业内部；IBM 加拿大样本提示验证、纠错、补上下文和例外处理成为未被看见的劳动。

因此，四专题共同采用的约束是：**先迁移决定权、责任、容量、复核、职业入口与员工收益，再讨论永久减层、建序列或换职级。**若旧任务没有退出、员工没有正常工时与质疑权，结构变浅或 AI 使用增加不能称为组织进步。

## 8. 后续验证优先级

1. Nike 2027—FY2028 的组织图、层级、跨度、角色类别、人员去向、协商、转岗与员工工时后效。
2. OpenAI 当窗岗位的实际录用、团队规模、决定权、同级薪酬、正常容量、90／180 天运行结果。
3. Revelio 的活动分类、时间覆盖、职位去重和同企业前后配对；以企业任务台账和员工访谈复核。
4. IBM 加拿大样本的问卷、加权、显著性、行业分组，以及不可见劳动是否得到时间、薪酬和晋升承认。
5. 企业能否公开持续留证、即时阶段回报、固定永久校准、窄例外、薪酬落位、书面理由、纠错申诉和后效的同一套晋升制度。

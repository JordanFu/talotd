# 2026-10-29｜四专题研究审计

## 1. 研究窗口与交付边界

- **事实窗口**：2026-10-28 18:00—2026-10-29 18:00（Asia/Shanghai）。
- **正式产物**：四份专题日报、总览摘要、对应HTML阅读页、专题日索引与首页入口。
- **信息库边界**：专题只读`digest.md`、`daily/`、`daily-report/`与`knowledge/`；未覆盖、重排或改写信息库正文。新增广谱候选只写入`information-candidates.md`。
- **判定规则**：按事实根、最早公开时间与来源依赖去重；转载、同源新闻稿、旧案补读、页面刷新和招聘页面仍在线不生成新事实根。

## 2. 多代理分工

| 角色 | 任务 | 产物／状态 |
|---|---|---|
| 专题一代理 | 组织扁平化与中层减少 | `01-flat-organization.md`，完成并通过`git diff --check` |
| 专题二代理 | 高人才密度与复合型人才 | `02-talent-density.md`，完成并通过`git diff --check` |
| 专题三代理 | 岗位、族群与职业架构 | `03-job-family-career-architecture.md`，完成并通过`git diff --check` |
| 专题四代理 | 未来组织晋升机制 | `04-promotion-system.md`，完成并通过`git diff --check` |
| 内部知识源代理 | 最近14日信息库、知识库、基线与历史专题去重 | `/tmp/odic-1029-internal.md`，170行 |
| 分渠道代理 | 九渠道外部检索、时间核验、事实根与边界审计 | `/tmp/odic-1029-channels.md`，261行 |
| 主代理 | 跨专题交叉验证、总览、候选、渲染、质量与发布 | 本目录正式产物及发布验证 |

## 3. 渠道覆盖与结论

| 渠道 | 实际动作 | 严格窗口可核根 | 结论 |
|---|---|---:|---|
| 官方／一手 | 公司公告、政府／议会公告、Gartner原始发布定向检索 | PrismHR、委员会函、Gartner供应链 | PrismHR与Gartner可进核心事实；委员会函仅作治理Context |
| 权威媒体／咨询 | Bisnow、Gartner、Deloitte、Reuters及咨询机构定向检索 | Bisnow | 只支持具名工作方式线索，不支持共同制度或后效 |
| 公司案例／制度 | Pave、PrismHR及企业制度原件定向检索 | Pave、PrismHR | 可核责任与接口，不支持成熟组织机制 |
| 学术／专业研究 | 论文、专业机构、会议纪要检索 | 0个强学术根 | Gartner HR纪要仅L1 Context，未取得方法完整的新学术证据 |
| 招聘JD与薪酬 | 官方ATS、招聘页、薪酬字段与日期冲突核验 | 0 | 无有效同口径新增；不更新AI薪酬溢价 |
| 国内媒体／中国公司 | 36氪、机器之心、虎嗅、界面及公司官网定向检索 | 0 | 无可核严格新增，不代表没有变化 |
| 国际媒体 | Reuters、TechCrunch、The Verge等定向检索 | 0个独立新事件 | 未用旧裁员汇总或转载补数 |
| 社媒／职场 | Reddit、LinkedIn等线索检索 | 0 | 匿名体验只进入Context，不作制度事实 |
| 指定公众号 | 「AI组织进化论」精确检索 | 0 | **账号覆盖未完成**；不能说账号未更新 |

## 4. 本轮检索词样本

- `2026-10-28 2026-10-29 AI organization restructuring middle managers delayering official company`
- `2026-10-28 2026-10-29 AI workforce talent density hiring skills assessment retention official`
- `2026-10-28 2026-10-29 AI job family career architecture skills based organization job redesign`
- `2026-10-28 2026-10-29 promotion system AI contribution skills badges talent committee compensation calibration`
- `site:reuters.com 2026-10-28 AI workforce organization jobs managers promotion`
- `2026年10月28日 AI 组织 调整 中层 扁平化`
- `2026年10月29日 AI 岗位 职族 序列 技能 薪酬 招聘`
- `2026年10月28日 晋升 制度 AI 绩效 校准 人才委员会`
- 各渠道代理的完整查询、URL、时间与边界见`/tmp/odic-1029-channels.md`及四份专题“待验证清单／来源索引”。

## 5. 事实根与证据决策

| 事实根 | 等级 | 进入位置 | 关键边界 |
|---|---:|---|---|
| Pave／Quickbase员工自建应用调查 | L2 | 四专题事实或案例；总览核心 | 两个非配对自报样本；供应商相关；不能证明生产率、晋升或普遍比例 |
| Gartner供应链减员调查 | L2 | 专题一与总览核心；信息候选 | 管理者自报；不证明AI因果、扁平化或员工净收益 |
| PrismHR首席AI官任命与治理／培训接口 | L2 | 四专题事实或Context；总览核心 | 内部任命；不证明新职族、培训效果或晋升制度 |
| 美国众议院委员会事件报告请求 | L2事实 | 总览Context | 监督请求，不是法律或企业执行结果 |
| Bisnow具名工作场所访谈 | L1—L2 | 总览Context | 多家公司不同设想，无共同政策和前后结果 |
| Gartner HR Symposium第三日纪要 | L1 | 专题Context | 缺完整方法与效果数据 |
| Addison技能安全调查 | L2旧线 | Context | 10月27日发布；不同题目分母；不证明因果或个体诚信 |

## 6. 同源与跨专题去重

- Pave原始研究与GlobeNewswire稿合并为一个事实根；不能按样本、问题或四专题拆成多个趋势。
- PrismHR任命、委员会、培训与AI骨干网络合并为一个公司职责披露根；不与10月27日产品公告混算。
- Gartner供应链调查与Gartner HR会议纪要不是同一根，但后者方法不足，只有前者进入核心事实层。
- 四专题可从不同机制角度引用同一根，但总览只计一次；内部信息库和知识库只作去重、边界与连续判断，不增加外部证据根数。

## 7. 内部知识源校准

- 已读`digest.md`、最近14日`daily/`与`daily-report/`、`knowledge/catalog.json`、`knowledge/index.md`、`knowledge/wiki/`、`knowledge/summaries/`、`knowledge/concepts/`、基线档案与10月26—28日专题。
- 最重要的交叉顺序：真实任务与员工净收益 → 维护／支持／治理责任 → 岗位与序列 → 晋升与激励。
- 10月29日信息库中的Pave、PrismHR、委员会函、Bisnow已接收；Gartner供应链调查为本专题新增广谱候选。
- `git diff --name-only -- digest.md daily daily-report knowledge`在内部审计时为空；正式发布前再次复核。

## 8. 主代理交叉验证结论

1. 当日证据不支持“AI优先削减中层”，反而提示入门岗位先承压、治理和带教责任上升。
2. 员工自建工具的组织价值必须扣除维护、审查、集成、支持和退出成本，并核员工净收益。
3. 单一高管任命、委员会或骨干网络不构成岗位族群或职业序列。
4. 应持续识别真实贡献并即时给予可逆回报；永久换级仍需目标级责任、岗位需要、横向校准、薪酬承接、理由和申诉。
5. 国内制度原件、有效JD／薪酬、强学术研究、员工长期后效仍是核心缺口；缺口不以旧材料、转载或匿名线索补齐。

# 系统健康状态

> 自动生成：2026-10-14T01:55:45.009Z

## 一眼判断

- 总体状态：❌ fail
- 情报流状态：⚠️ warn
- 专题研究状态：⚠️ warn
- 知识库状态：⚠️ warn
- 自动化状态：❌ fail
- 一方链接状态：⚠️ warn
- 当前结论：存在阻断项；首页和自动化不得显示已正式完成。

## 情报流状态

- 最新日期：2026-10-14
- 今日卡片数：9
- 今日新增事实：7
- 旧线复核 / Context：0
- 弱信号：1
- 缺口记录：1
- 渠道覆盖：报告学术、官方、媒体、JD薪酬、社媒公众号
- sourceUrl 缺失：0

## 专题研究状态

- 今日日期：2026-10-14
- 今日专题状态：scheduled
- 最新正式日报日期：2026-10-13
- 待正式重跑日期数：25
- 待正式重跑日期：2026-10-12、2026-09-16、2026-09-11、2026-08-30、2026-08-29、2026-08-16、2026-08-09、2026-07-13、2026-07-12、2026-07-11、2026-07-06、2026-07-03 等 25 项

## 知识库状态

- Catalog 日期：2026-10-14
- 知识源：4
- 报告 / 知识页：208
- 待重试 PDF：17
- 本地或私有路径泄露：0
- 缺失 summaryFile：0

## 自动化状态

- 信息库当日交付：published
- 信息库线上内容一致：已核对
- 信息库交付截止：北京时间 11:30；告警不等于内容补跑完成。
- 本地正式任务：scheduled
- GitHub Actions 角色：fallback-only
- GitHub Actions 定时数：0
- 信息库链路：⚠️ warn
- 专题链路：⚠️ warn
- 知识库 lint 链路：✅ pass
- 链接检查链路：⚠️ warn

## 链接检查

- 一方断链数：0
- 外部链接 warning：32
- 公开扫描桥接：ok:200、ok:200

## 质量语义

- pass：状态一致；一方链接无 broken；无路径泄露；脚本通过；fallback 未冒充 formal。
- warn：外部链接网络失败；低信息日但有缺口说明；今日未到正式运行时间；专题待正式重跑；sourceUrl 缺失但为弱信号或缺口记录。
- fail：本机绝对路径或私有来源路径泄露；一方内部链接 broken；公开扫描桥接 404；manifest JSON 不可解析；fallback 被标成 formal；弱信号被标成 L3/L4；首页关键状态不可验证。

## 当前问题

- ❌ workflow 缺少命令：node scripts/audit-info-library.js；node scripts/generate-topic-project-status.js；node scripts/lint-knowledge-base.js；node scripts/check-public-links.js；node scripts/generate-automation-status.js；node scripts/generate-system-health.js
- ❌ workflow 缺少定时 cron
- ⚠️ 最新日期同一子主题超过 40%：56%；需要关注广谱雷达覆盖。
- ⚠️ external link not hard-checked in Phase 1
- ⚠️ knowledge/catalog.json 的 reports 存在 4 组重复 summaryFile。
- ⚠️ workflow 名称未显式标注 fallback
- ⚠️ workflow git add 未覆盖 data/
- ⚠️ workflow git add 未覆盖 operations/
- ⚠️ workflow git add 未覆盖新增自动化聚合脚本
- ⚠️ 信息库质量为 warn
- ⚠️ 专题研究状态为 warn
- ⚠️ 专题待正式重跑 25 天

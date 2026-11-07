# 运行记忆

## 2026-10-10｜专题日报同步冲突记录

- **受影响日期：**2026-10-10。
- **触发原因：**首次 `./sync.sh` 创建本地提交 `e13ebbf8` 后，远端 `main` 新增交付看门狗提交 `c86a3ec7`；自动 rebase 在派生文件 `data/automation-status.json` 的 `generatedAt` 字段发生单文件冲突。
- **内容影响：**五份正式 Markdown、六个 HTML、候选、研究审计和首页均无内容冲突；信息库正文未被专题任务修改。
- **恢复动作：**在远端最新提交上重新生成专题 manifest、链接状态与自动化状态，暂存冲突解决后继续 rebase，再推送并复验 GitHub Pages。
- **恢复状态：**已恢复。rebase 后提交为 `ad2995a3`，已推送至远端 `main`；GitHub Pages 首页、2026-10-10日目录、五份报告均返回200，线上manifest为 `latestFormalDate=2026-10-10`、`todayStatus=formal`。

## 2026-10-11｜专题日报同步冲突记录

- **受影响日期：**2026-10-11。
- **触发原因：**首次 `./sync.sh` 创建本地提交 `c338adbf` 后，远端 `main` 新增交付看门狗提交 `34a93282`；自动 rebase 在派生文件 `data/automation-status.json` 发生单文件冲突。
- **当前状态：**rebase 基线为 `34a93282`，待应用提交为 `c338adbf`。五份正式 Markdown、六个 HTML、候选、研究审计和首页均无内容冲突；信息库正文未被专题任务修改。
- **恢复计划：**在远端最新提交上重新生成专题、链接与自动化状态，暂存冲突解决后继续 rebase，再推送并复验 GitHub Pages。恢复完成后在本节更新最终提交与线上状态。
- **恢复状态：**已恢复。rebase 后提交为 `758ec3a5`，已推送至远端 `main`；GitHub Pages部署作业 `38131477316` 成功，首页、2026-10-11日目录、五份报告均返回200，线上manifest为 `latestFormalDate=2026-10-11`、`todayStatus=formal`。

## 2026-11-07｜GitHub Pages 发布同步超时记录

- **受影响日期：**2026-11-07。
- **当前提交：**`ba4a5fdea546e94e0b6c82d10663ef105924c18f`（已推送至远端 `main`）。
- **触发原因：**GitHub Actions 作业 `42363235995` 已完成 checkout、Pages 设置与制品上传，但 `actions/deploy-pages` 在平台侧同步文件时达到 600 秒上限，报错 `Timeout reached, aborting!`；此前同日兜底稿发布也出现相同平台侧超时。
- **内容影响：**2026-11-07 五份正式 Markdown、六个 HTML、候选、研究审计、专题索引及首页已经在远端提交中；首次失败后线上页面仍显示此前的非决策稿，因此尚不能声称正式稿已在线生效。
- **恢复动作：**第一次 failed-job rerun 因同一 workflow run 内出现两个同名 `github-pages` 制品而失败（`Artifact count is 2`）；随后把本记录作为新提交推送，以触发全新的 Pages workflow run，避开旧 run 的重复制品状态。等待新 run 发布回执后复验首页、日目录、五份报告及全部 HTML 链接；若新 run 仍超时，下一次专题任务开始时应先恢复 Pages 同步并核验线上正式稿，再开展新增研究。
- **恢复状态：**已恢复。新 workflow run `42364105979` 在58秒内成功完成；线上首页、2026-11-07日目录、总览及四专题均返回HTTP 200，日目录显示“正式决策稿”，首页和四专题按钮均指向当天HTML页面。

# 測試紀錄

日期：2026-08-16

## 靜態檢查

- `git diff --check`：待提交前執行。
- 投影片圖片：20 張，皆為 800 × 450 PNG；首頁不再包含簡報 iframe。
- 內容資料：20 個投影片標題與說明已寫入 `js/presentation.js`。

## 瀏覽器檢查

測試網址：`http://127.0.0.1:4173/`

- 首頁：深綠導覽、英雄區、活動導覽、照護提醒與觀察任務可載入。
- 投影片：20 張 `.presentation-slide` 成功建立；滑到底部後 20 張圖片皆 `complete` 且 `naturalWidth > 0`。
- 播放模式：點擊「全螢幕播放」成功開啟 `dialog` fallback；顯示 `01 / 20`、圖片與控制列。
- 翻頁：下一張由 `01 / 20` 變為 `02 / 20`，標題同步變為「課程定位」。
- 關閉：播放模式關閉後 `dialog.open === false`，頁面恢復可捲動。
- 主控台：無 error 或 warning。
- 水平溢出：`scrollWidth` 未超過 viewport。

## 尚待公開版複測

- GitHub Pages 部署完成後，需以公開網址重新檢查首頁、CSS、JavaScript 與 20 張投影片圖片。

# 蝴蝶飼養觀察箱 DIY

蝴蝶飼養觀察箱 DIY 親子手作營的 GitHub Pages 活動導覽頁。網站以「野外求生」安全手冊的深綠導覽與米白閱讀節奏為參考，並把 20 張原始簡報投影片轉成網站內建的逐頁舞台。

## 網站內容

- 活動導覽：認識對象、組裝箱體、每日記錄、尊重生命。
- 照護提醒：通風陰涼、寄主植物與少觸碰的基本原則。
- 簡報預覽：20 張投影片直接顯示在網頁中，不依賴 iframe 或 Google Drive 檢視器。
- 簡報播放：每頁滿版閱讀，支援點擊放大、左右翻頁、自動播放、鍵盤方向鍵與全螢幕模式。
- 親子觀察任務：四項勾選清單，使用 `localStorage` 保留本機進度。
- RWD、鍵盤焦點、`prefers-reduced-motion` 與列印樣式支援。

## 線上網站

https://prayer168.github.io/butterfly-box-diy/

## 本機預覽

這是純 HTML/CSS/JavaScript 網站，不需要安裝套件。可在專案目錄啟動任一靜態伺服器，例如：

```bash
python -m http.server 8000
```

再開啟 <http://localhost:8000/>。

## 專案結構

```text
index.html       # 活動導覽與簡報預覽
styles.css       # 視覺、RWD、動畫與列印樣式
js/app.js        # 親子觀察任務與本機進度
js/presentation.js # 20 張投影片渲染與播放控制
assets/presentations/butterfly-box/ # 網站內建投影片圖片
.github/         # GitHub Pages Actions 部署流程
```

## 內容與安全提醒

網站中的照護文字是親子活動的通用引導，實際飼養應依蝴蝶種類、當地生態與教師/講師指導調整。觀察箱是短期觀察用途，羽化後應在合適時機讓蝴蝶回到戶外；不要捕捉或放生不適合當地環境的外來物種。

頁面上的下載按鈕仍連往原始 PPTX 與 PDF；網站內的投影片圖片則已固定保存於 repository，讓公開頁面不受 Google Drive 檢視器、登入狀態或分享權限影響。

## 部署

推送到 `main` 後，`.github/workflows/pages.yml` 會使用 GitHub Pages Actions 發布網站。Repository：<https://github.com/prayer168/butterfly-box-diy>。

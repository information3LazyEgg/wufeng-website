# 霧峰旅遊宣傳網 Wufeng Travel Promotion Website

## 專案簡介

這是一個展示台灣台中霧峰地區的旅遊宣傳網站，採用清新自然、文化感設計風格，以溫潤米色搭配青綠色為主調，介紹霧峰的歷史、景點、活動、美食等資訊。

## 網站結構

```
霧峰介紹網/
├── index.html              # 主頁（含輪播圖、快速導覽、音樂欣賞）
├── about.html              # 網站介紹
├── attractions.html        # 景點導覽
├── activities.html         # 樂遊活動
├── food.html              # 美食推薦
├── timeline.html          # 時光走廊
├── css/
│   └── style.css          # 全域樣式表
├── js/
│   └── main.js            # JavaScript 互動功能
└── Website Materials/     # 素材資料夾
    ├── Image/            # 圖片素材
    └── video/            # 影片素材
```

## 主要功能

### 1. 主頁 (index.html)
- **導覽列**: 固定式導覽列，支援響應式設計
- **輪播圖**: 自動播放，可手動切換，支援鍵盤與觸控操作
- **快速導覽**: 卡片式導覽區，快速連結至各主要頁面
- **音樂欣賞**: 影片播放器，播放霧峰在地音樂

### 2. 網站介紹 (about.html)
- 網站創建理念與目的說明
- 圖文並茂的介紹內容
- 行動呼籲按鈕

### 3. 景點導覽 (attractions.html)
- 霧峰林家花園
- 光復新村
- 亞洲大學現代美術館
- 921地震教育園區
- 民生路老街

### 4. 樂遊活動 (activities.html)
- 迴遊阿罩霧系列活動
- 參山醉霧風味饗宴
- 自行車騎旅活動
- 草地音樂會

### 5. 美食推薦 (food.html)
- 肉圓婆（特色推薦）
- 霧峰木瓜牛乳大王
- 霧峰農會酒莊
- 民生路老街小吃

### 6. 時光走廊 (timeline.html)
- 清領時期
- 日治時期
- 戰後重建
- 今日霧峰
- 未來展望

## 技術特色

### CSS 設計
- **配色方案**: 青綠色 (#6b9080) + 米色 (#f5f1e8)
- **響應式設計**: 完整支援桌機、平板、手機
- **現代排版**: Flexbox + CSS Grid
- **流暢動畫**: 過渡效果與懸停動畫
- **固定導覽列**: Sticky positioning

### JavaScript 功能
- **輪播圖系統**:
  - 自動播放（每5秒切換）
  - 手動控制（按鈕、鍵盤、觸控）
  - 懸停暫停功能
  - 指示器同步
- **手機選單**: 漢堡選單展開/收合
- **返回頂部**: 滾動超過300px時顯示
- **平滑滾動**: 錨點連結平滑跳轉
- **事件優化**: 節流與防抖函數

## 使用方式

### 直接開啟
1. 解壓縮專案檔案
2. 用瀏覽器開啟 `index.html`

### 使用本地伺服器（推薦）
```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Node.js http-server
npx http-server

# 使用 PHP
php -S localhost:8000
```

然後在瀏覽器開啟: `http://localhost:8000`

## 瀏覽器支援

- Chrome / Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 支援 IE11+（部分現代 CSS 功能需要 Polyfill）

## 響應式斷點

- **桌機**: > 768px
- **平板**: 480px - 768px
- **手機**: < 480px

## 配色指南

| 顏色名稱 | 色碼 | 用途 |
|---------|------|------|
| 主色（青綠） | #6b9080 | 按鈕、標題、重點 |
| 主色深色 | #547567 | 懸停狀態 |
| 次要色 | #a4c3b2 | 輔助元素 |
| 強調色 | #eaf4f4 | 背景、卡片 |
| 米色背景 | #f5f1e8 | 區域背景 |
| 深色文字 | #333333 | 主要文字 |
| 淺色文字 | #666666 | 次要文字 |

## 字體

- 繁體中文: Microsoft JhengHei, PingFang TC, Noto Sans TC
- 英文: Sans-serif

## 素材說明

### 圖片素材 (Website Materials/Image/)
- `logo.png` - 網站 Logo
- `Carousel 01-04.jpg` - 輪播圖片
- `Website Introduction.jpeg` - 網站介紹圖片
- `Activity.jpg` - 活動圖片
- `food.jpg` - 美食圖片
- `attractions 01.jpg` - 景點圖片

### 影片素材 (Website Materials/video/)
- `阿罩霧之歌 MV` - 背景音樂影片

### 文字素材
- `Activity.txt` - 活動詳細內容
- `food.txt` - 美食介紹文字
- `Time Corridor.txt` - 時光走廊歷史文字

## 未來擴充建議

- [ ] 加入更多景點詳細頁面
- [ ] 整合 Google Maps API
- [ ] 加入多語言支援（英文、日文）
- [ ] 加入搜尋功能
- [ ] 加入訪客留言板
- [ ] 整合社群媒體分享
- [ ] 加入暗色模式
- [ ] 優化 SEO（加入 meta tags）

## 授權與版權

本專案為霧峰旅遊宣傳用途。所有圖片、文字及影片版權屬於原創作者。

## 聯絡資訊

如有任何問題或建議，歡迎聯繫。

---

**探索霧峰・感受文化・品味生活**

© 2025 霧峰旅遊宣傳網 | Wufeng Travel Promotion Website

# Nuxt3 UnoCSS 專案

## 技術架構

### 使用的技術
- **前端框架**: Nuxt.js 3
- **程式語言**: TypeScript
- **CSS框架**: UnoCSS
- **Package Manager**: npm/yarn

### 專案結構
```
├── components/
│   ├── AppCard.vue      # 可重複使用的卡片元件
│   ├── AppModal.vue     # 彈出視窗元件
│   └── AppNavbar.vue    # 導航欄元件
├── pages/
│   └── index.vue        # 首頁
├── nuxt.config.ts       # Nuxt 設定檔
├── package.json         # 專案依賴配置
├── tsconfig.json        # TypeScript 設定檔
└── uno.config.ts        # UnoCSS 設定檔
```

## 安裝指南

1. 複製專案:
```bash
git clone [repository-url]
cd nuxt3-unocss-專案
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start development server:
```bash
npm run dev
# or
yarn dev
```

4. Build for production:
```bash
npm run build
# or
yarn build
```

5. Preview production build:
```bash
npm run preview
# or
yarn preview
```

## 核心功能介紹

### 1. 響應式佈局
- 使用 UnoCSS 實現現代響應式設計
- 移動優先的響應式設計
- 固定式響應導航欄

### 2. 元件系統
- **AppCard**: 可重複使用的卡片元件，用於顯示：
  - Title
  - Description
  - Optional image
  - Customizable content slot

- **AppModal**: Dynamic modal component with:
  - Customizable title
  - Content slot system
  - Smooth transition animations
  - Background overlay with click-to-close functionality

- **AppNavbar**: Navigation component featuring:
  - Fixed positioning
  - Brand logo
  - Navigation links
  - Responsive design

### 3. 首頁功能
- 響應式卡片網格佈局
- 可互動的卡片設計，包含"了解更多"功能
- 點擊卡片顯示詳細資訊的彈出視窗
- 動態內容載入功能
- 響應式圖片處理

### 4. 開發功能
- TypeScript 支援，提供更好的型別安全性
- 開發環境支援熱模組替換
- 內建 @nuxt/devtools 開發工具
- 整合 UnoCSS 實現高效能的 utility-first CSS 開發
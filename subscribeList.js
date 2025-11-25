// subscribeList.js

const UPDATE_SUBSCRIPTIONS = {
    'controlYear': [
        { 
            // 飛星圖顯示
            id: 'chart-display-container', 
            // 🌟 修正：使用 () => 箭頭函數包裹
            // 這樣做可以避免在檔案載入初期因為函數未定義而報錯
            getHtml: () => getFlyingStarChartHtml()
        },
        { 
            // 控制按鈕本身
            id: 'control-container', 
            // 🌟 修正：使用 () => 箭頭函數包裹
            getHtml: () => createControlHtml()
        }
    ]
};
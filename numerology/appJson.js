// appJson.js

// 包含所有配置數據的全局常量
const APP_CONFIG = {
    // 憑證/數據相關 (您的 Model 部分)
    VALID_USERS: { "test": "pass" },
    
    // 需要動態加載的 JavaScript 文件 (按執行順序)
    SCRIPTS_TO_LOAD: [
        "page1.js",
        "page2.js",
        "page3.js"
    ],
    
    // 需要動態加載的 CSS 文件
    STYLES_TO_LOAD: [
        "style1.css",
        "style2.css",
        "style3.css"
    ]
};

// 測試用的全局狀態
let IS_RESOURCES_LOADED = false;
// app.js
import { 
    renderStarCalculator
} from './viewAPI.js';

import {
    attachControlListeners // 🌟 導入監聽器
} from './ctrlAPI.js';

function initializeApp() {
    const rootElement = document.getElementById('app-root');

    if (!rootElement) {
        console.error("錯誤：找不到 ID 為 'app-root' 的元素！");
        return;
    }
    
    // 2. 生成 HTML
    const appHtml = renderStarCalculator();
    
    // 3. 注入 HTML
    rootElement.innerHTML = appHtml;

    // 4. 🌟 關鍵步驟：HTML 生成後，立即綁定按鈕事件
    attachControlListeners();
    
    console.log("應用程式成功啟動並渲染！");
}

initializeApp();
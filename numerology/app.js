// app.js (C: 負責協調和啟動)

/**
 * C: 頂層 Controller 函數，負責啟動應用程式並渲染到 DOM。
 */
function initializeApp() {
    // 1. 確保 DOM 根元素存在
    const rootElement = document.getElementById('app-root');

    if (!rootElement) {
        console.error("錯誤：找不到 ID 為 'app-root' 的元素！");
        return;
    }
    
    // 2. 呼叫頂層 View 函數來生成所有 HTML 內容
    const appHtml = renderStarCalculator();
    
    // 3. 將生成的 HTML 注入到根容器中
    rootElement.innerHTML = appHtml;
    
    console.log("應用程式成功啟動並渲染！");
}

initializeApp()
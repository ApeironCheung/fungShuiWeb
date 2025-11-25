// render.js

// V: 核心組件：Controller
function renderCtrl() {
    return `<div id="control-container" class="component ctrl-component" style="margin-bottom: 20px;">
        ${createControlHtml()} 
    </div>`;
}

// V: 核心組件：Display
function renderDisplay() {
    let result = '<div class="component display-component">';
    // 這裡確保 ID 正確
    result += `<div id="chart-display-container">${getFlyingStarChartHtml()}</div>`; 
    result += '</div>';
    return result;
}

// V: 頂層組件
function renderStarCalculator() {
    const displayHtml = renderDisplay();
    const ctrlHtml = renderCtrl();

    return `
        <div class="star-calculator-container">
            <h2>⭐ Star Calculator ⭐</h2>
            ${displayHtml}
            ${ctrlHtml}
        </div>
    `;
}

// 更新訂閱函數
function updateSubscription(publisherName) {
    const updateList = UPDATE_SUBSCRIPTIONS[publisherName];
    
    if (!updateList) {
        console.warn(`render.js: 找不到發布者 '${publisherName}' 的訂閱列表。`);
        return;
    }
    
    updateList.forEach(item => { 
        const element = document.getElementById(item.id); 
        
        // 這裡 item.getHtml() 會執行我們剛才改的箭頭函數
        // 箭頭函數內部再執行真正的 getFlyingStarChartHtml()
        // 這時候因為所有 script 都載入完了，所以不會報錯
        const newHtml = item.getHtml(); 
        
        if (element && newHtml !== undefined) {
            element.innerHTML = newHtml;
        }
    });
}
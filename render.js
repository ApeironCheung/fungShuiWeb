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
    result += `<div id="chart-display-container">${getFlyingStarChartHtml()}</div>`; 
    result += '</div>';
    return result;
}

// V: 頂層組件
function renderStarCalculator() {
    // 使用 Flexbox 創建左右佈局
    return `
        <div id="main-wrapper" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; max-width: 1000px;">
            
            <div id="chart-and-controls" style="flex: 2; ">
                ${renderDisplay()}
                ${renderCtrl()}
            </div>

            <div id="taishui-container" style="flex: 1; ">
                ${getTaishuiHtml()} 
            </div>
            
        </div>
    `;
}

// 更新訂閱函數 (保持不變，這裡沒錯)
function updateSubscription(publisherName) {
    const updateList = UPDATE_SUBSCRIPTIONS[publisherName];
    
    if (!updateList) {
        console.warn(`render.js: 找不到發布者 '${publisherName}' 的訂閱列表。`);
        return;
    }
    
    updateList.forEach(item => { 
        const element = document.getElementById(item.id); 
        const newHtml = item.getHtml(); 
        
        if (element && newHtml !== undefined) {
            element.innerHTML = newHtml;
        }
    });
}
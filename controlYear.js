// controlYear.js

// 確保控制項的原始狀態 (用於 Normal Mode)
let isNextYear = false; 

// --- 輔助函數 (Utility Functions) ---

// 輔助函數：用於生成 <select> 標籤
function _createYearSelect(start, length, currentYear) {
    let html = '<select id="yearSelect">';
    const end = start + length;
    for (let i = start; i < end; i++) {
        const selected = (i === currentYear) ? 'selected' : '';
        html += `<option value="${i}" ${selected}>${i}</option>`;
    }
    return html + '</select>';
}

// 輔助函數：生成 Submit 按鈕
function createSubmitButton(funt, label = "提交 / Submit") {
    return `<button type="button" onclick="${funt}">${label}</button>`;
}


// --- Normal Mode Functions (原有的) ---

function switchYearAndSubmit() {
    isNextYear = !isNextYear; 
    
    // 獲取基準年份
    const baseYear = getCurrentFlyingStarYear();
    let newYear = isNextYear ? (baseYear + 1) : baseYear;
    
    setFlyingStarGraphYear(newYear);
    updateSubscription('controlYear');
}

function createYearButton(){
    const buttonLabel = isNextYear ? "今年" : "明年"; 
    // 假設 isSecretMode 在 login.js 中定義
    const style = typeof isSecretMode !== 'undefined' && isSecretMode ? "background-color: purple; color: white;" : "";

    return `
        <div style="text-align:center; margin-top:10px;">
            <p style="margin-bottom:5px;">${isNextYear ? '顯示' : '切換至'} ${isNextYear ? '今年' : '明年'} 流年圖表:</p>
            <button type="button" 
                    onclick="switchYearAndSubmit()" 
                    style="padding: 8px 16px; font-size: 16px; cursor: pointer; ${style}">
                ${buttonLabel}
            </button>
        </div>
    `;
}

// --- Special/Admin Mode Functions ---

// 核心函數：生成 +-50 年選單
function createYearMenu() {
    const thisYear = getCurrentFlyingStarYear();
    const fiftyYearAgo = thisYear - 50;
    
    return `
        <div style="text-align:center; margin-top:10px;">
            <p>管理員模式：選擇年份</p>
            ${_createYearSelect(fiftyYearAgo, 101, thisYear)}
            ${createSubmitButton('submitSelectedYear()', '確認年份')}
        </div>
    `;
}

// 核心功能：讀取選單並更新圖表 (取代舊的 getTable 呼叫)
function submitSelectedYear() {
    // 1. 獲取選單數值 (從 DOM)
    const yearSelectElement = document.getElementById('yearSelect');
    if (!yearSelectElement) {
        console.error("找不到年份選擇器！");
        return;
    }
    const selectedYear = parseInt(yearSelectElement.value, 10);

    // 2. 更新狀態 (呼叫 flyingStarGraph.js 的狀態更新函數)
    setFlyingStarGraphYear(selectedYear);

    // 3. 重新繪製畫面
    updateSubscription('controlYear');
}


// --- Master Control Function (給 render.js 呼叫) ---

/**
 * 決定要顯示 Normal Mode 的按鈕，還是 Admin Mode 的選單。
 * @returns {string} HTML content
 */
function createControlHtml() {
    // 假設 isSecretMode 是在 login.js 中定義的全域變數
    if (typeof isSecretMode !== 'undefined' && isSecretMode) {
        return createYearMenu(); // 進入管理員模式
    } else {
        return createYearButton(); // 正常模式
    }
}
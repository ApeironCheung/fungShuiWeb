// controlYear.js

let isNextYear = false; 
const buttonTextList = ["明年", "今年"]; 

function switchYearAndSubmit() {
    // 1. 切換狀態
    isNextYear = !isNextYear; 
    
    // 2. 獲取基準年份 (這是一個函數呼叫，確保 API4Numerology.js 已載入)
    const baseYear = getCurrentFlyingStarYear(); 

    // 3. 計算目標年份
    let targetYear = isNextYear ? (baseYear + 1) : baseYear;
  
    console.log("Button Clicked. Target Year:", targetYear); // Debug 用

    // 4. 設定圖表狀態
    if (typeof setFlyingStarGraphYear === 'function') {
        setFlyingStarGraphYear(targetYear);
    } else {
        console.error("setFlyingStarGraphYear function missing!");
    }

    // 5. 更新畫面
    if (typeof updateSubscription === 'function') {
        updateSubscription('controlYear');
    }
}

function createYearButton(){
    // 按鈕文字：如果顯示的是「明年」的圖，按鈕應該說「今年」(讓你切回來)
    // 如果顯示的是「今年」的圖，按鈕應該說「明年」
    const buttonLabel = isNextYear ? "今年" : "明年"; 
    
    return `
        <div style="text-align:center; margin-top:10px;">
            <p style="margin-bottom:5px;">點擊按鈕切換流年圖表:</p>
            <button type="button" 
                    onclick="switchYearAndSubmit()" 
                    style="padding: 8px 16px; font-size: 16px; cursor: pointer;">
                ${buttonLabel}
            </button>
        </div>
    `;
}
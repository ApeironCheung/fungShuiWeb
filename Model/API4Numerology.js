// API4Numerology.js
// 立即執行計算，並儲存在全域常數中
const GLOBAL_CURRENT_FS_YEAR = (function() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 簡單的立春判斷 (這裡簡化邏輯，假設 2月4日)
    function getLeapAdjustment(y) {
        const Y_diff = y - 2000;
        return Math.floor(Y_diff / 4) - Math.floor(Y_diff / 100) + Math.floor(Y_diff / 400);
    }
    
    const Y_diff = currentYear - 2000;
    const accumulation = Y_diff * 0.2422;
    const adjustment = getLeapAdjustment(currentYear);
    const day = Math.floor(4.0 + 0.162 + accumulation - adjustment);
    const springBeginDate = new Date(currentYear, 1, day); // 2月X日

    if (now >= springBeginDate) {
        return currentYear;
    } else {
        return currentYear - 1;
    }
})();

const THIS_YEAR = GLOBAL_CURRENT_FS_YEAR;

let currYear = THIS_YEAR;
export function getThisYear(){
    return THIS_YEAR;
}
export function getCurrYear(){
    return currYear;
}

/**
 * 獲取當前飛星流年 (直接返回緩存的結果，不再 new Date)
 */
export function getCurrentFlyingStarYear() {
    return GLOBAL_CURRENT_FS_YEAR;
}

// --- 飛星計算邏輯 ---

export function getCentralStar(year) {
    const M = (11 - (year % 9)) % 9;
    return M === 0 ? 9 : M;
}

export function getFlyingStarChart(year) {
    const centralStar = getCentralStar(year);
    const adj = centralStar - 5; 
    
    // 🌟 修正：改為現代地圖方位 (上北下南，左西右東)
    // 原本: [東南, 南, 西南], [東, 中, 西], [東北, 北, 西北] (上南下北)
    // 現在: [西北, 北, 東北], [西, 中, 東], [西南, 南, 東南] (上北下南)
    
    // 洛書原始盤 (5入中) 的現代地圖排位：
    // 6(西北) 1(北)  8(東北)
    // 7(西)   5(中)  3(東)
    // 2(西南) 9(南)  4(東南)
    
    const baseChart = [
        [6, 1, 8], // Row 0: Top (North side)
        [7, 5, 3], // Row 1: Middle
        [2, 9, 4]  // Row 2: Bottom (South side)
    ];
    
    const finalChart = [];

    for (let i = 0; i < 3; i++) {
        finalChart[i] = [];
        for (let j = 0; j < 3; j++) {
            let baseStar = baseChart[i][j];
            let finalStar = (baseStar + adj);
            
            // 處理數字循環 (1-9)
            while (finalStar > 9) finalStar -= 9;
            while (finalStar <= 0) finalStar += 9;
                     
            finalChart[i][j] = finalStar;
        }
    }

    return finalChart;
}

// 根據年份返回 0-11 的索引 (0=鼠, 1=牛, ...)
export function getZodiacIndex(year) {
    const index = (year - 4) % 12; 
    return index >= 0 ? index : index + 12;
}

const TAI_SHUI_CONFLICT_RULES = [
    [0,0,6,7,9,3],
    [1,1,7,6,4,10],
    [2,2,8,5,11,5],
    [3,3,9,4,6,0],
    [4,4,10,3,1,4],
    [5,5,11,2,8,2],
    [6,6,0,1,3,6],
    [7,7,1,0,10,10],
    [8,8,2,11,5,2],
    [9,9,3,10,0,9],
    [10,10,4,9,7,1],
    [11,11,5,8,2,11]
]
export function getTaiShuiConflictArray(year){
    const taiShuiIndex = getZodiacIndex(year); 
    return TAI_SHUI_CONFLICT_RULES[taiShuiIndex];
    
}

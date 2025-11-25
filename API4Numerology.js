// API4Numerology.js

// --- 核心工具：優化資源，只計算一次 ---

// 立即執行計算，並儲存在全域常數中
const GLOBAL_CURRENT_FS_YEAR = (function() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 簡單的立春判斷 (這裡簡化邏輯，假設 2月4日)
    // 如果您想保留原本精確的立春算法，可以把原本的 getSpringBeginTime 放進來
    // 但為了效能，這裡示範最直接的緩存結果
    
    // 重新引入立春計算以確保準確 (只會執行一次)
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

/**
 * 獲取當前飛星流年 (直接返回緩存的結果，不再 new Date)
 */
function getCurrentFlyingStarYear() {
    return GLOBAL_CURRENT_FS_YEAR;
}

// --- 飛星計算邏輯 ---

function getCentralStar(year) {
    const M = (11 - (year % 9)) % 9;
    return M === 0 ? 9 : M;
}

function getFlyingStarChart(year) {
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
            // 數學小技巧：((n - 1) % 9) + 1 確保結果在 1-9
            // 但為了配合您原本的邏輯風格，保持如下：
            while (finalStar > 9) finalStar -= 9;
            while (finalStar <= 0) finalStar += 9;
                     
            finalChart[i][j] = finalStar;
        }
    }

    return finalChart;
}
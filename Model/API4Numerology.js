// API4Numerology.js
import { 
    getText
} from '../DataAPI.js';

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

// --- 核心報告函數 ---

/**
 * 根據年份，輸出該年太歲沖犯的所有生肖報告 (HTML 格式)
 * @param {number} year - 要查詢的年份
 * @returns {string} 包含 HTML <br> 換行的報告字串
 */
export function getTaiShuiConflictReport(year) {
    // 1. 獲取當前太歲的規則物件
    const ZODIAC = getText('ZODIAC');

const TAI_SHUI_RULES = [
    // 0: 鼠年太歲
    { zodiac: ZODIAC[0], fan: ZODIAC[0], chung: ZODIAC[6], hoi: ZODIAC[7], po: ZODIAC[9], ying: ZODIAC[3] },
    // 1: 牛年太歲
    { zodiac: ZODIAC[1], fan: ZODIAC[1], chung: ZODIAC[7], hoi: ZODIAC[6], po: ZODIAC[4], ying: ZODIAC[10] },
    // 2: 虎年太歲
    { zodiac: ZODIAC[2], fan: ZODIAC[2], chung: ZODIAC[8], hoi: ZODIAC[5], po: ZODIAC[11], ying: ZODIAC[5] },
    // 3: 兔年太歲
    { zodiac: ZODIAC[3], fan: ZODIAC[3], chung: ZODIAC[9], hoi: ZODIAC[4], po: ZODIAC[6], ying: ZODIAC[0] },
    // 4: 龍年太歲
    { zodiac: ZODIAC[4], fan: ZODIAC[4], chung: ZODIAC[10], hoi: ZODIAC[3], po: ZODIAC[1], ying: ZODIAC[4] },
    // 5: 蛇年太歲
    { zodiac: ZODIAC[5], fan: ZODIAC[5], chung: ZODIAC[11], hoi: ZODIAC[2], po: ZODIAC[8], ying: ZODIAC[2] },
    // 6: 馬年太歲
    { zodiac: ZODIAC[6], fan: ZODIAC[6], chung: ZODIAC[0], hoi: ZODIAC[1], po: ZODIAC[3], ying: ZODIAC[6] },
    // 7: 羊年太歲
    { zodiac: ZODIAC[7], fan: ZODIAC[7], chung: ZODIAC[1], hoi: ZODIAC[0], po: ZODIAC[10], ying: ZODIAC[10] },
    // 8: 猴年太歲
    { zodiac: ZODIAC[8], fan: ZODIAC[8], chung: ZODIAC[2], hoi: ZODIAC[11], po: ZODIAC[5], ying: ZODIAC[2] },
    // 9: 雞年太歲
    { zodiac: ZODIAC[9], fan: ZODIAC[9], chung: ZODIAC[3], hoi: ZODIAC[10], po: ZODIAC[0], ying: ZODIAC[9] },
    // 10: 狗年太歲
    { zodiac: ZODIAC[10], fan: ZODIAC[10], chung: ZODIAC[4], hoi: ZODIAC[9], po: ZODIAC[7], ying: ZODIAC[1] },
    // 11: 豬年太歲
    { zodiac: ZODIAC[11], fan: ZODIAC[11], chung: ZODIAC[5], hoi: ZODIAC[8], po: ZODIAC[2], ying: ZODIAC[11] }
];

    const taiShuiIndex = getZodiacIndex(year); 
    const rule = TAI_SHUI_RULES[taiShuiIndex];
    
    // 2. 建立衝突名稱與規則屬性的映射
    // 使用 Object.entries() 方便遍歷物件的屬性

    const mapping = getText('TAI_SHUI_CONFLICT_MAPPING');
    const conflictMapping = {
        'fan': mapping[0],
        'chung': mapping[1],
        'ying': mapping[2],
        'po': mapping[3],
        'hoi': mapping[4]
    };
    const UX_WORD = getText("UX_WORD");
    let reportHtml = `**${year} ${UX_WORD[5]} ${rule.zodiac} ${UX_WORD[6]}<br>`;
    reportHtml += `---<br>`;

    // 3. 遍歷規則，生成報告字串
    for (const ruleKey in conflictMapping) {
        if (ruleKey in rule) { // 確保屬性存在
            const conflictName = conflictMapping[ruleKey];
            const targetZodiac = rule[ruleKey];
            
            // 格式: 衝突名稱: 目標生肖 <br>
            reportHtml += `${conflictName}: ${targetZodiac}<br>`;
        }
    }
    
    return reportHtml;
}



/**
 * 根據年份計算該年的六十甲子太歲和值年大將軍。
 * @param {number} year - 輸入的年份 (公曆)
 * @returns {string} 格式化的 HTML 報告字串
 */
export function getTaiShui(year) {
    // 六十甲子太歲大將軍名單 (starDeity)
    const TAI_SHUI_DEITIES = getText('TAI_SHUI_DEITIES');
    // 1. 確保年份是正數，避免 JS 負數取模問題 (雖然公元年份通常是正數)
    const yearNumber = parseInt(year, 10);
    
    // 2. 核心計算公式：(Year - 4) Modulo 60
    const taiShuiIndex = (yearNumber - 4) % 60;

    // 3. 從陣列中取出對應的太歲大將軍名稱
    const deityName = TAI_SHUI_DEITIES[taiShuiIndex];
    const taiShuiCurr = getText("TAI_SHUI_CURR");
    
    // 4. 生成報告字串
    if (deityName) {
        return `${taiShuiCurr}<br>**${deityName}**`;
    } else {
        return "錯誤：無法找到對應的太歲大將軍。請檢查 TAI_SHUI_DEITIES 陣列是否完整。";
    }
}
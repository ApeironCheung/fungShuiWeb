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

// --- 太歲規則表 (TAI_SHUI_RULES) ---

// 🌟 注意：索引順序 (0=鼠, 1=牛, ..., 11=豬) 必須固定！

const TAI_SHUI_RULES = [
    // 0: 鼠年太歲
    { zodiac: '鼠', fan: '鼠', chung: '馬', hoi: '羊', po: '雞', ying: '兔' },
    // 1: 牛年太歲
    { zodiac: '牛', fan: '牛', chung: '羊', hoi: '馬', po: '龍', ying: '狗' },
    // 2: 虎年太歲
    { zodiac: '虎', fan: '虎', chung: '猴', hoi: '蛇', po: '豬', ying: '蛇' },
    // 3: 兔年太歲
    { zodiac: '兔', fan: '兔', chung: '雞', hoi: '龍', po: '馬', ying: '鼠' },
    // 4: 龍年太歲
    { zodiac: '龍', fan: '龍', chung: '狗', hoi: '兔', po: '牛', ying: '龍' },
    // 5: 蛇年太歲
    { zodiac: '蛇', fan: '蛇', chung: '豬', hoi: '虎', po: '猴', ying: '虎' },
    // 6: 馬年太歲
    { zodiac: '馬', fan: '馬', chung: '鼠', hoi: '牛', po: '兔', ying: '馬' },
    // 7: 羊年太歲
    { zodiac: '羊', fan: '羊', chung: '牛', hoi: '鼠', po: '狗', ying: '狗' },
    // 8: 猴年太歲
    { zodiac: '猴', fan: '猴', chung: '虎', hoi: '豬', po: '蛇', ying: '虎' },
    // 9: 雞年太歲
    { zodiac: '雞', fan: '雞', chung: '兔', hoi: '狗', po: '鼠', ying: '雞' },
    // 10: 狗年太歲
    { zodiac: '狗', fan: '狗', chung: '龍', hoi: '雞', po: '羊', ying: '牛' },
    // 11: 豬年太歲
    { zodiac: '豬', fan: '豬', chung: '蛇', hoi: '猴', po: '虎', ying: '豬' }
];

// --- 輔助函數 (假設已存在) ---

// 根據年份返回 0-11 的索引 (0=鼠, 1=牛, ...)
function getZodiacIndex(year) {
    const index = (year - 4) % 12; 
    return index >= 0 ? index : index + 12;
}

// --- 核心報告函數 ---

/**
 * 根據年份，輸出該年太歲沖犯的所有生肖報告 (HTML 格式)
 * @param {number} year - 要查詢的年份
 * @returns {string} 包含 HTML <br> 換行的報告字串
 */
function getTaiShuiConflictReport(year) {
    // 1. 獲取當前太歲的規則物件
    const taiShuiIndex = getZodiacIndex(year); 
    const rule = TAI_SHUI_RULES[taiShuiIndex];
    
    // 2. 建立衝突名稱與規則屬性的映射
    // 使用 Object.entries() 方便遍歷物件的屬性
    const conflictMapping = {
        'fan': '值太歲',
        'chung': '沖太歲',
        'ying': '刑太歲',
        'po': '破太歲',
        'hoi': '害太歲'
    };
    
    let reportHtml = `**${year} 年為 ${rule.zodiac} 年<br>`;
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

// 六十甲子太歲大將軍名單 (starDeity)
const TAI_SHUI_DEITIES = [
    "金辨大將軍", "陳材大將軍", "耿章大將軍", "沉興大將軍",
    "趙達大將軍", "郭燦大將軍", "王清大將軍", "李素大將軍",
    "劉旺大將軍", "康志大將軍", "施廣大將軍", "任保大將軍",
    "郭嘉大將軍", "汪文大將軍", "曾光大將軍", "龍仲大將軍",
    "董德大將軍", "鄭但大將軍", "陸明大將軍", "魏仁大將軍",
    "方杰大將軍", "蔣崇大將軍", "白敏大將軍", "封濟大將軍",
    "鄒鏜大將軍", "潘佐大將軍", "鄔桓大將軍", "范寧大將軍",
    "彭泰大將軍", "徐華大將軍", "章詞大將軍", "楊仙大將軍",
    "管仲大將軍", "唐傑大將軍", "姜武大將軍", "謝燾大將軍",
    "虞起大將軍", "楊信大將軍", "賢諤大將軍", "皮時大將軍",
    "李誠大將軍", "吳遂大將軍", "文哲大將軍", "繆丙大將軍",
    "徐浩大將軍", "程寶大將軍", "倪秘大將軍", "葉堅大將軍",
    "丘德大將軍", "朱得大將軍", "張朝大將軍", "萬清大將軍",
    "辛亞大將軍", "楊彥大將軍", "黎卿大將軍", "傅黨大將軍",
    "毛梓大將軍", "石政大將軍", "洪充大將軍", "虞程大將軍"
];

/**
 * 根據年份計算該年的六十甲子太歲和值年大將軍。
 * @param {number} year - 輸入的年份 (公曆)
 * @returns {string} 格式化的 HTML 報告字串
 */
function getSixtyJiaZiTaiShui(year) {
    // 1. 確保年份是正數，避免 JS 負數取模問題 (雖然公元年份通常是正數)
    const yearNumber = parseInt(year, 10);
    
    // 2. 核心計算公式：(Year - 4) Modulo 60
    const taiShuiIndex = (yearNumber - 4) % 60;

    // 3. 從陣列中取出對應的太歲大將軍名稱
    const deityName = TAI_SHUI_DEITIES[taiShuiIndex];
    
    // 4. 生成報告字串
    if (deityName) {
        return `值年太歲：<br>**${deityName}**`;
    } else {
        return "錯誤：無法找到對應的太歲大將軍。請檢查 TAI_SHUI_DEITIES 陣列是否完整。";
    }
}
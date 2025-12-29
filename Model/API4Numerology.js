// API4Numerology.js
// 立即執行計算，並儲存在全域常數中

function getLeapAdjustment(y) {
    const Y_diff = y - 2000;
    return Math.floor(Y_diff / 4) - Math.floor(Y_diff / 100) + Math.floor(Y_diff / 400);
}

const SOLAR_TERMS_DATA = {
    '小寒': { month: 1, c19: 5.4055, c20: 4.865 },
    '大寒': { month: 1, c19: 20.12,  c20: 19.494 },
    '立春': { month: 2, c19: 3.87,   c20: 3.17 },
    '雨水': { month: 2, c19: 18.73,  c20: 17.812 },
    '驚蟄': { month: 3, c19: 5.63,   c20: 4.88 },
    '春分': { month: 3, c19: 20.646, c20: 19.859 },
    '清明': { month: 4, c19: 5.59,   c20: 4.81 },
    '穀雨': { month: 4, c19: 20.15,  c20: 19.22 },
    '立夏': { month: 5, c19: 5.52,   c20: 4.63 },
    '小滿': { month: 5, c19: 21.04,  c20: 20.19 },
    '芒種': { month: 6, c19: 5.678,  c20: 4.923 },
    '夏至': { month: 6, c19: 21.37,  c20: 20.528 },
    '小暑': { month: 7, c19: 7.108,  c20: 6.33 },
    '大暑': { month: 7, c19: 22.83,  c20: 21.97 },
    '立秋': { month: 8, c19: 7.5,    c20: 6.708 },
    '處暑': { month: 8, c19: 23.13,  c20: 22.28 },
    '白露': { month: 9, c19: 7.646,  c20: 6.848 },
    '秋分': { month: 9, c19: 23.042, c20: 22.247 },
    '寒露': { month: 10, c19: 8.318,  c20: 7.438 },
    '霜降': { month: 10, c19: 23.65,  c20: 22.79 },
    '立冬': { month: 11, c19: 7.438,  c20: 6.58 },
    '小雪': { month: 11, c19: 22.36,  c20: 21.44 },
    '大雪': { month: 12, c19: 7.18,   c20: 6.34 },
    '冬至': { month: 12, c19: 22.6,   c20: 21.94 }
};

function calculateTerm(year, term) {
    const data = SOLAR_TERMS_DATA[term];
    if (!data) return null;

    const Y = year % 100;
    const C = (year >= 2000) ? data.c20 : data.c19;
    const L = Math.floor((Y - 1) / 4);
    
    // 獲取帶小數的總天數值
    const totalDays = (Y * 0.2422 + C) - L;
    
    const day = Math.floor(totalDays);
    const decimalPart = totalDays - day;
    
    // 換算時、分、秒
    const totalMinutes = Math.floor(decimalPart * 24 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // 回傳包含精確時間的 Date
    return new Date(year, data.month - 1, day, hours, minutes, 0);
}

/**
 * 節氣例外與精確時間修正表
 */
const SOLAR_EXCEPTIONS = {
    // 日期修正 (+1 或 -1 天)
    "1982-小寒": { dayOffset: 1 },
    "2019-小寒": { dayOffset: 1 },
    "2082-小寒": { dayOffset: -1 },
    "1954-大雪": { dayOffset: 1 },
    "2026-雨水": { dayOffset: -1 },
    "1911-春分": { dayOffset: 1 },
    "2008-小滿": { dayOffset: 1 },
    "1902-芒種": { dayOffset: 1 },
    "1928-夏至": { dayOffset: 1 },
    "1925-小暑": { dayOffset: 1 },
    "2016-小暑": { dayOffset: 1 },
    "1922-大暑": { dayOffset: 1 },
    "2002-立秋": { dayOffset: 1 },
    "1927-白露": { dayOffset: 1 },
    "1942-秋分": { dayOffset: 1 },
    "2084-霜降": { dayOffset: 1 },
    "2089-立冬": { dayOffset: 1 },

    // 精確時間修正 (直接指定年月日時分)
    "1930-立春": { year: 1930, month: 2, day: 4, hour: 20, min: 47 },
    "1975-立春": { year: 1975, month: 2, day: 4, hour: 18, min: 59 },
    "2017-立春": { year: 2017, month: 2, day: 3, hour: 23, min: 34 },
    "2021-立春": { year: 2021, month: 2, day: 3, hour: 22, min: 58 },
    "2054-立春": { year: 2054, month: 2, day: 4, hour: 5, min: 4 }
};

const GLOBAL_CURRENT_FS_YEAR = (function() {
    const now = new Date();
    const currentYear = now.getFullYear();   
    /*const Y_diff = currentYear - 2000;
    const accumulation = Y_diff * 0.2422;
    const adjustment = getLeapAdjustment(currentYear);
    const day = Math.floor(4.0 + 0.162 + accumulation - adjustment);
    const springBeginDate = new Date(currentYear, 1, day); // 2月X日*/
    const springBeginDate = calculateTerm(currentYear, '立春');
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

export function setCurrYear(year){
    if(year >1900 && year < 2100){
        currYear = year;
    }
}

// API4Numerology.js

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

//計算1901-2099
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

function checkException(year, term) {
    const key = `${year}-${term}`;
    const exc = SOLAR_EXCEPTIONS[key];

    if (!exc) return null;

    // 1. 如果有精確時間數據，直接返回該日期物件
    if (exc.hour !== undefined) {
        return new Date(exc.year, exc.month - 1, exc.day, exc.hour, exc.min, 0);
    }

    // 2. 如果只有日期偏移 (+1/-1)，則根據公式結果進行修正
    if (exc.dayOffset !== undefined) {
        const correctedDate = calculateTerm(year, term);
        correctedDate.setDate(correctedDate.getDate() + exc.dayOffset);
        return correctedDate;
    }

    return null;
}

export function getSolarTerm(year, term) {
    let finalResult = checkException(year, term);   
    return finalResult === null? calculateTerm(year,term) : finalResult;
}

const GLOBAL_CURRENT_FS_YEAR = (function() {
    const now = new Date();
    const currentYear = now.getFullYear();   
    const springBeginDate = getSolarTerm(currentYear, '立春');
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

/**
 * 數據格式解讀：以 0x151261E 為例
 * 日: code & 0x1F = 30
 * 月: (code >> 5) & 0xF = 1
 * 閏月: (code >> 9) & 0xF = 3
 * 月份大小: (code >> 13) & 0x1FFF
 */
const LUNAR_DATA = [
    // 1901 - 1925
    0x151261E, 0x0A2D033, 0x1126922, 0x0D4A82B, 0x1A95420, 
    0x152A935, 0x0A5602A, 0x116B21E, 0x0A97433, 0x152B228,
    0x0B5282D, 0x16AA521, 0x0D55035, 0x0ADA02A, 0x15AD41E, 
    0x02D4833, 0x14C9428, 0x0A9502D, 0x152B422, 0x0B56035,
    0x0B6A029, 0x176D21E, 0x06A9032, 0x1529827, 0x0A9502C,
    // 1926 - 1950
    0x152B621, 0x0B5A035, 0x0B6A029, 0x156D41E, 0x04D4832, 
    0x14C9427, 0x1A9541B, 0x052B030, 0x1A56025, 0x116B21A,
    0x055B42D, 0x0ADA022, 0x15AD435, 0x02D4829, 0x14C941D, 
    0x0A95032, 0x152B227, 0x0B5602C, 0x1BA5021, 0x06AA035,
    0x1AD5029, 0x052D03D, 0x1126931, 0x0D4A026, 0x1A9503B,
    // 1951 - 1975
    0x052B030, 0x1A56025, 0x12B5A1A, 0x056A02D, 0x156D222, 
    0x04AD035, 0x1496829, 0x0D4B01D, 0x1A95832, 0x0A56027,
    0x116B21C, 0x055A031, 0x1ADA426, 0x02D903B, 0x149482F, 
    0x0A95024, 0x152B01A, 0x0B5A02D, 0x1B6A422, 0x0AD5035,
    0x155A829, 0x0A5B01D, 0x1157432, 0x0527027, 0x169321C,
    // 1976 - 2000
    0x06AA031, 0x1AD5026, 0x052D03B, 0x112682F, 0x0D4A023, 
    0x1A95038, 0x052B02D, 0x1A56021, 0x12B5A35, 0x056A029,
    0x156D21E, 0x04AD032, 0x1494827, 0x0D4A01C, 0x1A95031, 
    0x0A56026, 0x116B21B, 0x055A02F, 0x1ADA424, 0x02D9038,
    0x149482D, 0x0A95022, 0x152B035, 0x0B5A029, 0x156A01E,
    // 2001 - 2025
    0x0AADA32, 0x02D5027, 0x14B601C, 0x1A93431, 0x0A4D026, 
    0x152B01B, 0x02B5A2F, 0x156A024, 0x056D038, 0x04AD02D,
    0x149B022, 0x0A4B035, 0x0A57029, 0x1156A1E, 0x052B032, 
    0x1693027, 0x06AA01C, 0x1AD5031, 0x052D026, 0x112681B,
    0x0D4A02F, 0x1A95024, 0x052B038, 0x0A5602C, 0x12B5A21,
    // 2026 - 2050
    0x056A035, 0x156D029, 0x04AD01D, 0x1494832, 0x0D4A027, 
    0x1A9501B, 0x0A5602F, 0x156B224, 0x055A038, 0x1ADA42D,
    0x02D9022, 0x1494835, 0x0A95029, 0x152B01E, 0x0B5A031, 
    0x156A026, 0x0AD501B, 0x155A031, 0x0A5B025, 0x115741B,
    0x052702E, 0x1693022, 0x06AA035, 0x1AD5029, 0x052D01E,
    // 2051 - 2075
    0x1126A32, 0x0D4A027, 0x1A9501B, 0x052B02F, 0x1A56024, 
    0x12B5A19, 0x056A02D, 0x156D221, 0x04AD035, 0x1494829,
    0x0D4A01E, 0x1A95032, 0x0A56027, 0x116B21B, 0x055A02F, 
    0x1ADA424, 0x02D9038, 0x149482C, 0x0A95021, 0x152B035,
    0x0B5A029, 0x156A01D, 0x0AD5032, 0x155A027, 0x0A5B01B,
    // 2076 - 2099
    0x1157431, 0x0527026, 0x169301B, 0x06AA02F, 0x1AD5024, 
    0x052D037, 0x112682C, 0x0D4A021, 0x1A95035, 0x052B029,
    0x1A5601D, 0x12B5A32, 0x056A027, 0x156D21B, 0x04AD02F, 
    0x1494824, 0x0D4A037, 0x1A9502B, 0x0A56021, 0x116B235,
    0x055A029, 0x1ADA41E, 0x02D9031, 0x1494826
];

function getLunarYearInfo(year) {
    if (year < 1901 || year > 2099) return null;
    
    const code = LUNAR_DATA[year - 1901];
    const day = code & 0x1F;
    const month = (code >> 5) & 0xF;
    const leapMonth = (code >> 9) & 0xF;
    const monthMap = (code >> 13) & 0x1FFF;

    let firstDates = [];
    let curDate = new Date(year, month - 1, day);
    
    // 農曆一年最多 13 個月 (含閏月)
    const totalMonths = leapMonth !== 0 ? 13 : 12;

    for (let i = 0; i < totalMonths; i++) {
        firstDates.push(new Date(curDate));
        
        // 判斷該月大小 (從 bit 12 往下數到 bit 0)
        // 注意：這裡的 monthMap 邏輯需對應編碼時的順序
        const isBig = (monthMap & (1 << (12 - i))) !== 0;
        curDate.setDate(curDate.getDate() + (isBig ? 30 : 29));
    }

    return {
        year: year,
        start: new Date(year, month - 1, day),
        leapMonth: leapMonth,
        firstDates: firstDates
    };
}

function getDayOfYear(date) {
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // 判斷公曆閏年：四年一閏，百年不閏，四百年再閏
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        daysOfMonth[1] = 29;
    }
    
    let dayCount = 0;
    for (let i = 0; i < month; i++) {
        dayCount += daysOfMonth[i];
    }
    return dayCount + day;
}

function solarToLunar(solarDate) {
    let year = solarDate.getFullYear();
    let yearInfo = getLunarYearInfo(year); // 使用之前寫好的解碼 function
    
    // 1. 計算絕對天數 (相對於該年 1 月 1 日)
    let solarDayCount = getDayOfYear(solarDate);
    let lunarStartDayCount = getDayOfYear(yearInfo.start);
    
    // 2. 處理跨年：如果目標日期在正月初一之前，要查前一年
    if (solarDayCount < lunarStartDayCount) {
        year--;
        yearInfo = getLunarYearInfo(year);
        // 重新計算天數差：這裡比較簡單的做法是直接用 Date 對象相減
        // 天數差 = (目標日期 - 前一年正月初一) / 一天的毫秒數
        var diff = Math.floor((solarDate - yearInfo.start) / 86400000);
    } else {
        var diff = solarDayCount - lunarStartDayCount;
    }

    // 3. 開始「剝洋蔥」：扣除農曆月份天數
    let offset = diff; 
    let leapMonth = yearInfo.leapMonth;
    let isLeapMonthFound = false;
    let lunarMonth, lunarDay;

    // 我們從 0 (正月) 開始扣
    for (let i = 0; i < yearInfo.firstDates.length; i++) {
        // 計算這一個農曆月有幾天
        let nextMonthStart = yearInfo.firstDates[i + 1];
        let daysInThisMonth;
        
        if (nextMonthStart) {
            daysInThisMonth = Math.floor((nextMonthStart - yearInfo.firstDates[i]) / 86400000);
        } else {
            // 如果是最後一個月，根據 code 判斷大小月 (30 或 29)
            // 這裡簡化處理，通常是 29 或 30
            daysInThisMonth = 30; 
        }

        if (offset < daysInThisMonth) {
            // 找到了！
            lunarDay = offset + 1; // offset 是從 0 開始的，所以要 +1
            
            // 處理月份顯示邏輯 (考慮閏月偏移)
            if (leapMonth !== 0) {
                if (i === leapMonth) {
                    isLeapMonthFound = true;
                    lunarMonth = leapMonth;
                } else if (i > leapMonth) {
                    lunarMonth = i; // 因為中間插了一個閏月，後面的 Index 剛好對應
                } else {
                    lunarMonth = i + 1;
                }
            } else {
                lunarMonth = i + 1;
            }
            break;
        }
        offset -= daysInThisMonth;
    }

    return {
        lunarYear: year, // 這裡可以進一步換算成天干地支
        lunarMonth: lunarMonth,
        lunarDay: lunarDay,
        isLeap: isLeapMonthFound
    };
}

function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeap = false) {
    // 1. 拿到這一年所有的初一日期
    const yearInfo = getLunarYearInfo(lunarYear); 
    
    // 2. 確定這個月在 firstDates 陣列裡的索引 (Index)
    let index;
    const leapMonth = yearInfo.leapMonth; // 這年閏幾月？(0代表無)

    if (isLeap) {
        // 如果是閏月，它的位置剛好就是在正月份額之後
        // 例如閏二月，index 就是 2 (0:正月, 1:二月, 2:閏二月)
        index = leapMonth; 
    } else {
        // 如果不是閏月，但目前月份在閏月之後，要跳過閏月那個位置
        if (leapMonth !== 0 && lunarMonth > leapMonth) {
            index = lunarMonth; 
        } else {
            index = lunarMonth - 1;
        }
    }

    // 3. 找到初一日期，直接加天數
    // 這裡用一個新 Date 物件，避免修改到原始數據
    const resultDate = new Date(yearInfo.firstDates[index]);
    resultDate.setDate(resultDate.getDate() + (lunarDay - 1));

    return resultDate;
}

const GOD_BIRTHDAYS = {
    "0109": "玉皇上帝萬壽",        // 玉皇大帝
    "0120": "張三豐祖師聖誕",
    "0202": "車公大元帥聖誕",      // 亦有正月初二之說，但民間多慶祝二月初二
    "0215": "太上老君萬壽",        // 即老子，也是道教三清之道德天尊
    "0219": "觀音大士聖誕",        // 觀音出生
    "0315": "財神趙公明元帥聖誕",
    "0323": "天后娘娘聖誕",        // 媽祖
    "0328": "岳武穆王聖誕",        // 岳飛
    "0408": "釋迦牟尼佛聖誕",      // 佛誕
    "0414": "呂純陽祖師聖誕",      // 呂祖
    "0428": "張道陵天師聖誕",
    "0513": "關聖帝君聖誕",        // 另一說為 0624
    "0615": "王靈官天師聖誕",      // 道教第一護法
    "0619": "觀音大士成道日",
    "0624": "關聖帝君萬壽",        // 民間最通用之關帝誕
    "0815": "月下老人聖誕",        // 中秋節亦為月老誕
    "0823": "黃大仙師聖誕",
    "0827": "孔子先師聖誕",        // 孔丘
    "0901": "北斗斗姆元君聖誕",    // 九月初一至初九為九皇大帝/斗姆誕
    "0919": "觀音大士出家日",
};

// 24節氣按公曆月份排列（每個月固定兩個）
const MONTH_TERMS = [
    ["小寒", "大寒"], ["立春", "雨水"], ["驚蟄", "春分"], // 1, 2, 3月
    ["清明", "穀雨"], ["立夏", "小滿"], ["芒種", "夏至"], // 4, 5, 6月
    ["小暑", "大暑"], ["立秋", "處暑"], ["白露", "秋分"], // 7, 8, 9月
    ["寒露", "霜降"], ["立冬", "小雪"], ["大雪", "冬至"]  // 10, 11, 12月
];
export function getUpcomingEvents(startDate = new Date(), daysToQuery = 14) {
    // 改用 Object 儲存，Key 為日期字串，方便合併同日事件
    const eventsMap = {}; 
    startDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToQuery; i++) {
        let checkDate = new Date(startDate);
        checkDate.setDate(startDate.getDate() + i);
        
        const year = checkDate.getFullYear();
        const month = checkDate.getMonth() + 1;
        const dateNum = checkDate.getDate();
        
        // 生成唯一 Key (YYYYMMDD)
        const dateKey = `${year}${month.toString().padStart(2, '0')}${dateNum.toString().padStart(2, '0')}`;
        
        // 初始化該日期的物件
        if (!eventsMap[dateKey]) {
            eventsMap[dateKey] = {
                date: new Date(checkDate),
                names: [] // 這裡改用陣列
            };
        }

        // --- 1. 檢查農曆 (誕期優先) ---
        const lunar = solarToLunar(checkDate);
        if (!lunar.isLeap) {
            const mmdd = lunar.lunarMonth.toString().padStart(2, '0') + 
                         lunar.lunarDay.toString().padStart(2, '0');
            
            // 檢查仙家誕期
            if (GOD_BIRTHDAYS[mmdd]) {
                eventsMap[dateKey].names.push(GOD_BIRTHDAYS[mmdd]);
            } 
            // 如果當天不是誕期，才檢查是否初一十五 (對應你說的 else if 邏輯)
            else if (lunar.lunarDay === 1) {
                eventsMap[dateKey].names.push("初一");
            } else if (lunar.lunarDay === 15) {
                eventsMap[dateKey].names.push("十五");
            }
        }

        // --- 2. 檢查節氣 (追加到後面) ---
        MONTH_TERMS[month - 1].forEach(termName => {
            const termDateObj = getSolarTerm(year, termName);
            if (termDateObj.getDate() === dateNum && (termDateObj.getMonth() + 1) === month) {
                // 直接追加到陣列，若前面有誕期，節氣就會排在後面
                eventsMap[dateKey].names.push(termName);

                if (termName === "驚蟄") {
                    eventsMap[dateKey].names.push("白虎星君誕");
                }
            }
        });

        // 如果這一天完全沒有任何事件，可以選擇刪除該 Key，減少 Banner 負擔
        if (eventsMap[dateKey].names.length === 0) {
            delete eventsMap[dateKey];
        }
    }

    // 最後將 Map 轉回 Array 並按日期排序輸出
    return Object.values(eventsMap).sort((a, b) => a.date - b.date);
}
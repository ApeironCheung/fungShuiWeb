// CalendarAPI.js

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
    return getLunarYearInfo2(year);
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

export function solarToLunar(solarDate) {
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

export function lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeap = false) {
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

export function getNextLunarMonthInfo(solarDate) {
    const lunar = solarToLunar(solarDate);
    const yearInfo = getLunarYearInfo(lunar.lunarYear);
    
    // 找出目前是第幾個初一
    let idx = (lunar.isLeap) ? yearInfo.leapMonth : 
              (yearInfo.leapMonth !== 0 && lunar.lunarMonth > yearInfo.leapMonth ? lunar.lunarMonth : lunar.lunarMonth - 1);
    
    // 取得下一個初一的資訊
    const nextDate = yearInfo.firstDates[idx + 1] || getLunarYearInfo(lunar.lunarYear + 1).start;
    const nextLunar = solarToLunar(nextDate); // 拿到下個月的 mm, dd, isLeap

    return {
        date: nextDate,
        lunarMonth: nextLunar.lunarMonth,
        isLeap: nextLunar.isLeap
    };
}

// 1901-2099 的曆法 hex 數據 (對應 12個月大小、閏月大小、閏月月份)
const LUNAR_HEX = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1901
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1911
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1921
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1931
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025b0, 0x092b0, 0x0a935, 0x0a950, 0x0b4a0, // 1941
    0x0b6a4, 0x0ad50, 0x055a0, 0x1aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0, // 1951
    0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d260, 0x0d950, 0x16552, 0x056a0, 0x09ad0, // 1961
    0x055b4, 0x04ae0, 0x0a5b0, 0x1a4d5, 0x0d250, 0x0d2a0, 0x0d6a4, 0x0ada0, 0x095b0, 0x04977, // 1971
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1d546, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1981
    0x06560, 0x0d4a6, 0x0ea50, 0x06e90, 0x15ad5, 0x02b60, 0x086e0, 0x078e3, 0x0c950, 0x0d4a0, // 1991
    0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025b0, 0x092b0, 0x0a925, 0x0a950, 0x0b4a0, 0x1b6a4, // 2001
    0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, // 2011
    0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e960, 0x1d532, 0x056a0, 0x09ad0, 0x0a5b4, // 2021
    0x04ae0, 0x0a560, 0x1a265, 0x0d250, 0x0d2a0, 0x0af4a, 0x0ada0, 0x095b0, 0x04af5, 0x04970, // 2031
    0x0a4b0, 0x074a3, 0x06a50, 0x06d40, 0x1d0a6, 0x02b60, 0x09570, 0x052e5, 0x04970, 0x06560, // 2041
    0x0d4a6, 0x0ea50, 0x06e90, 0x05ad6, 0x02b60, 0x086e0, 0x07ae5, 0x0c950, 0x0d4a0, 0x0d8a6, // 2051
    0x0b550, 0x056a0, 0x1a5b4, 0x025b0, 0x092b0, 0x0a925, 0x0a950, 0x0b4a0, 0x0b6a4, 0x0ad50, // 2061
    0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07330, 0x06aa5, 0x0ad50, 0x04b50, // 2071
    0x04b64, 0x0a570, 0x05270, 0x0d266, 0x0d930, 0x0d560, 0x146c5, 0x0df40, 0x0d8a0, 0x16554, // 2081
    0x056a0, 0x0aad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0  // 2091
];

// 每年正月初一在公曆的偏移天數（從該年1月1日算起，0-index）
// 例如 1901年是 2月19日，Date對象月份是1，日期19，偏移約 49 天
const START_OFFSETS = [
    49, 38, 28, 46, 34, 24, 43, 32, 21, 40, // 1901-1910
    29, 48, 36, 25, 44, 33, 22, 41, 31, 50, // 1911-1920
    38, 27, 45, 35, 24, 42, 32, 21, 40, 29, // 1921-1930
    47, 36, 26, 44, 33, 23, 41, 30, 49, 38, // 1931-1940
    26, 45, 35, 24, 43, 31, 21, 39, 28, 47, // 1941-1950
    36, 26, 44, 33, 24, 41, 30, 20, 38, 27, // 1951-1960
    46, 35, 24, 43, 32, 20, 39, 29, 48, 37, // 1961-1970
    26, 45, 34, 23, 41, 31, 21, 39, 28, 47, // 1971-1980
    36, 25, 43, 33, 22, 40, 30, 49, 37, 26, // 1981-1990
    45, 34, 22, 40, 30, 18, 37, 27, 46, 35, // 1991-2000
    23, 42, 31, 21, 39, 28, 47, 36, 25, 44, // 2001-2010
    33, 22, 40, 30, 49, 38, 27, 46, 34, 24, // 2011-2020
    42, 31, 21, 40, 28, 47, 36, 25, 44, 33, // 2021-2030
    22, 41, 30, 49, 37, 26, 45, 34, 23, 42, // 2031-2040
    31, 21, 40, 28, 47, 36, 25, 44, 33, 22, // 2041-2050
    41, 30, 48, 37, 26, 44, 34, 23, 42, 31, // 2051-2060
    20, 39, 28, 47, 36, 26, 44, 34, 23, 41, // 2061-2070
    30, 48, 37, 26, 45, 34, 24, 42, 31, 21, // 2071-2080
    40, 28, 47, 36, 25, 44, 33, 22, 41, 30, // 2081-2090
    19, 38, 28, 46, 35, 25, 43, 33, 22, 40  // 2091-2100
];

function getLunarYearInfo2(year) {
    if (year < 1901 || year > 2099) return null;

    const hex = LUNAR_HEX[year - 1901];
    const offset = START_OFFSETS[year - 1901];
    
    const leapMonth = hex & 0xF; 
    const leapMonthSize = (hex >> 16) & 0x1;

    let curDate = new Date(year, 0, 1);
    curDate.setDate(curDate.getDate() + offset);
    const startDate = new Date(curDate);

    let firstDates = [];
    let leapMonthInserted = false;

    for (let i = 11; i >= 0; i--) {
        firstDates.push(new Date(curDate));
        const isBig = (hex >> (4 + i)) & 0x1;
        curDate.setDate(curDate.getDate() + (isBig ? 30 : 29));

        const currentMonthNum = 12 - i;
        if (leapMonth !== 0 && currentMonthNum === leapMonth && !leapMonthInserted) {
            firstDates.push(new Date(curDate));
            curDate.setDate(curDate.getDate() + (leapMonthSize === 1 ? 30 : 29));
            leapMonthInserted = true;
        }
    }

    return {
        year: year,
        start: startDate,
        leapMonth: leapMonth, // 直接回傳原始索引，不要 +1
        firstDates: firstDates 
    };
}
/**
 * 2026 丙午年 五行邏輯配對程式
 * 地支(0-11): 子0, 丑1, 寅2, 卯3, 辰4, 巳5, 午6, 未7, 申8, 酉9, 戌10, 亥11
 */

import { getCurrYear } from "../modelAPI.js";

const ZODIAC_NAMES = ["鼠", "牛", "虎", "兔", "龍", "蛇", "馬", "羊", "猴", "雞", "狗", "豬"];

// Function 1: 判斷地支五行 (0木, 1火, 2土, 3金, 4水)
function getElement(zodiacIdx) {
    if (zodiacIdx % 3 === 1) return 2; // 丑1, 辰4, 未7, 戌10 均為土
    const mapping = { 2:0, 3:0, 5:1, 6:1, 8:3, 9:3, 11:4, 0:4 };
    return mapping[zodiacIdx];
}

// Function 2 & 3: 根據關係 Index 決定「策略生肖」
// [0:洩, 1:自生, 2:通關, 3:三合, 4:洩]
function getBestAccessory(relationIdx, selfEl, yearEl) {
    const strategy = ["洩", "自生", "通關", "三合", "洩"][relationIdx];
    
    let targetEl;
    switch (relationIdx) {
        case 0: targetEl = (selfEl + 1) % 5; break; // 洩：我生者
        case 1: targetEl = selfEl; break;           // 自生：同類或生我者 (簡化為同類)
        case 2: targetEl = 2; break;                // 通關：火金之間必用土
        case 3: targetEl = (selfEl + 2) % 5; break; // 三合：取局中關鍵字
        case 4: targetEl = (selfEl + 1) % 5; break; // 洩：我生者
    }

    // 簡單查表回傳一個代表性生肖
    const elToZodiac = { 0: "虎、兔", 1: "蛇、馬", 2: "龍、牛、羊、狗", 3: "猴、雞", 4: "鼠、豬" };
    return { strategy, accessory: elToZodiac[targetEl] };
}

// Function 4: 統合計算 12 生肖
function calculateYearlyGuide(year) {
    // 簡化流年：2026年是午馬(6)，五行是火(1)
    // 如果要通用，可加 year % 12 邏輯，呢度以 2026 為準
    const yearZodiacIdx = (year - 4) % 12; // 2026 -> 6 (午)
    const yearEl = getElement(yearZodiacIdx);
    
    let results = [];
    for (let i = 0; i < 12; i++) {
        const selfEl = getElement(i);
        // 核心公式: (流年 - 自身 + 5) % 5
        const relationIdx = (yearEl - selfEl + 5) % 5;
        const { strategy, accessory } = getBestAccessory(relationIdx, selfEl, yearEl);
        
        results.push({
            zodiac: ZODIAC_NAMES[i],
            strategy: strategy,
            accessory: accessory
        });
    }
    return { yearZodiac: ZODIAC_NAMES[yearZodiacIdx], list: results };
}

// Function 5: Output 文字
export function generateZodicAccessoriesReport() {
    const year = getCurrYear();
    const data = calculateYearlyGuide(year);
    let result = `<div id = accessories>
    --- ${year}年 (${data.yearZodiac}年) 12生肖配飾指南 ---<br>`;
    data.list.forEach(item => {
        result += `【屬${item.zodiac}】策略：${item.strategy} | 建議配戴：${item.accessory}形飾物<br>`;
    });
    return result + "</div>";
}
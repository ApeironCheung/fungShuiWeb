import { getSolarTerm, lunarToSolar, solarToLunar } from './CalendarAPI.js';

let date = new Date();
let isMale = true;

export function getLunarDate(){return solarToLunar(date)};
export function getDate(){ return date;}
export function setDate(inputDate){
    const year = inputDate.getFullYear();
    if(year>1900 && year<2100){date=inputDate};
}
export function getIsMale(){return isMale;}
export function setIsMale(bool){isMale = bool;}

export function getCurrYearStemBranch(){
    const today = new Date();
    const solarYear = today.getFullYear();
    const springBegin = getSolarTerm(solarYear, '立春');
    const year = today < springBegin? solarYear -1 : solarYear;
    return [getYearStemIdx(year), getYearBranchIdx(year)];   
}

export function getRealYear(){
    const solarYear = date.getFullYear();
    const springBegin = getSolarTerm(solarYear,'立春');
    return date < springBegin ? solarYear -1 : solarYear;
}

export function getEightWords(){
    const year = getRealYear();
    
    let eightWords = [[null,null,null,null],[null,null,null,null]];//[0-9],[0-11]
    eightWords[0][3] = getYearStemIdx(year);
    eightWords[1][3] = getYearBranchIdx(year);
    eightWords[0][2] = getMonthStemIdx(eightWords[0][3]);
    eightWords[1][2] = getMonthBranchIdx();
    eightWords[0][1] = getDayStemIdx();
    eightWords[1][1] = getDayBranchIdx();    
    eightWords[1][0] = getHourBranchIdx();
    eightWords[0][0] = getHourStemIdx(eightWords[0][1],eightWords[1][0]);

    return eightWords;
}

//年柱：
function getYearStemIdx(year){
    const offset = year - 4;
    return (offset % 10 + 10) % 10;
}
function getYearBranchIdx(year){
    const offset = year - 4;
    return (offset % 12 + 12) % 12;
}

/**
 * 月地支 Index：這是固定的，正月(立春)建寅
 */
function getMonthBranchIdx() {
const sYear = date.getFullYear();

 const terms = ['大雪','小寒','立春','驚蟄','清明','立夏','芒種','小暑','立秋','白露','寒露','立冬','大雪'];
    const termDates = terms.map(t => getSolarTerm(sYear, t));
        let i = termDates[0]>termDates[1]? 1 :0;
        while(i<termDates.length){
        if(date<termDates[i]){return (i-1+12)%12}
        i++;
        }   
        return 0;
}

/**
 * 月天干 Index：使用五虎遁公式
 */

function getMonthStemIdx(yStemIdx) {
     return (yStemIdx * 2 + 2) % 10;
}

/**
 * 3. 日柱：採用基準日計算
 */
function getDiffDays(){
    const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const d2 = new Date(2000, 0, 1, 12, 0, 0);
    return Math.round((d1.getTime() - d2.getTime()) / (86400000)); // 24*60*60*1000
}

function getDayStemIdx(){
    return (4 + getDiffDays() % 10 + 10) % 10;
}
function getDayBranchIdx(){
    return (6 + getDiffDays() % 12 + 12) % 12;
}

/**
 * 4. 時柱：五鼠遁
 */
function getHourStemIdx(dayStemIdx, branchIdx){
    const logic =  date.getHours()>=23 ? 1: 0; 
    return ((dayStemIdx + logic)*2 + branchIdx) % 10;
}
function getHourBranchIdx(){
    const hours = date.getHours();
    return Math.floor(((hours + 1) % 24) / 2);
}

/**
 * 5. 化合計算邏輯
 * 輸入格式為 getEightWords() 回傳的 [[H], [D], [M], [Y]]
 */export function checkCombinations(sixPillars) {
    // 建立索引：[0:時, 1:日, 2:月, 3:年, 4:運, 5:歲]
    // 確保對應 getSixPillars 的 [0][i] 天干, [1][i] 地支
    const pillarIndices = [0, 1, 2, 3, 4, 5].map(i => ({
        sIdx: sixPillars[0][i],
        bIdx: sixPillars[1][i]
    }));

    const results = {
        stemCombine: [], 
        branchSixCombine: [], 
        branchClash: [],
        branchTripleCombine: [],
        pillarLabels: ["時", "日", "月", "年", "運", "歲"]
    };

    const STEM_HE_MAP = { "0,5": "甲己合", "1,6": "乙庚合", "2,7": "丙辛合", "3,8": "丁壬合", "4,9": "戊癸合" };
    const branchSixMap = { "0,1": "子丑合", "2,11": "寅亥合", "3,10": "卯戌合", "4,9": "辰酉合", "5,8": "巳申合", "6,7": "午未合" };
    const branchClashMap = { "0,6": "子午沖", "1,7": "丑未沖", "2,8": "寅申沖", "3,9": "卯酉沖", "4,10": "辰戌沖", "5,11": "巳亥沖" };
    
    const scanPairs = [
        [0, 1], [1, 2], [2, 3], 
        [4, 0], [4, 1], [4, 2], [4, 3],
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4]
    ];

    scanPairs.forEach(([i, j]) => {
        // 增加安全檢查預防傳入空值
        if (pillarIndices[i].sIdx === null || pillarIndices[j].sIdx === null) return;

        const name = `${results.pillarLabels[i]}${results.pillarLabels[j]}`;
        
        const sKey = [pillarIndices[i].sIdx, pillarIndices[j].sIdx].sort((a, b) => a - b).join(',');
        if (STEM_HE_MAP[sKey]) results.stemCombine.push(`${name}: ${STEM_HE_MAP[sKey]}`);

        const bKey = [pillarIndices[i].bIdx, pillarIndices[j].bIdx].sort((a, b) => a - b).join(',');
        if (branchSixMap[bKey]) results.branchSixCombine.push(`${name}: ${branchSixMap[bKey]}`);
        if (branchClashMap[bKey]) results.branchClash.push(`${name}: ${branchClashMap[bKey]}`);
    });

    // 2. 地支三合/半合優化
    const tripleMaps = [
        { set: [8, 0, 4], center: 0, name: "申子辰三合水局" },
        { set: [11, 3, 7], center: 3, name: "亥卯未三合木局" },
        { set: [2, 6, 10], center: 6, name: "寅午戌三合火局" },
        { set: [5, 1, 9], center: 9, name: "巳酉丑三合金局" }
    ];

    tripleMaps.forEach(triple => {
        // 找出包含此三合局地支的所有柱位
        const matchedIndices = [];
        pillarIndices.forEach((p, idx) => {
            if (triple.set.includes(p.bIdx)) matchedIndices.push(idx);
        });

        const presentBells = matchedIndices.map(idx => pillarIndices[idx].bIdx);
        const uniqueInSet = [...new Set(presentBells)];

        if (uniqueInSet.length === 3) {
            const labels = matchedIndices.map(idx => results.pillarLabels[idx]).join('');
            results.branchTripleCombine.push(`三合: ${triple.name} (${labels})`);
        } else if (uniqueInSet.length === 2) {
            // 半合判定：必須包含中神 (子0, 卯3, 午6, 酉9)
            if (uniqueInSet.includes(triple.center)) {
                const labels = matchedIndices.map(idx => results.pillarLabels[idx]).join('');
                results.branchTripleCombine.push(`半合: ${triple.name} (${labels})`);
            }
        }
    });

    return results;
}

export function getSixPillars(){
    const w = getEightWords();
    const c = getCurrFortunePillar2();
    const y = getCurrYearStemBranch();
    return [
        [w[0][0], w[0][1], w[0][2], w[0][3], c[0], y[0]], // 天干行
        [w[1][0], w[1][1], w[1][2], w[1][3], c[1], y[1]]  // 地支行
    ];
}

/**
 * 五行歸類地圖 (0,1 -> 木, 2,3 -> 火 ...)
 */
const ELEMENT_INDEX_MAP = ["木", "木", "火", "火", "土", "土", "金", "金", "水", "水"];

/**
 * 地支藏干數據表 [天干Index, 權重分數]
 */
const BRANCH_HIDDEN_STEMS = {
    0:  [[9, 10]],                      // 子：癸(10)
    1:  [[5, 6], [9, 3], [7, 1]],        // 丑：己(6), 癸(3), 辛(1)
    2:  [[0, 7], [2, 2], [4, 1]],        // 寅：甲(7), 丙(2), 戊(1)
    3:  [[1, 10]],                       // 卯：乙(10)
    4:  [[4, 5], [1, 3], [9, 2]],        // 辰：戊(5), 乙(3), 癸(2)
    5:  [[2, 7], [4, 2], [6, 1]],        // 巳：丙(7), 戊(2), 庚(1)
    6:  [[3, 7], [5, 3]],                 // 午：丁(7), 己(3)
    7:  [[5, 6], [3, 3], [1, 1]],        // 未：己(6), 丁(3), 乙(1)
    8:  [[6, 7], [8, 2], [4, 1]],        // 申：庚(7), 壬(2), 戊(1)
    9:  [[7, 10]],                       // 酉：辛(10)
    10: [[4, 5], [6, 3], [2, 2]],        // 戌：戊(5), 庚(3), 丙(2)
    11: [[8, 7], [0, 3]]                 // 亥：壬(7), 甲(3)
};

/**
 * 計算六柱五行強弱比例
 * @param {Array} sixPillars - 來自 getSixPillars() 的 [2][6] 矩陣
 */
const multiplierList = [1.0,2.5,1.5];
export function calculate5elementStrength(sixPillars) {
    let scores = { "木": 0, "火": 0, "土": 0, "金": 0, "水": 0 };

    // 1. 天干計分 (時, 日, 月, 年, 運, 歲)
    sixPillars[0].forEach((sIdx, i) => {
        const element = ELEMENT_INDEX_MAP[sIdx];
        let weight = 10; // 基礎分
        if (i === 1) weight = 12; // 日主能量微加權
        scores[element] += weight;
    });

    // 2. 地支計分 (含藏干與月令加權)
    sixPillars[1].forEach((bIdx, i) => {
        const hidden = BRANCH_HIDDEN_STEMS[bIdx];
        
        // 月令加權係數：月支(index 2)能量最強，乘以 2.5
        // 流年大運支(index 4, 5)影響力也大，乘以 1.5
    let multiplier = (i === 2) ? multiplierList[1] : (i >= 4) ? multiplierList[2] : multiplierList[0];

        hidden.forEach(([sIdx, power]) => {
            const element = ELEMENT_INDEX_MAP[sIdx];
            scores[element] += (power * multiplier);
        });
    });

    // 3. 轉化為百分比 (方便 View 層畫圓餅圖)
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    let percentages = {};
    for (let key in scores) {
        percentages[key] = totalScore > 0 ? ((scores[key] / totalScore) * 100).toFixed(1) : 0;
    }

    return { rawScores: scores, percentages: percentages };
}

/**
 * 獲取十神名稱
 * @param {number} meIdx - 日干 Index (0-9)
 * @param {number} targetIdx - 目標天干 Index (0-9)
 */
function getTenGod(meIdx, targetIdx) {
    const my5Elements = Math.floor(meIdx / 2); // 0:木, 1:火, 2:土, 3:金, 4:水
    const target5Elements = Math.floor(targetIdx / 2);
    
    const myPolarity = meIdx % 2; // 0:陽(甲丙...), 1:陰(乙丁...)
    const targetPolarity = targetIdx % 2;
    
    // 計算五行距離 (0-4)
    const distance = (target5Elements - my5Elements + 5) % 5;
    // 是否同性 (1:是, 0:否)
    const isSamePolarity = (myPolarity === targetPolarity) ? 1 : 0;
    
    return (distance * 2) + isSamePolarity;
}

export function getPillarsTenGods() {
    const sixPillars = getSixPillars();
    const meIdx = sixPillars[0][1]; // 日干
    
    // 1. 天干十神
    const stemTenGods = sixPillars[0].map(sIdx => getTenGod(meIdx, sIdx));
    
    // 2. 地支十神 (取本氣藏干)
    const branchTenGods = sixPillars[1].map(bIdx => {
        const mainHiddenStem = BRANCH_HIDDEN_STEMS[bIdx][0][0]; // 取藏干第一個(本氣)
        return getTenGod(meIdx, mainHiddenStem);
    });

    return [stemTenGods, branchTenGods];
}

/**
 * 6. 大運起運數據計算 (修正版)
 */
export function getFortuneStart(yearStem, monthBranch) {
    const terms = ['大雪','小寒','立春','驚蟄','清明','立夏','芒種','小暑','立秋','白露','寒露','立冬','大雪'];
    const isEven = yearStem % 2; 
    const maleBit = isMale ? 1 : 0;
    const isForward = maleBit ^ isEven;

    // 處理子月索引
    const index = (monthBranch === 0) ? (date.getMonth() > 5 ? 12 : 0) : monthBranch;

    let targetTermDate;
    if (index === 12 && isForward) {
        targetTermDate = getSolarTerm(date.getFullYear() + 1, '小寒');
    } else if (index === 0 && !isForward) {
        targetTermDate = getSolarTerm(date.getFullYear() - 1, '大雪');
    } else {
        targetTermDate = getSolarTerm(date.getFullYear(), terms[index + isForward]);
    }

    const diffMs = Math.abs(targetTermDate - date);
    const diffHours = diffMs / (1000 * 60 * 60);
    const totalMonths = Math.floor(diffHours / 6);

    return {
        startAge: {
            years: Math.floor(totalMonths / 12),
            months: totalMonths % 12,
            days: Math.floor((diffHours % 6) * 5)
        },
        isForward: isForward === 1
    };
}

/**
 * 根據起運歲數計算目前大運
 */
function fortuneCal(startAgeYears, monthStem, monthBranch, isForward) {
    const birthYear = getRealYear(); // 攞返你原本支 getRealYear
    const currYear = new Date().getFullYear();
    const startYear = birthYear + startAgeYears; // 轉化為起運年份
    const diff = currYear - startYear;

    if (diff < 0) {
        return { stem: monthStem, branch: monthBranch }; // 未起運睇月柱
    }

    const index = Math.floor(diff / 10) + 1;
    const direction = isForward ? 1 : -1;
    const steps = index * direction;

    return { 
        stem: (monthStem + 20 + steps) % 10, 
        branch: (monthBranch + 24 + steps) % 12 
    };
}

/**
 * 最終獲取當前大運柱位
 */
export function getCurrFortunePillar2() {
    const yearStem = getYearStemIdx(getRealYear()); // 確保傳入正確年份
    const monthBranch = getMonthBranchIdx();
    const monthStem = getMonthStemIdx(yearStem);
    // 攞起運資料
    const { isForward, startAge } = getFortuneStart(yearStem, monthBranch);    
    // 攞目前大運干支
    const { stem, branch } = fortuneCal(startAge.years, monthStem, monthBranch, isForward);
    return [stem, branch];
}
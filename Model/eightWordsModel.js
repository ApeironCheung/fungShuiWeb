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
    const year = solarToLunar(today).lunarYear; 
    const stem = getYearStemIdx(year);
    const branch = getYearBranchIdx(year); 
    return [stem, branch];   
}

export function getEightWords(){
    const checkDate = solarToLunar(date);
    const year = checkDate.lunarYear;//int year
    
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
 * 核心輔助：獲取節氣索引 (0:立春後, 1:驚蟄後 ... 11:小寒後)
 */
function getMonthIdx() {
    const year = date.getFullYear();
    const terms = ['立春','驚蟄','清明','立夏','芒種','小暑','立秋','白露','寒露','立冬','大雪','小寒'];
    
    let monthIdx = -1;
    for (let i = 11; i >= 0; i--) {
        if (date >= getSolarTerm(year, terms[i])) {
            monthIdx = i;
            break;
        }
    }
    // 處理立春前（即屬於去年的最後一個節氣區間）
    if (monthIdx === -1) monthIdx = 11; 
    return monthIdx;
}

/**
 * 月地支 Index：這是固定的，正月(立春)建寅
 */
function getMonthBranchIdx() {
    const monthIdx = getMonthIdx();
    return (monthIdx + 2) % 12;
}

/**
 * 月天干 Index：使用五虎遁公式
 */
function getMonthStemIdx(yStemIdx) {
    const monthIdx = getMonthIdx();
    return (yStemIdx * 2 + 2 + monthIdx) % 10;
}

/**
 * 3. 日柱：採用基準日計算
 */
function getDayStemIdx(){
    const baseDate = new Date(2000, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));    
    return (0 + diffDays % 10 + 10) % 10;
}
function getDayBranchIdx(){
    const baseDate = new Date(2000, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000));    
    return (10 + diffDays % 12 + 12) % 12;
}

/**
 * 4. 時柱：五鼠遁
 */
function getHourStemIdx(dayStemIdx, branchIdx){
    const hours = date.getHours();
    let logicalDayStem = dayStemIdx;
    if (hours >= 23){logicalDayStem = (dayStemIdx + 1) % 10;}
    return (logicalDayStem * 2 + branchIdx) % 10;    
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
/**
 * 6. 大運起運年計算
 */
export function getFortuneData() {
    const yS = getYearStemIdx(solarToLunar(date).lunarYear);
    const isYearStemYang = yS % 2 === 0;
    const isForward = isMale ? isYearStemYang : !isYearStemYang;

    // 尋找目標節氣（順行找下一個，逆行找上一個）
    const targetTermDate = _findNearestTerm(isForward);
    const startAge = _calculateFortuneStartAge(date, targetTermDate);

    return {
        isForward,
        startAge, // { years, months, days }
        direction: isForward ? "順行" : "逆行"
    };
}

function _findNearestTerm(isForward) {
    const year = date.getFullYear();
    const terms = ['立春','驚蟄','清明','立夏','芒種','小暑','立秋','白露','寒露','立冬','大雪','小寒'];
    
    if (isForward) {
        // 順行：找下一個節氣
        let termsInYear = terms.map(t => ({ name: t, time: getSolarTerm(year, t) }));
        let target = termsInYear.find(t => t.time > date);
        // 如果今年之後沒了，那肯定是明年的立春
        return target ? target.time : getSolarTerm(year + 1, '立春');
    } else {
        // 逆行：找上一個節氣
        let termsInYear = terms.map(t => ({ name: t, time: getSolarTerm(year, t) }));
        let target = [...termsInYear].reverse().find(t => t.time < date);
        
        if (target) {
            return target.time;
        } else {
            return getSolarTerm(year - 1, '大雪');
        }
    }
}

function _calculateFortuneStartAge(birthDate, targetTermDate) {
    const diffMs = Math.abs(targetTermDate - birthDate);
    const totalDays = diffMs / (1000 * 60 * 60 * 24);

    const years = Math.floor(totalDays / 3);
    const remainingDays = totalDays % 3;
    const months = Math.floor(remainingDays * 4);
    const days = Math.floor(((remainingDays * 4) % 1) * 30);

    return { years, months, days };
}

/**
 * 根據月柱、順逆、以及目標大運序號，直接計算該大運干支
 * @param {number} mS - 月干 Index (0-9)
 * @param {number} mB - 月支 Index (0-11)
 * @param {boolean} isForward - 是否順行
 * @param {number} fortuneIndex - 第幾個大運 (0 為第一部, 1 為第二部...)
 */
function getTargetFortunePillar(mS, mB, isForward, fortuneIndex) {
    // 加上 1 是因為第一部大運是月柱的「下一位」或「上一位」
    const offset = fortuneIndex + 1;
    
    let fStem, fBranch;

    if (isForward) {
        fStem = (mS + offset) % 10;
        fBranch = (mB + offset) % 12;
    } else {
        fStem = (mS - offset + 100) % 10; // +100 是為了確保負數取模正確
        fBranch = (mB - offset + 120) % 12;
    }

    return [fStem, fBranch];
}

export function getCurrFortunePillar() {
    // 1. 取得基本資料
    const birthday = getDate(); // 出生日期
    const { isForward, startAge } = getFortuneData(); // 取得起運歲數與順逆
    const eightWords = getEightWords();
    const mS = eightWords[0][2]; // 月干
    const mB = eightWords[1][2]; // 月支

    // 2. 計算目前距離出生過了幾年 (用今天日期)
    const today = new Date();
    const diffYears = (today - birthday) / (1000 * 60 * 60 * 24 * 365.25);

    // 3. 計算起運後的年數
    // startAge.years 是整數年，這裡簡單化處理，或者用精確總天數
    const startAgeTotal = startAge.years + (startAge.months / 12) + (startAge.days / 365);
    
    if (diffYears < startAgeTotal) {
        // 未起運，通常看月柱或童限
        return [mS, mB]; 
    }

    // 4. 關鍵：算出 fortuneIndex
    // 起運後每 10 年換一個運
    const fortuneIndex = Math.floor((diffYears - startAgeTotal) / 10);

    // 5. 直接計算並回傳
    return getTargetFortunePillar(mS, mB, isForward, fortuneIndex);
}

export function getSixPillars(){
    const w = getEightWords();
    const c = getCurrFortunePillar();
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
 * 十神矩陣 [關係距離][是否同性]
 * 距離 0:同我, 1:我生, 2:我剋, 3:剋我, 4:生我
 * 同性 0:異性(正), 1:同性(偏)
 */
const TEN_GODS_MATRIX = [
    ["劫財", "比肩"], // 0: 同我
    ["傷官", "食神"], // 1: 我生
    ["正財", "偏財"], // 2: 我剋
    ["正官", "七殺"], // 3: 剋我
    ["正印", "偏印"]  // 4: 生我
];

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
    
    return TEN_GODS_MATRIX[distance][isSamePolarity];
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
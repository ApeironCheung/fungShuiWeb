import { solarToLunar } from "./CalendarAPI.js";
import { getFortuneDirection, getHourBranchIdx, getIsMale, getMonthStemIdx, getYearBranchIdx, getYearStemIdx } from "./eightWordsModel.js";
import { getDate } from './astrologyGlobalVar.js'

export function getPolarStarAstrologyGraph(){
    const date = getDate();
    const lunarDate = solarToLunar(date);
    const yearStem = getYearStemIdx(lunarDate.lunarYear);
    const yearBranch = getYearBranchIdx(lunarDate.lunarYear);
    const lunarMonth = lunarDate.lunarMonth;
    const day = lunarDate.lunarDay;
    const hourIdx = getHourBranchIdx(date.getHours());

    const lifeStem = getLifeStem(lunarDate);//命宮天干
    const lifeBranch = getLifeBranch(lunarDate, hourIdx);//命宮地支

    const set = getSet(lifeStem, lifeBranch);//起局
    const polarStarPos = getPolarStarPos(set, day);//紫微定位
    const mainStars = get14MainStars(polarStarPos);//14主星
    const fourAssists = get4Assists(lunarMonth, hourIdx);//輔弼昌曲
    const starsWithBecoming = get4becoming(yearStem, mainStars, fourAssists);//四化

    const palaces = getPalaces(lifeBranch);//宮位
    const bodyPalacePos = getBodyPalace(lunarMonth,hourIdx);//身宮
    starsWithBecoming.push({'key' : '身宮', 'Pos': bodyPalacePos});

    const tenYearFortune = get10yearFortune(getIsMale(),yearStem,lifeBranch, set);

    const assistStars = getAssistStars(yearStem, yearBranch, hourIdx);
    const classBStars = getClassBStars(yearStem, yearBranch, lifeBranch, bodyPalacePos, lunarMonth, day, assistStars);

    const keysToPush = [palaces, tenYearFortune, starsWithBecoming, assistStars, classBStars];
    const result = [];
    for (let i =0; i < 12; i++){
        result.push([]);
    }
    for(let i =0; i <keysToPush.length; i++){
        result = pushKeysIntoPalaces(result, keysToPush[i]);
    }
    return result;
}

function pushKeysIntoArray(array, keys){
    for(let i = 0;i<keys.length; i++){
        array.push(keys[i]);
    }
    return array;
}

function pushKeysIntoPalaces(array, keys){//Pos in keys must match array
    for(let i = 0; i <keys.length; i++){
        array[keys[i].Pos].push(keys[i].key);
    }
    return array;
}

function getLifeStem(lunarDate){//命宮天干
    const yearStem = getYearStemIdx(lunarDate.lunarYear);
    return getMonthStemIdx(yearStem);//借用八字月支的五虎遁公式
}

function getLifeBranch(lunarDate, hourIdx){//命宮地支
    const isNextMonth = lunarDate.isLeap && lunarDate.lunarDay > 15;
    const monthBranchAdj = isNextMonth? 2 : 1;
    const monthBranch = lunarDate.lunarMonth + monthBranchAdj;
    return (monthBranch - hourIdx + 12) %12;
}

function getSet(lifeStem, lifeBranch){//起局
    const lifeStemNum =  Math.floor((lifeStem + 1)/2);
    const lifeBranchNum = Math.floor(lifeBranch/2 % 3 + 1);
    const setIdx = (lifeStemNum + lifeBranchNum - 1) % 5;
    const set = [4,2,6,5,3];
    return set[setIdx];
}

function getPolarStarPos(set, day){//計紫微星
    const rem = day % set;
    const offset = set - rem;
    const q = Math.ceil(day + offset) / set;
    const move = rem == 0? day/set : 
                offset % 2 == 0? q + offset : q - offset;
    return (move + 1) % 12;
}
function get14MainStars(polarStarPos){
    const zetaSgrPos = (14-polarStarPos + 12) % 12;
    const result = [
        {'key': '紫微', 'Pos': polarStarPos},
        {'key': '天機', 'Pos': fixIdx(polarStarPos - 1)},
        {'key': '太陽', 'Pos': fixIdx(polarStarPos - 3)},
        {'key': '武曲', 'Pos': fixIdx(polarStarPos - 4)},
        {'key': '天同', 'Pos': fixIdx(polarStarPos - 5)},
        {'key': '廉貞', 'Pos': fixIdx(polarStarPos - 8)},
        {'key': '天府', 'Pos': zetaSgrPos},
        {'key': '太陰', 'Pos': fixIdx(zetaSgrPos + 1)},
        {'key': '貪狼', 'Pos': fixIdx(zetaSgrPos + 2)},
        {'key': '巨門', 'Pos': fixIdx(zetaSgrPos + 3)},
        {'key': '天相', 'Pos': fixIdx(zetaSgrPos + 4)},
        {'key': '天梁', 'Pos': fixIdx(zetaSgrPos + 5)},
        {'key': '七殺', 'Pos': fixIdx(zetaSgrPos + 6)},
        {'key': '破軍', 'Pos': fixIdx(zetaSgrPos + 10)},
    ]
    return result;
}
function fixIdx(i){
    return (i % 12 + 12) % 12;
}
function get4Assists(lunarMonth, hourIdx){
    const result = [
        {'key': '左輔', 'Pos' : fixIdx(4 + (lunarMonth - 1))},
        {'key': '右弼', 'Pos' : fixIdx(10 - (lunarMonth - 1))},
        {'key': '文昌', 'Pos' : fixIdx(10 - (hourIdx))},
        {'key': '文曲', 'Pos' : fixIdx(4 +  (hourIdx))},        
    ]
    return result;
}
function get4becoming(yearStem, mainStars, assists){
    for (let i = 0; i <assists.length; i++){
        mainStars.push(assists[i]);
    }
    const transMap = [
        [5, 13, 3, 2],    // 甲：廉 破 武 陽
        [1, 11, 0, 7],    // 乙：機 梁 紫 陰
        [4, 1, 16, 5],    // 丙：同 機 昌 廉
        [7, 4, 1, 9],     // 丁：陰 同 機 巨
        [8, 7, 15, 1],    // 戊：貪 陰 右 機
        [3, 8, 11, 17],   // 己：武 貪 梁 曲
        [2, 3, 7, 4],     // 庚：陽 武 陰 同
        [9, 2, 17, 16],   // 辛：巨 陽 曲 昌
        [11, 0, 14, 3],   // 壬：梁 紫 左 武
        [13, 9, 7, 8]     // 癸：破 巨 陰 貪
    ];
    mainStars[transMap[yearStem][0]].key +='化祿';
    mainStars[transMap[yearStem][1]].key +='化權';
    mainStars[transMap[yearStem][2]].key +='化科';
    mainStars[transMap[yearStem][3]].key +='化忌';
    return mainStars;
}

function getPalaces(lifePalaceBranch){
    const keys = ['命宮','兄弟宮','夫妻宮','子女宮','財帛宮','疾厄宮',
        '遷移宮','奴僕宮','官祿宮','田宅宮','福德宮','父母宮'];
    const result = [];
    for(let i =0; i < keys.length; i++){
        result.push({'key':keys[i], 'Pos': (lifePalaceBranch + i) % 12})
    }
    return result;
}

function getBodyPalace(lunarMonth,hourIdx){
    return (2 + (lunarMonth - 1) + hourIdx) % 12;
}

function get10yearFortune(isMale, yearStem, lifePalaceBranch, set){
    const fortuneResult = [];
    const isForward = getFortuneDirection(isMale, yearStem);
    const direction = isForward? 1 : -1; // direction 係 1 (順) 或 -1 (逆)
    let currentPos = lifePalaceBranch;
    for (let age = set; age < (set + 120); age += 10) {
        fortuneResult.push({
            'key': `${age}-${age + 9}`, 
            'Pos': fixIdx(currentPos)
        });
        currentPos = fixIdx(currentPos + direction);
    }
    return fortuneResult;
}

function getAssistStars(yearStemIdx, yearBranchIdx, hourIdx){
    const wealthStorage = getWealthStorage(yearStemIdx);
    const nobleStars = getNobleStars(yearStemIdx);
    const empty = getEmptyRob(hourIdx);
    const fireBell = getFireBell(yearBranchIdx, hourIdx);
    const horse = getTravelingHorse(yearBranchIdx);

    const keysToPush = [wealthStorage,nobleStars,empty,fireBell,[horse]];
    const result = [];
    for(let i =0; i <keysToPush.length; i++){
        result = pushKeysIntoArray(result, keysToPush[i]);
    }
    return result;
}

function getWealthStorage(yearStemIdx) {
    // 祿存位置表
    const map = [2, 3, 5, 6, 5, 6, 8, 9, 11, 0];
    const pos = map[yearStemIdx];

    return [
        { 'key': '祿存', 'Pos': pos },
        { 'key': '擎羊', 'Pos': fixIdx(pos + 1) }, // 祿前一格
        { 'key': '陀羅', 'Pos': fixIdx(pos - 1) }  // 祿後一格
    ];
}
function getNobleStars(yearStemIdx) {
    const dayNobleMap = [7, 8, 9, 11, 7, 8, 1, 6, 3, 5];
    const nightNobleMap = [1, 0, 11, 9, 1, 0, 7, 2, 5, 3];
    
    return [
        { 'key': '天魁', 'Pos': dayNobleMap[yearStemIdx] },
        { 'key': '天鉞', 'Pos': nightNobleMap[yearStemIdx] }
    ];
}
function getEmptyRob(hourIdx) {
    return [
        { 'key': '地劫', 'Pos': fixIdx(11 + hourIdx) },
        { 'key': '地空', 'Pos': fixIdx(11 - hourIdx) }
    ];
}
function getFireBell(yearBranchIdx, hourIdx) {
    // 根據生年支搵火鈴起點 [火星起點, 鈴星起點]
    const startPosMap = {
        2: [2, 10], 6: [2, 10], 10: [2, 10], // 寅午戌
        8: [2, 10], 0: [2, 10], 4: [2, 10],  // 申子辰
        5: [3, 10], 9: [3, 10], 1: [3, 10],  // 巳酉丑
        11: [9, 10], 3: [9, 10], 7: [9, 10]  // 亥卯未
    };
    
    const [fireStart, bellStart] = startPosMap[yearBranchIdx];

    return [
        { 'key': '火星', 'Pos': fixIdx(fireStart + hourIdx) },
        { 'key': '鈴星', 'Pos': fixIdx(bellStart + hourIdx) }
    ];
}

function getTravelingHorse(yearBranchIdx) {
    // index 對應餘數 0, 1, 2, 3
    const horsePos = fixIdx(2 - 3 * (yearBranchIdx % 4));
    return { 'key': '天馬', 'Pos': horsePos };
}

function getClassBStars(yearStemIdx, yearBranchIdx, lifePos, bodyPos, lunarMonth, day, fourAssist){
    const assistLPos = fourAssist[0].Pos;
    const assistRPos = fourAssist[1].Pos;
    const analyticStar = fourAssist[2].Pos;
    const creativeStar = fourAssist[3].Pos;
    const stemBStars = getStemBStars(yearStemIdx);
    const monthBStars = getMonthBStars(lunarMonth);
    const followStars = getFollowStars(analyticStar, creativeStar, day);
    const followLR = get3Stage8base(assistLPos, assistRPos, day);
    const branchStars = getBranchBStars(lifePos, bodyPos, yearBranchIdx);

    const keysToPush = [stemBStars, monthBStars, followStars, followLR, branchStars];
    const result = [];
    for (let i =0; i < 12; i++){
        result.push([]);
    }
    for(let i =0; i <keysToPush.length; i++){
        result = pushKeysIntoArray(result, keysToPush[i]);
    }
    return result;
}

function getStemBStars(yearStemIdx) {
    const heavenOfficial = [7, 9, 5, 6, 3, 5, 11, 11, 9, 10]; // 0-9 對應地支 Pos
    const heavenLuck = [10, 8, 2, 1, 3, 5, 7, 6, 10, 8];
    const heavenChef = [5, 6, 0, 5, 6, 8, 2, 6, 8, 10];
    return [
        { 'key': '天官', 'Pos': heavenOfficial[yearStemIdx] },
        { 'key': '天福', 'Pos': heavenLuck[yearStemIdx] },
        { 'key': '天廚', 'Pos': heavenChef[yearStemIdx] }
    ];
}

function getMonthBStars(lunarMonth) {
    const m = lunarMonth - 1; // 轉為 0-11
    return [
        { 'key': '天刑', 'Pos': fixIdx(9 + m) },
        { 'key': '天姚', 'Pos': fixIdx(1 + m) },
        { 'key': '解神', 'Pos': fixIdx(10 - m) }, // 年解神，另有月解神
        { 'key': '天巫', 'Pos': [5, 8, 2, 11][m % 4] },
        { 'key': '天月', 'Pos': [10, 5, 4, 7, 8, 11, 0, 11, 2, 7, 10, 2][m] },
        { 'key': '陰煞', 'Pos': fixIdx(2 - (m % 3) * 4) } // 陰煞規律較跳躍，建議查表
    ];
}
function getFollowStars(analyticStar, creativeStar, day) {
    return [
        { 'key': '台輔', 'Pos': fixIdx(creativeStar + 2) },    // 台輔：文曲 Pos + 2；封誥：文曲 Pos - 2
        { 'key': '封誥', 'Pos': fixIdx(creativeStar - 2) },
        { 'key': '恩光', 'Pos': fixIdx(analyticStar + day - 2) },    // 恩光：文昌 Pos + (day-1) - 1
        { 'key': '天貴', 'Pos': fixIdx(creativeStar + day - 2) }    // 天貴：文曲 Pos + (day-1) - 1
    ];
}

function get3Stage8base(assistLPos, assistRPos, day) {
    return [
        { 'key': '三台', 'Pos': fixIdx(assistLPos + (day - 1)) },
        { 'key': '八座', 'Pos': fixIdx(assistRPos - (day - 1)) }
    ];
}

function getBranchBStars(lifePos, bodyPos, yearBranchIdx) {
    const saltyPos = 3*(3-yearBranchIdx % 4);       // 咸池：[酉, 午, 卯, 子] -> 9, 6, 3, 0   
    const flowerPos = fixIdx(4 - 3 * (yearBranchIdx % 4));    //華蓋 4,1,10,7
    const brokenPos = fixIdx(5 - 4 * (yearBranchIdx % 3));
        // 龍池：辰(4)起子順數；鳳閣：戌(10)起子逆數
    const dragonFountain = fixIdx(4 + yearBranchIdx);
    const phoenixChamber = fixIdx(10 - yearBranchIdx);
    
    // 天哭：午(6)起子逆數；天虛：午(6)起子順數
    const heavenCry = fixIdx(6 - yearBranchIdx);
    const heavenEmpty = fixIdx(6 + yearBranchIdx);

    // 孤辰寡宿 (數學分組)
    const sector = Math.floor(((yearBranchIdx + 10) % 12) / 3);   
    const aloneTime = fixIdx(5 + sector * 3);    // 孤辰從 巳(5) 開始，每隔一季跳 3 格
    const aloneLive = fixIdx(1 + sector * 3);    // 寡宿從 丑(1) 開始，每隔一季跳 3 格

    const lovePos = fixIdx(3 - yearBranchIdx);//紅鸞
    const happyPos = fixIdx(lovePos + 6);//天喜

    const heavenVoid = fixIdx(1 + yearBranchIdx);
    const gossip = fixIdx(8 + yearBranchIdx - (Math.floor(yearBranchIdx / 3) * 6));
    const dailyVirtue = fixIdx(9 + yearBranchIdx);
    const monthlyVirtue = fixIdx(5 + yearBranchIdx);

    return [
        { 'key': '咸池', 'Pos': saltyPos }, { 'key': '華蓋', 'Pos': flowerPos},
        { 'key': '破碎', 'Pos': brokenPos },
        { 'key': '天才', 'Pos': fixIdx(lifePos + yearBranchIdx) },
        { 'key': '天壽', 'Pos': fixIdx(bodyPos + yearBranchIdx) },
        { 'key': '龍池', 'Pos': dragonFountain }, { 'key': '鳳閣', 'Pos': phoenixChamber },
        { 'key': '天哭', 'Pos': heavenCry }, { 'key': '天虛', 'Pos': heavenEmpty },
        { 'key': '孤辰', 'Pos': aloneTime }, { 'key': '寡宿', 'Pos': aloneLive },
        { 'key': '紅鸞', 'Pos': lovePos }, { 'key': '天喜', 'Pos': happyPos },
        { 'key': '天空', 'Pos': heavenVoid },{'key': '蜚廉', 'Pos': gossip},
        {'key':'天德','Pos': dailyVirtue},{'key': '月德', 'Pos': monthlyVirtue}       
    ];
}

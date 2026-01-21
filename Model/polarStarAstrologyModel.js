import { solarToLunar } from "./CalendarAPI.js";
import { getDate, getFortuneDirection, getHourBranchIdx, getIsMale, getMonthStemIdx, getRealYear, getYearStemIdx } from "./eightWordsModel.js";


export function getPolarStarAstrologyGraph(){
    const date = getDate();
    const lunarDate = solarToLunar(date);
    const yearStem = getYearStemIdx(lunarDate.lunarYear);
    const lunarMonth = lunarDate.lunarMonth;
    const day = lunarDate.lunarDay;
    const hourIdx = getHourBranchIdx(date.getHours);

    const lifeStem = getLifeStem(lunarDate);//命宮天干
    const lifeBranch = getLifeBranch(lunarDate);//命宮地支

    const set = getSet(lifeStem, lifeBranch);//起局
    const polarStarPos = getPolarStarPos(set, day);//紫微定位
    const mainStars = get14MainStars(polarStarPos);//14主星
    const fourAssists = get4Assists(lunarMonth, hourIdx);//輔弼昌曲
    const starsWithBecoming = get4becoming(yearStem, mainStars, fourAssists);//四化

    const palaces = getPalaces(lifeBranch);//宮位
    const bodyPalacePos = getBodyPalace(lunarMonth,hourIdx);//身宮
    starsWithBecoming.push({'key' : '身宮', 'Pos': bodyPalacePos});

    const tenYearFortune = get10yearFortune(getIsMale(),yearStem,lifeBranch);

    const keysToPush = [palaces, tenYearFortune, starsWithBecoming];
    const result = [];
    for (let i =0; i < 12; i++){
        result.push([]);
    }
    for(let i =0; i <keysToPush.length; i++){
        result = pushKeysIntoPalaces(result, keysToPush[i]);
    }
    return result;
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

function getLifeBranch(lunarDate){//命宮地支
    const isNextMonth = lunarDate.isLeap && lunarDate.lunarDay > 15;
    const monthBranchAdj = isNextMonth? 2 : 1;
    const monthBranch = lunarDate.lunarMonth + monthBranchAdj;
    const hourBranch = getHourBranchIdx(date);//借用八字時支的公式
    return (monthBranch - hourBranch + 12) %12;
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

function get10yearFortune(isMale, yearStem, lifePalaceBranch){
    const isForward = getFortuneDirection(isMale, yearStem);
    const direction = isForward? 1 : -1; // direction 係 1 (順) 或 -1 (逆)
    let currentPos = lifePalaceBranch;
    for (let age = set; age < (set + 120); age += 10) {
        result.push({
            'key': `${age}-${age + 9}`, 
            'Pos': fixIdx(currentPos)
        });
        currentPos = fixIdx(currentPos + direction);
    }
    return result;
}
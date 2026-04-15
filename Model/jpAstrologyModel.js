import { getCurrDate, getDate } from "./astrologyGlobalVar.js";
import { getSolarTerm, solarToLunar } from "./CalendarAPI.js";
import { getDayBranchIdx, calculateEightWords } from "./eightWordsModel.js";
import { get9PalaceFlyingStarChart } from "./API4Numerology.js";

const element = [-1,4,2,0,0,2,3,3,2,1]
const branch = [[0,1],[0,2],[0,2],[1,2],
                [2,2],[2,2],[2,1],[2,0],
                [2,0],[1,0],[1,0],[0,0]];

export function getLifeStar(){
    const solarBirthday = getDate();
    const lunarBirthday = solarToLunar(solarBirthday);
    const birthYear = lunarBirthday.lunarYear;
    const start = birthYear>1999? 10 : 11;
    const remainder = (birthYear - 1) % 9 + 1
    const res = start - remainder;
    if (res > 9) res -= 9;
    return res;
}

function getDailyStar(){
    const currDate = getCurrDate();
    const currYear = currDate.getFullYear();
    const winterStart = getSolarTerm(currYear, '冬至');
    const summerStartYear = currDate > winterStart? currYear + 1 : currYear;//找出起始的夏至
    const summerStart = getSolarTerm(summerStartYear, '夏至');
    const diffDays = Math.floor((summerStart - currDate ) / (24 * 3600 * 1000));//夏至減今日,夏至前正數,反之負數
    const res = (9 - Math.abs(diffDays) % 9);
    const centralStar = res === 0 ? 9 : res;
    return get9PalaceFlyingStarChart(centralStar);
}

export function getJPAstrologyChart(){
    const lifeStar = getLifeStar();
    const lifeStarElement = element[lifeStar];
    const dailyStar = getDailyStar();

    const chart = Array.from({ length: 3 }, () => 
        Array.from({ length: 3 }, () => ({})) 
    );
    const darkSword = getDarkSword(dailyStar);
    const dayBreak = getDayBreak();
    const fire = getFireDirection(getDate());


    for (let i =0; i <chart.length; i++){
        for (let j = 0; j <chart[i].length; j++){
            const currGrid = chart[i][j];
            const currStar = dailyStar[i][j];
            const fire1 = fire.length > 0 && i == fire[0][0] && j == fire[0][1];
            const fire2 = fire.length > 1 && i == fire[1][0] && j == fire[1][1];
            const fire3 = fire.length > 2 && i == fire[2][0] && j == fire[2][1];

            currGrid.star = currStar;
            if(currStar == 5 && (i != 1 || j != 1)){
                currGrid.event = "五黃殺";
            } else if(fire1 || fire2 || fire3){
                currGrid.event = "猛火殺";
            } else if((i != 1 || j != 1) && i == darkSword[0] && j == darkSword[1]){
                currGrid.event = "暗劍殺";
            } else if(i == dayBreak[0] && j == dayBreak[1]){
                currGrid.event = "日破殺";
            } else if(currStar == lifeStar){
                currGrid.event = "本命殺";
            } else{
                const currElement = element[currStar];
                const isSameElement = currElement % 5 == lifeStarElement;
                const isSupportElement = (currElement + 1) % 5 == lifeStarElement;
                if(isSameElement || isSupportElement){
                    currGrid.event = "吉位";
                }else{
                    currGrid.event = "無";
                }
            } 
        }
    }
    return chart;
}

function getDayBreak(){
    const dayBranch = getDayBranchIdx(getDate());
    const directionToday = branch[dayBranch];
    return [2 - directionToday[0], 2 - directionToday[1]];
}

function getDarkSword(dailyStar){
    for (let i =0; i <dailyStar.length; i++){
        for (let j = 0; j <dailyStar[i].length; j++){
            const currStar = dailyStar[i][j];
            if(currStar == 5){
                return[2-i,2-j];
            } 
        }
    }
}
function getFireDirection(date){
    const eightWord = calculateEightWords(date);
    const yearBranch = eightWord[1][3];
    const monthBranch = eightWord[1][2];
    const dayBranch = eightWord[1][1];
    const element = [yearBranch, monthBranch, dayBranch];
    const threeMix = [2,7,10];
    const threeMatch = [6,7,8];

    const missingBranch = checkThreeMix(threeMix, element);
    const missingBranch2 = checkThreeMix(threeMatch, element);
    const finalMissing = [...new Set([...missingBranch, ...missingBranch2])].sort((a, b) => a - b);
    const result = [];
    for (const i of finalMissing) {
        result.push(branch[i]);
    }
    return result;
}
function checkThreeMix(threeMix, element) {
    let found = [];
    let i = 0; // threeMix 的指針
    let j = 0; // element 的指針

    // 雙指針比對，直到其中一邊到盡頭
    while (i < threeMix.length && j < element.length) {
        if (threeMix[i] === element[j]) {
            found.push(threeMix[i]);
            i++;
            j++;
        } else if (threeMix[i] < element[j]) {
            // threeMix 數字太小，往後找
            i++;
        } else {
            // element 數字太小，往後找
            j++;
        }
    }
    // 1. 若全中 (3個)，回傳原本的 threeMix
    if (found.length === threeMix.length) {
        return threeMix;
    }
    // 2. 若缺一 (中2個)，找出缺的那一個並回傳 [missing]
    if (found.length === threeMix.length - 1) {
        // 從 threeMix 篩選出不在 found 裡的數字
        let missing = threeMix.find(x => !found.includes(x));
        return [missing];
    }
    // 3. 否則 (缺2個或以上)，回傳空陣列
    return [];
}
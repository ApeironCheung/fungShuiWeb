import { getDate } from "./astrologyGlobalVar.js";
import { solarToLunar } from "./CalendarAPI.js";


const yearWeights = [ 1.2, 0.9, 0.6, 0.7, 1.2, 0.5, 0.9, 0.8, 0.7, 0.8, 1.5, 0.9,
     1.6, 0.8, 0.8, 1.9, 1.2, 0.6, 0.8, 0.7, 0.5, 1.5, 0.6, 1.6,
     1.5, 0.7, 0.9, 1.2, 1.0, 0.7, 1.5, 0.6, 0.5, 1.4, 1.4, 0.9,
     0.7, 0.7, 0.9, 1.2, 0.8, 0.7, 1.3, 0.5, 1.9, 0.6, 0.8, 1.6,
     1.0, 0.7, 1.2, 0.9, 0.6, 0.7, 1.2, 0.5, 0.9, 0.8, 0.7, 0.8
];
const monthsWeights = [0, 0.6, 0.7, 1.8, 0.9, 0.5, 1.6, 0.9, 1.5, 1.8, 0.8, 0.9, 0.5]
const dayWeights = [
    0.0, 
    0.5, 1.0, 0.8, 1.5, 1.6, 1.5, 0.8, 1.6, 0.8, 1.6, // 初一至初十
    0.9, 1.7, 0.8, 1.7, 1.0, 0.8, 0.9, 1.8, 0.5, 1.5, // 十一至二十
    1.0, 0.9, 0.8, 0.9, 1.5, 1.8, 0.7, 0.8, 1.6, 0.6  // 廿一至三十
];
const hourWeight = [1.6, 0.6, 0.7, 1.0, 0.9, 1.6, 1.0, 0.8, 0.8, 0.9, 1.5, 0.6]

function calBoneWeight(year, month, day, hour){
    const offset = -1864;
    const yearIdx = (year+ offset) % 60;
    const total = yearWeights[yearIdx] + monthsWeights[month] + dayWeights[day] + hourWeight[hour];   
    return parseFloat(total.toFixed(1));
}

export function getBoneWeight(){
    const date = getDate();//from astrologyGlobalVar.js
    const lunarDate = solarToLunar(date);//fromCalendarAPI.js
    const year = lunarDate.lunarYear;
    const month = lunarDate.lunarMonth;
    const day = lunarDate.lunarDay;
    const hour = Math.floor(((date.getHours() + 1) % 24) / 2);
    return calBoneWeight(year,month,day,hour);
}


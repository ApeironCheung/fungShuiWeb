//calenderModel.js
import { solarToLunar,
    getNextLunarMonthInfo, 
    getSolarTerm,
    lunarToSolar
} from "./CalendarAPI.js";

const today = new Date();
today.setHours(0,0,0,0);
let year = today.getFullYear();
let month = today.getMonth();

export function getCalenderYear(){
    return year;
}
export function getCalenderMonth(){
    return month;
}
export function setCalenderYear(input){
    if(input != null && input > 1901 && input <2099 && input != year){
        year = input;
    }
}

export function setCalenderMonth(input){
    if(input != null && input >= 0 && input <12 && input != month){
        month = input;
    }
}

const FESTIVAL = {
    "0101": "農曆新年",
    "0107": "人日",
    "0109": "玉帝誕",        // 玉皇大帝
    "0115": "上元節",
    "0120": "張三豐誕",
    "0126": "觀音開庫",
    "0202": "車公誕",      // 亦有正月初二之說，但民間多慶祝二月初二
    "0203": "文昌誕",
    "0215": "老君誕",        // 即老子，也是道教三清之道德天尊
    "0219": "觀音誕",        // 觀音出生
    "0303": "北帝誕",
    "0315": "趙公明誕",
    "0323": "天后誕",        // 媽祖
    "0328": "岳王誕",        // 岳飛
    "0408": "佛誕",      // 佛誕
    "0414": "呂祖誕",      // 呂祖
    "0417": "十殿閰君誕",
    "0505": "端午節",
    "0511": "城隍誕",
    "0518": "張天師誕",
    "0606": "天貺節",
    "0615": "王靈官誕",      // 道教第一護法
    "0619": "觀音成道日",
    "0623": "火神誕",
    "0624": "關帝誕",        // 民間最通用之關帝誕
    "0701": "鬼門關開",
    "0707": "七姐誕",
    "0715": "中元節",
    "0723": "織女誕",
    "0815": "中秋節",        // 中秋節亦為月老誕
    "0823": "黃大仙誕",
    "0827": "孔子誕",        // 孔丘
    "0901": "斗姆誕",    // 九月初一至初九為九皇大帝/斗姆誕
    "0909": "重陽節",
    "0919": "觀音出家日",
    "1015": "下元節",
    "1111": "太乙救苦天尊聖誕",
    "1117": "彌陀誕",
    "1208": "臘八節"
};

// 24節氣按公曆月份排列（每個月固定兩個）
const MONTH_TERMS = [
    ["小寒", "大寒"], ["立春", "雨水"], ["驚蟄", "春分"], // 1, 2, 3月
    ["清明", "穀雨"], ["立夏", "小滿"], ["芒種", "夏至"], // 4, 5, 6月
    ["小暑", "大暑"], ["立秋", "處暑"], ["白露", "秋分"], // 7, 8, 9月
    ["寒露", "霜降"], ["立冬", "小雪"], ["大雪", "冬至"]  // 10, 11, 12月
];
export function getUpcomingEvents(startDate = new Date(), daysToQuery = 14) {
    const result = [];
    const currDate = new Date(startDate);
    currDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < daysToQuery; i++) {
        const d = new Date(currDate);
        d.setDate(currDate.getDate() + i);
        
        const y = d.getFullYear();
        const m = d.getMonth();
        const dateNum = d.getDate();

        const lunar = solarToLunar(d);
        const curLMonth = lunar.lunarMonth;
        const curLDay = lunar.lunarDay;
        const isLeap = lunar.isLeap;

        const mmdd = curLMonth.toString().padStart(2, '0') + curLDay.toString().padStart(2, '0');
        
        let eventName = "";

        // 3. 節日判斷
        if (!isLeap && FESTIVAL[mmdd]) {
            eventName = FESTIVAL[mmdd];
        } else {
            const terms = MONTH_TERMS[m];
            let foundTerm = null;
            for (const tName of terms) {
                const tDate = getSolarTerm(y, tName);
                // 確保節氣日期比較也是基於當天
                if (tDate.getDate() === dateNum && tDate.getMonth() === m) {
                    foundTerm = tName;
                    break;
                }
            }

            if (foundTerm) {
                eventName = foundTerm;
            } else if (curLDay === 1) {
                // 如果是閏月，初一顯示「閏X月」
                eventName = isLeap ? `閏${curLMonth}月` : "初一";
            } else if (curLDay === 15) {
                eventName = "十五";
            }
        }

        result.push(eventName);
    }

    return result;
}

export function eventInYear(year) {
  let events = [];
  for (const mmdd in FESTIVAL) {
    const name = FESTIVAL[mmdd];    
    const lMonth = parseInt(mmdd.substring(0, 2));
    const lDay = parseInt(mmdd.substring(2, 4));
    const sDate = lunarToSolar(year, lMonth, lDay);
    const y = sDate.getFullYear();
    const m = (sDate.getMonth() + 1).toString().padStart(2, '0');
    const d = sDate.getDate().toString().padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    events.push([name, `${dateStr}`]);
  }
  return events.sort((a, b) => a[1].localeCompare(b[1]));
}

export function TermsInYear(year){
    let result = [];
    const terms = MONTH_TERMS.flat();
    for (let i =0; i<terms.length; i++){
        const sDate = getSolarTerm(year, terms[i]);
        const y = sDate.getFullYear();
        const m = (sDate.getMonth() + 1).toString().padStart(2, '0');
        const d = sDate.getDate().toString().padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;

        result.push([terms[i], dateStr]);
    }
    return result;
}
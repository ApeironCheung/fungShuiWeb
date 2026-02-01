import { solarToLunar } from "./CalendarAPI.js";

let date = new Date();
date.setHours(0,0,0,0);
let isMale = true;

export function getLunarDate(){return solarToLunar(date)};
export function getDate(){ return date;}
export function setDate(inputDate){
    const year = inputDate.getFullYear();
    if(year>1900 && year<2100){
        date.setFullYear(year);
        date.setMonth(inputDate.getMonth());
        date.setDate(inputDate.getDate())};
}
export function getIsMale(){return isMale;}
export function setIsMale(bool){isMale = bool;}

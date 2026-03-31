import { solarToLunar } from "./CalendarAPI.js";

let date = new Date();
date.setHours(0,0,0,0);
let isMale = true;
let currDate = new Date();

export function getLunarDate(){return solarToLunar(date)};
export function getDate(){ return date;}
export function setDate(inputDate){
    const year = inputDate.getFullYear();
    if(year>1900 && year<2100){
        date.setFullYear(year);
        date.setMonth(inputDate.getMonth());
        date.setDate(inputDate.getDate());
        date.setHours(inputDate.getHours());
        date.setMinutes(inputDate.getMinutes());
    };
}
export function getIsMale(){return isMale;}
export function setIsMale(bool){isMale = bool;}
export function getCurrDate(){ return currDate;}
export function setCurrDate(inputDate){
    const year = inputDate.getFullYear();
    if(year>1900 && year<2100){
        currDate.setFullYear(year);
        currDate.setMonth(inputDate.getMonth());
        currDate.setDate(inputDate.getDate());
        currDate.setHours(inputDate.getHours());
        currDate.setMinutes(inputDate.getMinutes());
    };
}
import {
    getUpcomingEvents, 
    getCalenderMonth, 
    getCalenderYear, 
    eventInYear,
    TermsInYear} from '../modelAPI.js';
import { getText } from '../DataAPI.js';

const UI = getText("CALENDAR_I18N");
const weekdays = UI["weekdays"];

/**
 * 獲取月曆渲染的起始日期 (該月 1 號之前的週日)
 */
function getCalendarStartDate(year, month) {
    // 取得該月 1 號
    let firstDay = new Date(year, month, 1);//一月是0
    // 取得 1 號是星期幾 (0 是週日, 1 是週一...)
    let dayOfWeek = firstDay.getDay(); 
    
    // 將日期往前推到週日
    let startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - dayOfWeek);
    
    return startDate;
}

function getTotalCells(year, month) {
    const firstDayOfWeek = new Date(year, month, 1).getDay();//星期日0,星期六6
    const daysInMonth = new Date(year, month, 0).getDate();    
    const totalNeeded = firstDayOfWeek + daysInMonth;   
    return Math.ceil(totalNeeded / 7) * 7;
}

export function createHeaderCalendar(){
    const id = 'eventList';
    return `<style>${getCalendarStyles(id)}</style>
    <div id = ${id}>${refreshHeaderCalendar()}</div>`;
}

function refreshHeaderCalendar(){
 const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    return renderFlexibleCalendar(year,month,day,14);
}

export function updateHeaderCalendar(){
     const element = document.getElementById("eventList"); 
     const newHtml = refreshHeaderCalendar();//新html
     element.innerHTML = newHtml;//replace
}

export function createDetailCalender(){
    return `<div id = ${'calendarDisplay'}>${refreshDetailCalender()}</div>`;
}

export function refreshDetailCalender(){
    const year = getCalenderYear();
    const month = getCalenderMonth();
    const daysToQuery = getTotalCells(year,month);
    const innerId = 'calendarDisplay-inner';
    let html = "";
    weekdays.forEach(day => {
    html += `<div class="cell header" style="min-height:20px; font-weight:bold;">${day}</div>`;
    });
    return `<style>${getCalendarStyles(innerId)}</style>
    <h2>${year} - ${month+1}</h2>
    <div id = ${innerId}>
    ${html}
    ${renderFlexibleCalendar(year,month,0,daysToQuery)}</div>`;
}

function renderFlexibleCalendar(year, month, day= 0, daysToQuery = 35) {
    var startDate;
    if(day == 0 && daysToQuery >14){
        startDate = getCalendarStartDate(year, month);    
    }else{
        startDate = new Date(year, month, day);
    }

    const eventList = getUpcomingEvents(startDate, daysToQuery);
    const languageData = getText("CALENDAR_I18N");

    let html = "";

    for (let i = 0; i < daysToQuery; i++) {
        let cur = new Date(startDate);
        cur.setDate(startDate.getDate() + i);
        
        const dateNum = cur.getDate();
        const eventKey = eventList[i];
        const eventName = languageData[eventKey]; 
        
        // 判斷 Class：是否有事件 (active)，是否非本月 (other-month)
        const activeClass = eventName ? "active" : "";
        const monthClass = cur.getMonth() !== month ? "other-month" : "";

        html += `<div class="cell ${activeClass} ${monthClass}">
                    ${dateNum}${eventName ? `<br>${eventName}` : ""}
                 </div>`;
    }
    
    return html;
}
export function getCalendarStyles(id) {
    return `
        #${id} {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 2px;
            background-color: #eee;
            padding: 5px;
            font-family: sans-serif;
        }
        #${id} .cell {
            background-color: #fff;
            min-height: 60px;
            padding: 5px;
            font-size: 12px;
            border: 1px solid #fafafa;
        }
        #${id} .cell.active {
            background-color: #fff5f5;
            color: #d32f2f;
            font-weight: bold;
        }
        #${id} .other-month {
            color: #ccc;
        }
    `;
}

export function createCalendarControl(){
    return `<div id = "calendarCtrl">
    ${createCalendarYearMenu()} 
    ${createCalendarMonthMenu()}
    ${createCalendarSubmitButton()}
    </div>`;
}

function createCalendarYearMenu(){
    let html = "";
    const currentYear = new Date().getFullYear();
    for (let i =1901;i<2100; i++){
        const isSelected = (i === currentYear) ? "selected" : "";
        html += `<option value="${i}" ${isSelected}>${i}</option>`;
    }
    return `<select id= "btn-calendarYear">${html}</select>`;    
}

function createCalendarMonthMenu(){
    let html = "";
    for (let i =0;i<12; i++){
        html += `<option value="${i}">${i+1}</option>`;
    }
    return `<select id= "btn-calendarMonth">${html}</select>`;    
}

function createCalendarSubmitButton(){
    return `<button id = "calendarSubmit">submit</button>`;
}

export function createCalendarSideBar(){
    return `<div id = calendarSideBar>${refreshCalendarSideBar()}</div>`;
}

export function refreshCalendarSideBar(){
    const languageData = getText("CALENDAR_I18N");
    const UI = languageData["sidebar"];
    const year = getCalenderYear();
    const event = eventInYear(year);
    const terms = TermsInYear(year);

    let html = `<div style="font-size: 14px; text-align: right; padding-right: 10px;">
    <div><h2>${year}${UI[0]}</h2>`;
    for (let i =0; i < event.length; i ++){
        const name = languageData[event[i][0]] || event[i][0];
        const date = event[i][1];
        html += `<div>${name}: ${date}</div>`;
    }
    html += `</div><br>
    <div><h2>${year}${UI[1]}</h2>`;
    for (let i =0; i < terms.length; i ++){
        const name = languageData[terms[i][0]] || terms[i][0];
        const date = terms[i][1]
        html += `<div>${name}: ${date}</div>`;
    }
    return html + '</div></div>';
}
import { setCalenderMonth, setCalenderYear } from "../modelAPI.js";
import { updateSubscription } from "../viewAPI.js";
import { attachListener } from "./attachListener.js";

function updateDisplayCalendar(){
    const year = document.getElementById("btn-calendarYear")?.value;
    const month = document.getElementById("btn-calendarMonth")?.value;
    setCalenderYear(parseInt(year));
    setCalenderMonth(parseInt(month));
    updateSubscription("REFRESH_CALENDAR");
}

export function attachCalenderListener(){
    attachListener("calendarSubmit",updateDisplayCalendar, 'click');
}
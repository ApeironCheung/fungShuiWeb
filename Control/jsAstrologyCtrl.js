//oracleCtrl.js

import { setDate } from "../modelAPI.js";
import { updateSubscription } from "../View/render.js";
import { attachListener } from "./attachListener.js";

export function attachJPAstrologyListeners(){
    const id = 'birthdaySubmit';
    attachListener(id,birthYearSelected, 'click');
}

function birthYearSelected(){
    const birthTime = document.getElementById("birth-time")?.value;
    setDate(new Date(birthTime));
    updateSubscription('RE_JP_ASTRO')//call refreshFlyingStarChart();
}

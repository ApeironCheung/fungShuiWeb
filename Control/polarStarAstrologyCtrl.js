import { attachListener } from "./attachListener.js";

export function attach8WordListeners(){
    const id = 'birthdaySubmit';
    attachListener(id,queryCalculation, 'click');
}

function queryCalculation(){
    const birthTime = document.getElementById("birth-time")?.value;
    setDate(new Date(birthTime));
    updateSubscription('polarStarAstroUpdate');
}
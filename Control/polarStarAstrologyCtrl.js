import { attachListener } from "./attachListener.js";
import { getIsMale, setDate, setIsMale } from "../modelAPI.js";
import { updateSubscription } from "../viewAPI.js";

export function attachPolarStarListeners(){
    const id = 'birthdaySubmit';
    attachListener(id,queryCalculation, 'click');
}

function queryCalculation(){
    const birthTime = document.getElementById("birth-time")?.value;
    const isMale = document.getElementById("gender-select")?.value;
    setDate(new Date(birthTime));
    setIsMale(isMale);
    updateSubscription('polarStarAstroUpdate');
}
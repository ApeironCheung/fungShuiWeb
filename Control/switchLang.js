import { getFunction, setLanguage } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";


export function switchLang(lang){
    setLanguage(lang);
    let funt = getFunction();
    updateSubscription(funt);
}
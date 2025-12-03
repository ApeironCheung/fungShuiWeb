import { getFunction, setLanguage } from "../globalState.js";
import { updateSubscription } from "../viewAPI.js";


export function switchLang(lang){
    setLanguage(lang);
    let funt = getFunction();
    updateSubscription(funt);
}
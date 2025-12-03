import { getFunction, setLanguage } from "../globalState";
import { updateSubscription } from "../viewAPI";


export function switchLang(lang){
    setLanguage(lang);
    let funt = getFunction();
    updateSubscription(funt);
}
import { getFunction,setFunction } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";

export function switchFunt(funt){
    let curr = getFunction();
    if(funt == curr){
        return;
    }else{
        setFunction(funt);
    }
    updateSubscription(funt);
}
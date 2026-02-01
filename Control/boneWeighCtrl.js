import { attachListener } from "./attachListener.js";
import { setDate } from "../modelAPI.js";
import { updateSubscription } from "../viewAPI.js";

export function attachBoneWeighListeners(){
    const id = 'birthdaySubmit';
    attachListener(id, queryCalculation, 'click');
}

function queryCalculation(){
    const birthTime = document.getElementById("birth-time")?.value;
    setDate(new Date(birthTime));
    updateSubscription('boneWeightUpdate');
}
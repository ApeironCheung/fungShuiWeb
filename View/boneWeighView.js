import { getText } from "../DataAPI.js";
import { getBoneWeight } from "../modelAPI.js";
import { birthdaySelector, submitButton } from "./astrologyCtrlUI.js";

export function createBoneWeighDisplay(){
    const id = 'boneWeighDisplay';
    return `<div id = ${id}>
    <p>袁天罡秤骨歌</p><br>
    ${refreshBoneWeighDisplay()}</div>`;
}

export function refreshBoneWeighDisplay(){
    const UI = getText('BONE_SONG');
    const weight = getBoneWeight();
    const MIN_WEIGHT = 2.2;
    const idx = Math.round(weight - MIN_WEIGHT)* 10;
    return `<div>${UI[idx]}</div>`;
}

export function boneWeighBirthdaySelector(){
    const birthday = birthdaySelector();
    const submit = submitButton();
    return `
    <div class="selector-container" style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 15px; align-items: center; justify-content: center;">
        ${birthday}
        ${submit}
    </div>
    `;
}

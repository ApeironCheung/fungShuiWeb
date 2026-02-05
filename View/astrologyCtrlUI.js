import { getText } from "../DataAPI.js";

export function birthdaySelector(){
    const UI = getText('EIGHT_WORDS_UI');
    return `
        <div style="display: flex; align-items: center; gap: 5px;">
            <label for="birth-time">${UI[0]}</label>
            <input type="datetime-local" 
                id="birth-time" 
                min="1900-01-01T00:00" 
                max="2099-12-31T23:59">
        </div>
    `;
}

export function genderSelector(){
    const UI = getText('EIGHT_WORDS_UI');
    return `        <div style="display: flex; align-items: center; gap: 5px;">
        <label for="gender-select">${UI[1]}</label>
        <select id="gender-select">
            <option value="true">${UI[2]}</option>
            <option value="false">${UI[3]}</option>
        </select>
        </div>`
}

export function submitButton(){
    const UI = getText('EIGHT_WORDS_UI');
    return `<button id="birthdaySubmit">${UI[4]}</button>`;
}

export function periodSelector(){
    const period = ['全局','大運','流年','流月','流日'];
    const UI = getText('ASTROLOGY_PERIOD');//要轉返做getText
    const id = 'periodSelector';
    return createSelector(period, UI, id)
}

function createSelector(key, UI, id){
    let html = `<select id = ${id}>`;    
        for (let i = 0; i < data.length; i++) {
            html += `<option value="${key[i]}">${UI[i]}</option>`;
        }
    return html + '</select>';
}

export function createCalculatorSelector(){    
    const key = ['八字算命','紫微斗數','天罡秤骨','奇門遁甲','河洛理數'];
    const UI = getText("ASTROLOGY_SELECTOR_UI");
    let html = '<select id = calculatorSelector>';    
        for (let i = 0; i < data.length; i++) {
            html += `<option value="${key[i]}">${UI[i]}</option>`;
        }
    return html + '</select>';
}
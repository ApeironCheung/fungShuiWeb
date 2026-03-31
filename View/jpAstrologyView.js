import { getText } from "../DataAPI.js";
import { getJPAstrologyChart } from "../Model/jpAstrologyModel.js";
import { birthdaySelector, submitButton } from "./astrologyCtrlUI.js";

export function createJPFlyingStarChart(){
    const id = "KYUSEI_KIGAKU";
    return `<div id = ${id}> ${refreshJPFlyingStarChart()}</div>`;
}

export function refreshJPFlyingStarChart() {
    // 飛星名稱
const starNames = getText('STAR_NAMES');
const Ki = getText('KYUSEI_KIGAKU');
const directions = getText('DIRECTIONS');
const title = getText('KYUSEI_KIGAKU_UI')[0];
const chart = getJPAstrologyChart();

    // 1. 生成標題
    let htmlString = `<h2 id="chart-title">${title} </h2>`;

    // 2. 生成表格 
    htmlString += '<div class="chart-grid">'; 
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const star = chart[i][j]['star'];
            const starDescription = starNames[star];
            const dirLabel = directions[i][j];
            const event = chart[i][j].event || '';
            htmlString += `
                <div class="palace s${star}">
                    <p style="font-size: 1.2em; line-height: 1.2; margin-top: 10px;">${starDescription}</p>
                    ${Ki[event]}
                    ${dirLabel}
                </div>
            `;
        }
    }
    
    htmlString += '</div>'; 

    return htmlString;
}

export function jpBirthdaySelector(){
    const birthday = birthdaySelector();
    const submit = submitButton();
    return `
    <div class="selector-container" style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 15px; align-items: center; justify-content: center;">
        ${birthday}
        ${submit}
    </div>
    `;
}
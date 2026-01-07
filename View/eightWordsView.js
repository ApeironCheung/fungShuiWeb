import { getText } from "../DataAPI.js"
import { calculate5elementStrength, getSixPillars } from "../Model/eightWordsModel.js";
import { getCalendarStyles } from "./calenderView.js";

const fiveElementCSS = `
    .wood { background: linear-gradient(180deg, #2ecc71, #27ae60); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
    .fire { background: linear-gradient(180deg, #e74c3c, #c0392b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
    .earth { background: linear-gradient(180deg, #a67c52, #8d6e63); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
    .metal { background: linear-gradient(180deg, #f1c40f, #f39c12); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
    .water { background: linear-gradient(180deg, #3498db, #2980b9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold; }
    
    /* 白色框容器樣式 */
    .pillars-white-box {
        background-color: #f0f0f0; /* 淺灰色/白色背景 */
        padding: 15px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        min-height: 100px;
    }
`;

const fiveElement_STYLE = {
    "木": { main: "#2ecc71" },
    "火": { main: "#e74c3c" },
    "土": { main: "#a67c52" },
    "金": { main: "#f1c40f" },
    "水": { main: "#3498db" }
};

function stemAndBranchesText(){
    const stemsText = getText("HEAVENLY_STEMS");
    const branchText = getText("EARTH_BRANCHES");
    let stems = [];
    for(let i=0; i<stemsText.length; i++){
        var element;
        if(i<2){element = "wood"}
        else if(i<4){element = "fire"}
        else if(i<6){element = "earth"}
        else if(i<8){element = "metal"}
        else {element = "water"}
        stems.push(warpWord(element, stemsText[i]))
    }
    let branch = [];
    for(let i=0; i<branchText.length; i++){
        var element; 
        if(i>1 && i<4){element = "wood"}
        else if(i>4 && i<7){element = "fire"}
        else if(i==0 || i==11){element = "water"}
        else if(i>7&&i<10){element = "metal"}
        else {element = "earth"}
        branch.push(warpWord(element, branchText[i]))
    }
    return [stems,branch];
}
function warpWord(className, word){
    return `<span class="${className}" style="display: inline-block;">${word}</span>`;
}

export function create6PillarsView(){
    const id = "sixPillars";
    return` <style>${getCalendarStyles(id)}</style>
    <style>${fiveElementCSS}</style>
    <div id=${id}>${refresh6PillarsView()}</div>`;
}
export function refresh6PillarsView() {
    const sixPillars = getSixPillars(); 
    const text = stemAndBranchesText(); 
    const des = getText('SIX_PILLAR');   
    
    let html = `
    <div class="pillars-white-box">
        <div class="six-pillars-container" style="display: flex; justify-content: space-around; align-items: flex-start; width: 100%;">`;
    
    for (let j = 0; j < des.length; j++) {
        html += `<div class="pillar-column" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">`;
        html += `<div class="pillar-label" style="font-size: 13px; color: #333; margin-bottom: 5px;">${des[j]}</div>`;
        html += `<div style="font-size: 24px;">${text[0][sixPillars[0][j]]}</div>`; // 天干
        html += `<div style="font-size: 24px;">${text[1][sixPillars[1][j]]}</div>`; // 地支
        html += `</div>`;
    }

    html += '</div></div>';
    return html;
}

export function createAstrologySidebar(){
    return `<div id=astrologySidebar>${refreshAstrologySidebar()}</div>`
}
export function refreshAstrologySidebar(){
    return create5elementChartHTML();
}

function create5elementChartHTML(){
    return `<div id = elementChart>${refresh5elementChartHTML()}</div>`;
}

function refresh5elementChartHTML() {
    const sixPillars = getSixPillars()
    const strength = calculate5elementStrength(sixPillars); // 執行函式
    const percentages = strength.percentages;
    const order = ["木", "火", "土", "金", "水"];
    
    let segments = [];
    let currentDegree = 0;

    order.forEach(key => {
        const percent = parseFloat(percentages[key]);
        if (percent > 0) {
            const nextDegree = currentDegree + (percent * 3.6);
            // 從查找表拿顏色
            const color = fiveElement_STYLE[key].main;
            segments.push(`${color} ${currentDegree}deg ${nextDegree}deg`);
            currentDegree = nextDegree;
        }
    });

    const conic = segments.length ? `conic-gradient(${segments.join(', ')})` : '#eee';

    return `
        <div style="display: flex; align-items: center; gap: 20px; padding: 20px;">
            <div style="width: 150px; height: 150px; border-radius: 50%; background: ${conic}; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"></div>
            <div>
                ${order.map(key => `
                    <div style="margin-bottom: 5px;">
                        <span style="color: ${fiveElement_STYLE[key].main}">●</span> ${key}: ${percentages[key]}%
                    </div>
                `).join('')}
            </div>
        </div>`;
}

export function createBirthdaySelector(){
    const UI = getText('EIGHT_WORDS_UI');
    return `
    <div class="selector-container">
        <label for="birth-time">${UI[0]}</label>
        <input type="datetime-local" 
               id="birth-time" 
               min="1900-01-01T00:00" 
               max="2099-12-31T23:59">
        
        <label for="gender-select">${UI[1]}</label>
        <select id="gender-select">
            <option value="true">${UI[2]}</option>
            <option value="false">${UI[3]}</option>
        </select>
        
        <button id="birthdaySubmit">${UI[4]}</button>
    </div>
    `;
}
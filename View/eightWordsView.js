import { getText } from "../DataAPI.js"
import { getLanguage } from "../managmentAPI.js";
import { calculate5elementStrength, get8pillars10Gods, getDate, getEightPillars, getEightWords, getPillarsTenGods, getSixPillars } from "../Model/eightWordsModel.js";
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
    const tenGods = getPillarsTenGods();
    const des = getText('SIX_PILLAR');   
    return refreshPillarsView(sixPillars,tenGods, des);
}
export function create8PillarsView(){
    const id = "eightPillars";
    return` <style>${getCalendarStyles(id)}</style>
    <style>${fiveElementCSS}</style>
    <div id=${id}>${refresh8PillarsView()}</div>`;
}
export function refresh8PillarsView() {
    const eightPillars = getEightPillars(); 
    const tenGods = get8pillars10Gods();
    const des = getText('EIGHT_PILLAR');   
    return refreshPillarsView(eightPillars,tenGods, des);
}
export function refreshPillarsView(pillars, gods, des) {
    const text = stemAndBranchesText(); 
    const gText = getText('TEN_GODS');//十神 中英文字
    const dayMaster = getText('EIGHT_WORDS_UI')[5];
    
    const language = getLanguage(); 
    const bigWordSize = language == 'ZH' ? 30 : 
                        language == 'EN' ? 14 : 14;

    const columnStyle = "display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 60px;";
    const tenGodStyle = "font-size: 10px; color: #999; min-height: 24px; line-height: 1.1; text-align: center; white-space: normal; word-break: break-word;";
    const labelStyle  = "font-size: 13px; color: #333; margin: 2px 0; font-weight: bold;";
    const bigWordStyle = `font-size: ${bigWordSize}px; line-height: 1.1;`;

    let html = `
    <div class="pillars-white-box">
        <div class="six-pillars-container" style="display: flex; justify-content: space-around; align-items: flex-start; width: 100%;">`;
    
    for (let j = 0; j < des.length; j++) {
        const topTenGod = (j === 1) ? dayMaster : gText[gods[0][j]];
        html += `<div class="pillar-column" style="${columnStyle}">`;
        html += `<div class="pillar-label" style="${labelStyle}">${des[j]}</div>`;
        html += `<div class="ten-god" style="${tenGodStyle}">${topTenGod}</div>`;
        html += `<div style="${bigWordStyle}">${text[0][pillars[0][j]]}</div>`; // 天干
        html += `<div style="${bigWordStyle}">${text[1][pillars[1][j]]}</div>`; // 地支
        const botTenGod = gText[gods[1][j]];
        html += `<div class="ten-god" style="${tenGodStyle}">${botTenGod}</div>`;
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
    const UI = getText('EIGHT_WORDS_CHART_UI');
    let html = '';
    html += UI[5] + ':<br>'+ renderChartHTML(getEightWords(getDate()));
    html += UI[6] + ':<br>'+ renderChartHTML(getSixPillars());
    html += UI[7] + ':<br>'+ renderChartHTML(getEightPillars());
    return html;
}

function renderChartHTML(pillars) {
    const strength = calculate5elementStrength(pillars); // 執行函式
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
    const UI = getText('EIGHT_WORDS_CHART_UI');
    const fiveElement_UI = {'木': UI[0],'火':UI[1],'土':UI[2],'金':UI[3],'水':UI[4]};

    return `
        <div style="display: flex; align-items: center; gap: 20px; padding: 20px;">
            <div style="width: 150px; height: 150px; border-radius: 50%; background: ${conic}; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"></div>
            <div>
                ${order.map(key => `
                    <div style="margin-bottom: 5px;">
                        <span style="color: ${fiveElement_STYLE[key].main}">●</span> ${fiveElement_UI[key]}: ${percentages[key]}%
                    </div>
                `).join('')}
            </div>
        </div>`;
}

export function createBirthdaySelector(){
    const UI = getText('EIGHT_WORDS_UI');
    return `
    <div class="selector-container" style="margin-top: 30px; display: flex; flex-wrap: wrap; gap: 15px; align-items: center; justify-content: center;">
        <div style="display: flex; align-items: center; gap: 5px;">
            <label for="birth-time">${UI[0]}</label>
            <input type="datetime-local" 
                id="birth-time" 
                min="1900-01-01T00:00" 
                max="2099-12-31T23:59">
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
        <label for="gender-select">${UI[1]}</label>
        <select id="gender-select">
            <option value="true">${UI[2]}</option>
            <option value="false">${UI[3]}</option>
        </select>
        </div>
        <button id="birthdaySubmit">${UI[4]}</button>
    </div>
    `;
}
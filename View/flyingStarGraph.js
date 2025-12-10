import { 
    getFlyingStarChart,
    getCurrYear 
} from '../modelAPI.js';

import { getIsNextYear, getIsSecretMode } from '../ctrlAPI.js';

import { 
    getText
} from '../DataAPI.js';

// 核心生成 HTML 函數
function getTable(year) {
    // 飛星名稱
const starNames = getText('STAR_NAMES');
const directions = getText('DIRECTIONS');
    // 防呆機制：如果 year 是 undefined，默認用今年
    if (!year) year = getCurrYear();

    const chart = getFlyingStarChart(year);
    let htmlString = '';

    // 1. 生成標題
    const UX_WORD = getText("UX_WORD"); 
    htmlString += `<h2 id="chart-title">${year} ${UX_WORD[1]} </h2>`;

    // 2. 生成表格 (注意：這裡不需要 id="chart-output"，因為外層已有 container)
    htmlString += '<div class="chart-grid">'; 
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const star = chart[i][j];
            const starDescription = starNames[star];
            const dirLabel = directions[i][j];
            // 圖片路徑假設
           /* const starImgHtml = `
                <img src="${star}.jpg" 
                     onerror="this.outerHTML='<span class=\\'star\\'>${star}</span>'" 
                     alt="星號 ${star}" 
                     style="width: 50px; height: 50px; display: block; margin: 0 auto;">
            `;*/

            htmlString += `
                <div class="palace s${star}">
                    <p style="font-size: 1.2em; line-height: 1.2; margin-top: 10px;">${starDescription}</p>
                    ${dirLabel}
                </div>
            `;
        }
    }
    
    htmlString += '</div>'; 

    return htmlString;
}

//根據當前狀態變數生成 HTML
export function getFlyingStarChartHtml() {
    let year = getCurrYear();
    return getTable(year); 
}

// --- HTML 生成函數 (移除 onclick) ---

function _createYearSelect(start, length, currentYear) {
    let html = '<select id="yearSelect">';
    const end = start + length;
    for (let i = start; i < end; i++) {
        const selected = (i === currentYear) ? 'selected' : '';
        html += `<option value="${i}" ${selected}>${i}</option>`;
    }
    return html + '</select>';
}

function createYearButton(){
    const yearBtn = getText("YEAR_BUTTON")
    const isNextYear = getIsNextYear();
    const buttonLabel = isNextYear ? yearBtn[0] : yearBtn[1]; 
    const style = (getIsSecretMode()) ? "background-color: purple; color: white;" : "";
    const UX_WORD = getText("UX_WORD");
    // 🌟 修正：移除 onclick，使用 id="btn-toggle-year"
    return `
        <div style="text-align:center; margin-top:10px;">
            <p style="margin-bottom:5px;">${isNextYear ? UX_WORD[3] : UX_WORD[2]} ${isNextYear ? yearBtn[0] : yearBtn[1]} ${UX_WORD[4]}:</p>
            <button type="button" 
                    id="btn-toggle-year" 
                    style="padding: 8px 16px; font-size: 16px; cursor: pointer; ${style}">
                ${buttonLabel}
            </button>
        </div>
    `;
}

function createYearMenu() {
    const thisYear = getCurrYear();
    const fiftyYearAgo = thisYear - 50;
    
    return `
        <div style="text-align:center; margin-top:10px;">
            <p>管理員模式：選擇年份</p>
            ${_createYearSelect(fiftyYearAgo, 101, thisYear)}
            <button type="button" id="btn-submit-year">確認年份</button>
        </div>
    `;
}

export function createControlHtml() {
    if (getIsSecretMode()) {
        return createYearMenu(); 
    } else {
        return createYearButton(); 
    }
}

// controlYear.js
import { 
    setFlyingStarGraphYear, updateSubscription
} from '../viewAPI.js';

import { 
    getIsSecretMode
} from '../ctrlAPI.js';

import {
    getCurrentFlyingStarYear // 🌟 補回遺漏的 import
} from '../modelAPI.js';
import { getText } from '../DataAPI.js';
let isNextYear = false; 

// --- 內部邏輯函數 ---


function switchYearAndSubmit() {
    isNextYear = !isNextYear; 
    const baseYear = getCurrentFlyingStarYear();
    let newYear = isNextYear ? (baseYear + 1) : baseYear;
    
    setFlyingStarGraphYear(newYear);
    updateSubscription('controlYear');
    
    // 🌟 更新後重新綁定監聽器 (因為按鈕被重繪了)
    attachControlListeners();
}

function submitSelectedYear() {
    const yearSelectElement = document.getElementById('yearSelect');
    if (!yearSelectElement) return;
    
    const selectedYear = parseInt(yearSelectElement.value, 10);
    setFlyingStarGraphYear(selectedYear);
    updateSubscription('controlYear');
    
    // 🌟 更新後重新綁定監聽器
    attachControlListeners();
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
    const thisYear = getCurrentFlyingStarYear();
    const fiftyYearAgo = thisYear - 50;
    
    // 🌟 修正：移除 createSubmitButton，直接使用帶 ID 的按鈕
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

// 🌟 新增：事件監聽綁定函數 (給 app.js 和 updateSubscription 使用)
export function attachControlListeners() {
    // 綁定切換按鈕
    const toggleBtn = document.getElementById('btn-toggle-year');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', switchYearAndSubmit);
    }

    // 綁定提交按鈕 (管理員模式)
    const submitBtn = document.getElementById('btn-submit-year');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitSelectedYear);
    }
}
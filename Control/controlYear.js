// controlYear.js
import { 
    updateSubscription
} from '../viewAPI.js';

import {
    getThisYear,
    setCurrYear
} from '../modelAPI.js';

let isNextYear = false; 

// --- 內部邏輯函數 ---


function switchYearAndSubmit() {
    isNextYear = !isNextYear; 
    const baseYear = getThisYear();
    let newYear = isNextYear ? (baseYear + 1) : baseYear;
    
    setCurrYear(newYear);
    updateSubscription('controlYear');
    
    // 🌟 更新後重新綁定監聽器 (因為按鈕被重繪了)
    attachControlListeners();
}

function submitSelectedYear() {
    const yearSelectElement = document.getElementById('yearSelect');
    if (!yearSelectElement) return;
    
    const selectedYear = parseInt(yearSelectElement.value, 10);
    setCurrYear(selectedYear);
    updateSubscription('controlYear');
    
    // 🌟 更新後重新綁定監聽器
    attachControlListeners();
}

export function getIsNextYear(){
    return isNextYear;
}

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
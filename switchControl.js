// switchControls.js

import { 
    setLanguage, 
    getLanguage,
    setFunction,
    getFunction 
} from './globalState.js';

import {
    updateSubscription // 🌟 引入頁面更新函數
} from './viewAPI.js'; // 從 View Facade 獲取 updateSubscription

import { getText } from './localizationData.js';


// ------------------------------------
// --- C: 事件處理函數 ---
// ------------------------------------

function handleLanguageChange(event) {
    const newLang = event.target.value;
    setLanguage(newLang);
    updateSubscription('language'); // 🌟 通知 render.js 整個頁面需要重繪
}

function handleFunctionChange(event) {
    const newFunc = event.target.value;
    setFunction(newFunc);
    updateSubscription('function'); // 🌟 通知 render.js 整個頁面需要重繪
}


// ------------------------------------
// --- V: HTML 生成函數 ---
// ------------------------------------

function createLanguageSelect() {
    const currentLang = getLanguage();
    const label = getText('LANGUAGE_SWITCH');
    
    return `
        <label for="langSelect" style="color: white; margin-right: 5px;">${label}:</label>
        <select id="langSelect">
            <option value="ZH" ${currentLang === 'ZH' ? 'selected' : ''}>繁體中文</option>
            <option value="EN" ${currentLang === 'EN' ? 'selected' : ''}>English</option>
        </select>
    `;
}

function createFunctionSelect() {
    const currentFunc = getFunction();
    const label = getText('CONTROL_SWITCH');
    
    // 🌟 定義所有功能選項 (未來擴充時只需在這裡新增)
    const options = [
        { value: 'FLYING_STAR', label: '流年運程 (飛星)' },
        { value: 'FORTUNE_STICKS', label: '仙家靈簽' },
        { value: 'BAZI', label: '命理查詢 (八字)' },
    ];
    
    let optionsHtml = options.map(opt => 
        `<option value="${opt.value}" ${currentFunc === opt.value ? 'selected' : ''}>${opt.label}</option>`
    ).join('');

    return `
        <label for="funcSelect" style="color: white; margin-right: 5px;">${label}:</label>
        <select id="funcSelect">
            ${optionsHtml}
        </select>
    `;
}

export function createSwitchControlsHtml() {
    return createFunctionSelect() + createLanguageSelect();
}

// ------------------------------------
// --- C: 事件綁定函數 (重點) ---
// ------------------------------------

export function attachSwitchControlListeners() {
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.removeEventListener('change', handleLanguageChange); // 防止重複綁定
        langSelect.addEventListener('change', handleLanguageChange);
    }
    
    const funcSelect = document.getElementById('funcSelect');
    if (funcSelect) {
        funcSelect.removeEventListener('change', handleFunctionChange); // 防止重複綁定
        funcSelect.addEventListener('change', handleFunctionChange);
    }
}
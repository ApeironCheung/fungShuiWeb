import { 
    getCurrentFlyingStarYear, 
    getFlyingStarChart 
} from '../modelAPI.js';

import { 
    getText
} from '../DataAPI.js';

let currentDisplayYear = getCurrentFlyingStarYear(); 

// 飛星名稱
const starNames = getText('STAR_NAMES');
const directions = getText('DIRECTIONS');

// 核心生成 HTML 函數
function getTable(year) {
    // 防呆機制：如果 year 是 undefined，默認用今年
    if (!year) year = getCurrentFlyingStarYear();

    const chart = getFlyingStarChart(year);
    let htmlString = '';

    // 1. 生成標題
    htmlString += `<h2 id="chart-title">${year} 年九宮飛星圖 </h2>`;

    // 2. 生成表格 (注意：這裡不需要 id="chart-output"，因為外層已有 container)
    htmlString += '<div class="chart-grid">'; 
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const star = chart[i][j];
            const starDescription = starNames[star];
            const dirLabel = directions[i][j];
            // 圖片路徑假設
            const starImgHtml = `
                <img src="${star}.jpg" 
                     onerror="this.outerHTML='<span class=\\'star\\'>${star}</span>'" 
                     alt="星號 ${star}" 
                     style="width: 50px; height: 50px; display: block; margin: 0 auto;">
            `;

            htmlString += `
                <div class="palace s${star}">
                    ${starImgHtml}
                    <p style="font-size: 1.2em; line-height: 1.2; margin-top: 10px;">${starDescription}</p>
                    ${dirLabel}
                </div>
            `;
        }
    }
    
    htmlString += '</div>'; 

    return htmlString;
}

// --- 狀態管理函數 (配合 controlYear.js 使用) ---

export function setFlyingStarGraphYear(year) {
    console.log(`切換年份至: ${year}`); // Debug 用，可以在 Console 看到是否被呼叫
    currentDisplayYear = year; 
}

//根據當前狀態變數生成 HTML
export function getFlyingStarChartHtml() {
    return getTable(currentDisplayYear); 
}

export function getFlyingStarGraphYear() {
    return currentDisplayYear;
}

let currentDisplayYear = getCurrentFlyingStarYear(); 

// 飛星名稱
const starNames = {
    1: "一白貪狼星<br>(桃花, 財運)",
    2: "二黑病符星<br>(疾病, 災禍) ",
    3: "三碧是非星<br>(爭執, 官訟) ",
    4: "四綠文昌星<br>(學業, 文職) ",
    5: "五黃廉貞星<br>(大煞, 災難) ",
    6: "六白武曲星<br>(權力, 橫財)",
    7: "七赤破軍星<br>(破財, 口舌)",
    8: "八白左輔星<br>(財富, 吉慶)",
    9: "九紫右弼星<br>(喜慶, 姻緣) "
};

const directions = [
        ['西北 (乾)', '正北 (坎)', '東北 (艮)'],
        ['正西 (兌)', '中宮',      '正東 (震)'],
        ['西南 (坤)', '正南 (離)', '東南 (巽)']
    ];

// --- 舊的 getCurrTable / getNextTable 其實可以保留作輔助，或者直接不用 ---
function getCurrTable() {
    const currentYear = getCurrentFlyingStarYear(); 
    return getTable(currentYear);
}
function getNextTable() {
    const nextYear = getCurrentFlyingStarYear() + 1;
    return getTable(nextYear);
}

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
                    <p style="font-size: 0.8em; line-height: 1.2; margin-top: 10px;">${starDescription}</p>
                    ${dirLabel}
                </div>
            `;
        }
    }
    
    htmlString += '</div>'; 

    return htmlString;
}

// --- 狀態管理函數 (配合 controlYear.js 使用) ---

// 🌟 關鍵修正 2: 設定新的年份
function setFlyingStarGraphYear(year) {
    console.log(`切換年份至: ${year}`); // Debug 用，可以在 Console 看到是否被呼叫
    currentDisplayYear = year; 
}

// 🌟 關鍵修正 3: 根據當前狀態變數生成 HTML
function getFlyingStarChartHtml() {
    return getTable(currentDisplayYear); 
}

function getFlyingStarGraphYear() {
    return currentDisplayYear;
}
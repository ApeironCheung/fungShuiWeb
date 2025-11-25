// --- [Global Data] ---

const today = new Date;
const thisYear = today.getFullYear();
let isNextYear = false;
let isSpecialMode = false; 

// 飛星名稱（用於文字描述）
const starNames = {
    1: "一白貪狼星 (桃花, 財運)",
    2: "二黑病符星 (疾病, 災禍) ",
    3: "三碧是非星 (爭執, 官訟) ",
    4: "四綠文昌星 (學業, 文職) ",
    5: "五黃廉貞星 (大煞, 災難) ",
    6: "六白武曲星 (權力, 橫財)",
    7: "七赤破軍星 (破財, 口舌)",
    8: "八白左輔星 (財富, 吉慶)",
    9: "九紫右弼星 (喜慶, 姻緣) "
};

//table generation
function getTable(year) {
    // 假設 numerologyAPI.getFlyingStarChart(year) 可用
    const chart = numerologyAPI.getFlyingStarChart(year);
    let htmlString = '';

    // 1. 生成標題 (用於動態更新年份)
    const centralStar = numerologyAPI.getCentralStar(year);
    htmlString += `<h2 id="chart-title">${year} 年九宮飛星圖 </h2>`;

    // 2. 生成表格
    htmlString += '<div id="chart-output" class="chart-grid">';
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const star = chart[i][j];
            const starDescription = starNames[star];

            // 圖片格式統一為 [star].jpg
            const starImgHtml = `
                <img src="${star}.jpg" 
                     onerror="this.outerHTML='<span class=\\'star\\'>${star}</span>'" 
                     alt="星號 ${star}" 
                     style="width: 50px; height: 50px; display: block; margin: 0 auto;">
            `;

            // 宮格 HTML 結構
            htmlString += `
                <div class="palace s${star}">
                    ${starImgHtml}
                    <p style="font-size: 0.8em; line-height: 1.2; margin-top: 10px;">${starDescription}</p>
                </div>
            `;
        }
    }
    
    htmlString += '</div>'; // 結束 chart-grid

    return htmlString;
}

//normal control panel




// --- [Level 2] 輔助組件生成函數：getControlPanel() ---

/**
 * getControlPanel: 生成控制區塊的 HTML 字符串
 * @param {number} mode - 初始模式: 0 (Current -> Next), 1 (Next -> Current), 2 (Year Selector)
 * @returns {string} - 控制區塊的 HTML 字符串
 */
function getControlPanel(mode) {
    let buttonText = '明年方位 >>';
    let buttonOnClick = 'toggleYear()';
    let hiddenControlsDisplay = 'none';

    if (mode === 1) {
        buttonText = '<< 今年方位';
    } else if (mode === 2) {
        // 隱藏模式下，按鈕消失，年份選擇器顯示
        buttonText = ''; 
        buttonOnClick = ''; // 無效化按鈕
        hiddenControlsDisplay = 'block';
    }

    let htmlString = `
        <div class="control-panel">
            <button id="toggle-year-btn" onclick="${buttonOnClick}" 
                    style="display: ${mode === 2 ? 'none' : 'block'};">
                ${buttonText}
            </button>
            
            <div id="hidden-controls" class="hidden-controls" 
                 style="display: ${hiddenControlsDisplay};">
                <select id="year-selector"></select>
                <button onclick="displaySelectedYear()">確定年份</button>
            </div>
            
            <p id="secret-prompt" style="font-size:0.8em; color: #aaa;">
                請聚焦網頁開始輸入密碼...
            </p>
        </div>
    `;
    return htmlString;
}

//special mode
function createYearMenu(start, length) {
    let html = '<select id="yearSelect">';
    const end = start + length;
    for (let i = start; i < end; i++) {
        html += `<option value="${i}">${i}</option>`;
    }
    return html + '</select>';
}
function createSubmitButton(funt) {
    return `<button type="button" onclick="${funt}">Submit</button>`;
}

//create a menu with +-50years
function createYearMenu(){
    const fiftyYearAgo = thisYear - 50;
    return createYearMenu(fiftyYearAgo, 101);
}
function yearMenuButton(){
const yearValueGetter = "document.getElementById('yearSelect').value";
const functionCallString = `getTable(${yearValueGetter})`;
    return createSubmitButton(functionCallString);
}

//overall html
function specialMode(){
    const menuHtml = createYearMenu();
    const buttonHtml = yearMenuButton();
    return `<form>
        ${menuHtml}
        ${buttonHtml}
    </form>`;
}

function normalMode(){
    let result = '<form>';
    result += 'getTable'
}

function switchYearAndSubmit(){
    const year2Submit = isNextYear? thisYear +1 : thisYear;
    const buttonText = isNextYear ? "今年" : "明年";
    let tableHtml = getTable(year2Submit);
    let formHtml = `<form><button type="button" onclick="switchYearAndSubmit()">${buttonText}</button></form>`;
    renderPage(tableHtml, formHtml);
    isNextYear = !isNextYear;
}

function renderPage(table, form){

}

//網頁style
function getStyle() {
    return `
        <style>
            /* 基礎樣式 */
            .fungsui-container { max-width: 600px; margin: 20px auto; font-family: Arial, sans-serif; text-align: center; }
            .chart-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 2px solid #333; }
            .palace { padding: 20px; border: 1px solid #ccc; font-size: 1.2em; position: relative; }
            .palace-label { font-size: 0.8em; color: #666; position: absolute; top: 5px; left: 5px; }
            .star { font-size: 2.5em; font-weight: bold; }
            .control-panel { margin-top: 20px; }
            .hidden-controls { display: none; margin-top: 10px; }
            /* 顏色標記 (五黃, 病符, 文昌, 喜慶等) */
            .s5 { color: #8B0000; background-color: #ffeaea; } /* 五黃廉貞 */
            .s2 { color: #800080; background-color: #f0f8ff; } /* 二黑病符 */
            .s4 { color: #006400; background-color: #e0eee0; } /* 四綠文昌 */
            .s9 { color: #FF4500; } /* 九紫喜慶 */
        </style>
    `;
}
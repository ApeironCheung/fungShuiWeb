// taiShuiPage.js
import { 
    getCurrYear,
    getThisYear,
    getTaiShuiConflictArray
} from '../modelAPI.js';

import { getText } from '../DataAPI.js';
import { generateZodicAccessoriesReport } from './zodicAccessories.js';

export function getTaishuiHtml() {
    // 優先使用圖表顯示的年份，如果沒有則用系統年份
    const currentYear = getCurrYear() || getThisYear(); 

    let result = "<div id='taishui-content' style='width: 100%; padding: 10px;'>";
    
    result += "<div style='text-align: right; font-size: 1.1em; margin-bottom: 15px;'>";
    result += getTaiShuiName(currentYear); 
    result += "</div>";
    
    result += "<div style='text-align: right; border-top: 1px solid #ddd; padding-top: 10px;'>";
    result += getTaiShuiConflictReport(currentYear); 
    result += "</div>";
    result += "<br>"
    result += generateZodicAccessoriesReport();
    result += "</div>"; 
    return result;
}

function getTaiShuiConflictReport(year){
    const array = getTaiShuiConflictArray(year);
    const ZODIAC = getText('ZODIAC');
    const UX_WORD = getText("UX_WORD");
    const CONFLICT = getText('TAI_SHUI_CONFLICT_MAPPING');
    let reportHtml = `**${year} ${UX_WORD[5]} ${ZODIAC[array[0]]} ${UX_WORD[6]}<br>`;
    reportHtml += `---<br>`;
    for(let i =1; i <array.length; i++){
        reportHtml+= `${CONFLICT[i-1]}:${ZODIAC[array[i]]}<br>`;
    }
    return reportHtml;
}

function getTaiShuiName() {

    const year = getCurrYear();
    // 六十甲子太歲大將軍名單 (starDeity)
    const TAI_SHUI_DEITIES = getText('TAI_SHUI_DEITIES');
    // 1. 確保年份是正數，避免 JS 負數取模問題 (雖然公元年份通常是正數)
    const yearNumber = parseInt(year, 10);
    
    // 2. 核心計算公式：(Year - 4) Modulo 60
    const taiShuiIndex = (yearNumber - 4) % 60;

    // 3. 從陣列中取出對應的太歲大將軍名稱
    const deityName = TAI_SHUI_DEITIES[taiShuiIndex];
    const taiShuiCurr = getText("TAI_SHUI_CURR");
    
    // 4. 生成報告字串
    if (deityName) {
        return `${taiShuiCurr}<br>**${deityName}**`;
    } else {
        return "錯誤：無法找到對應的太歲大將軍。請檢查 TAI_SHUI_DEITIES 陣列是否完整。";
    }
}
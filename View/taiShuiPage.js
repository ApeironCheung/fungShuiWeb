// taiShuiPage.js
import { 
    getTaiShui, 
    getTaiShuiConflictReport,
    getCurrentFlyingStarYear // 用來獲取當前年份
} from '../modelAPI.js';

import {
    getFlyingStarGraphYear
} from '../viewAPI.js'; // 從 View 層獲取當前顯示的年份

export function getTaishuiHtml() {
    // 優先使用圖表顯示的年份，如果沒有則用系統年份
    const currentYear = getFlyingStarGraphYear() || getCurrentFlyingStarYear(); 

    let result = "<div id='taishui-content' style='width: 100%; padding: 10px;'>";
    
    result += "<div style='text-align: right; font-size: 1.1em; margin-bottom: 15px;'>";
    result += getTaiShui(currentYear); 
    result += "</div>";
    
    result += "<div style='text-align: right; border-top: 1px solid #ddd; padding-top: 10px;'>";
    result += getTaiShuiConflictReport(currentYear); 
    result += "</div>";
    
    result += "</div>"; 
    return result;
}
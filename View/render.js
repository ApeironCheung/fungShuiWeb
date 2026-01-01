// render.js
import { getFlyingStarChartHtml, createControlHtml
} from './flyingStarGraph.js';
import { getTaishuiHtml} from './taiShuiPage.js';
import { headingHtml } from './headingArea.js';
import { 
    attachClassicListeners,
    attachControlListeners,
    attachOracleListeners,
    attachCalenderListener,
} from '../ctrlAPI.js';
import {
    UPDATE_SUBSCRIPTIONS 
} from '../DataAPI.js';

// V: 核心組件：Controller
function renderCtrl() {
    return `<div id="control-container" class="component ctrl-component" style="margin-bottom: 20px;">
        ${createControlHtml()} 
    </div>`;
}

// V: 核心組件：Display
function renderDisplay() {
    let result = '<div class="component display-component">';
    result += `<div id="chart-display-container">${getFlyingStarChartHtml()}</div>`; 
    result += '</div>';
    return result;
}

export function renderStarCalculator() {
    let result = headingHtml();

    // 定義兩種模式的 CSS
    const pcCSS = `display: flex; flex-direction: row; justify-content: center; gap: 20px; max-width: 1000px; margin: 0 auto;`;
    const mobileCSS = `display: flex; flex-direction: column; align-items: center; gap: 15px; width: 100%;`;
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    // 根據偵測結果選擇
    const currentCSS = isMobile() ? mobileCSS : pcCSS;

    result += `
        <div id="main-wrapper" style="${currentCSS}">
            
            <div id="chart-and-controls" style="flex: 2; width: 100%; min-width: 320px;">
                ${renderDisplay()}
                ${renderCtrl()}
            </div>

            <div id="taishui-container" style="flex: 1; width: 100%; min-width: 300px;">
                ${getTaishuiHtml()} 
            </div>
            
        </div>
    `;
    return result;
}
// 更新訂閱函數
export function updateSubscription(publisherName) {
    const updateList = UPDATE_SUBSCRIPTIONS[publisherName];
    if (!updateList) {
        console.warn(`render.js: 找不到發布者 '${publisherName}' 的訂閱列表。`);
        return;
    }
    updateList.forEach(item => { 
        const element = document.getElementById(item.id); 
        const newHtml = item.getHtml(); 
        if (element && newHtml !== undefined) {
            element.innerHTML = newHtml;
        }
    });
    if (publisherName === 'controlYear') {
       attachControlListeners();      
    }else if (publisherName ==='ORACLE' ){
        attachOracleListeners();
    }else if ((publisherName)=== 'SUTRA'){
        attachClassicListeners();
    }else if (publisherName === 'CALENDAR'){
        attachCalenderListener();
    }
}
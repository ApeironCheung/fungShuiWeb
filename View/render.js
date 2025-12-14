// render.js
import { getFlyingStarChartHtml, createControlHtml
} from './flyingStarGraph.js';
import { getTaishuiHtml} from './taiShuiPage.js';
import { headingHtml } from './headingArea.js';
import { 
    attachControlListeners,
    attachOracleListeners,
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

// V: 頂層組件
export function renderStarCalculator() {
    // 使用 Flexbox 創建左右佈局
    let result = headingHtml();
    result += `
        <div id="main-wrapper" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; max-width: 700px;">
            
            <div id="chart-and-controls" style="flex: 2; ">
                ${renderDisplay()}
                ${renderCtrl()}
            </div>

            <div id="taishui-container" style="flex: 1; ">
                ${getTaishuiHtml()} 
            </div>
            
        </div>
    `
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
    }else if (publisherName ==='ORACLE'){
        attachOracleListeners();
    }
}
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
    attach8WordListeners,
    attachBoneWeighListeners,
    attachPolarStarListeners
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
    result += `
        <div id="main-wrapper">

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
    }else if (publisherName === 'ASTROLOGY'){
        attach8WordListeners();
    }else if (publisherName === 'BONE_WEIGH'){
        attachBoneWeighListeners();
    }
    else if (publisherName === 'POLAR_STAR'){
        attachPolarStarListeners();
    }
}
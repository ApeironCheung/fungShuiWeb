// subscribeList.js

// 不從MVC導入,直接從檔案導入，避開 Facade 導致的循環依賴
import { getFlyingStarChartHtml } from './flyingStarGraph.js';
import { getTaishuiHtml } from './taiShuiPage.js';
import { createControlHtml } from './controlYear.js';

export const UPDATE_SUBSCRIPTIONS = {
    'controlYear': [      
        { 
            id: 'control-container', 
            getHtml: () => createControlHtml() 
        },{
            id: 'chart-display-container', 
            getHtml: () => getFlyingStarChartHtml() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => getTaishuiHtml() 
        }
    ]
};
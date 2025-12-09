// subscribeList.js

import { pageUnderConstruction, 
        getTaishuiHtml, 
        getFlyingStarChartHtml } from '../viewAPI.js';
import { createControlHtml } from '../Control/controlYear.js';

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
    ],
    'ORACLE':[
          { 
            id: 'control-container', 
            getHtml: () => createOracleCtrlHtml() 
        },{
            id: 'chart-display-container', 
            getHtml: () => renderOracleDisplay() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => renderOracleSidebar()
        }
    ],
    'ASTROLOGY':[
                  { 
            id: 'control-container', 
            getHtml: () => pageUnderConstruction() 
        },{
            id: 'chart-display-container', 
            getHtml: () => pageUnderConstruction() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => pageUnderConstruction()
        }
    ],
    'SUTRAS':[
                  { 
            id: 'control-container', 
            getHtml: () => pageUnderConstruction() 
        },{
            id: 'chart-display-container', 
            getHtml: () => pageUnderConstruction() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => pageUnderConstruction()
        }
    ]
};
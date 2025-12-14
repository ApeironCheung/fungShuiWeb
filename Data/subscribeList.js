// subscribeList.js

import { pageUnderConstruction, 
        getTaishuiHtml, 
        getFlyingStarChartHtml,
    createControlHtml } from '../viewAPI.js';
   import { renderOracleDisplay, 
            renderOracleSidebar,
            createOracleCtrlHtml,
            refreshOracleDisplay,
            refreshOracleSidebar,
            refreshStickMenu } from '../View/oracleView.js';

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
            
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => createOracleCtrlHtml() 
        },{
            id: 'chart-display-container', 
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => renderOracleDisplay() 
        },
        {
            id: 'taishui-container', 
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => renderOracleSidebar()
        }
    ],
        'ORACLE_STICK':[
          { 
            id: 'btn-oracleStick', 
            
            getHtml: () => refreshStickMenu() 
        },
    ],
            'ORACLE_DISPLAY':[
          { 
            id: 'oracleDisplay', 
            
            getHtml: () => refreshOracleDisplay() 
        },{ 
            id: 'oracle-sidebar', 
            
            getHtml: () => refreshOracleSidebar() 
        },
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
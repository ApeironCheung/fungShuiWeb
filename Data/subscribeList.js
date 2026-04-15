// subscribeList.js

import * as view from '../viewAPI.js';

export const UPDATE_SUBSCRIPTIONS = {   
    'controlYear': [      
        { 
            id: 'control-container', 
            getHtml: () => view.createControlHtml() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.getFlyingStarChartHtml() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.getTaishuiHtml() 
        }
    ],
    'ORACLE':[
          { 
            id: 'control-container', 
            
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => view.createOracleCtrlHtml() 
        },{
            id: 'chart-display-container', 
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => view.renderOracleDisplay() 
        },
        {
            id: 'taishui-container', 
            //getHtml: () => pageUnderConstruction() 
            getHtml: () => view.renderOracleSidebar()
        }
    ],
        'ORACLE_STICK':[
          { 
            id: 'btn-oracleStick',             
            getHtml: () => view.refreshStickMenu() 
        },
    ],
            'ORACLE_DISPLAY':[
          { 
            id: 'oracleDisplay', 
            
            getHtml: () => view.refreshOracleDisplay() 
        },{ 
            id: 'oracle-sidebar', 
            getHtml: () => view.refreshOracleSidebar() 
        },
    ],
    'ASTROLOGY':[
                  { 
            id: 'control-container', 
            getHtml: () => view.createBirthdaySelector() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.create8PillarsView() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.createAstrologySidebar()
        }
    ],
        'eightWordUpdate':[
        {
            id: 'eightPillars', 
            getHtml: () => view.refresh8PillarsView() 
        },
        {
            id: 'taishui-container', 
           getHtml: () => view.refreshAstrologySidebar()
        }
    ],

    'BONE_WEIGH':[
                  { 
            id: 'control-container', 
            getHtml: () => view.boneWeighBirthdaySelector() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.createBoneWeighDisplay() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.pageUnderConstruction()
        }
    ],
        'boneWeightUpdate':[
        {
            id: 'boneWeighDisplay', 
            getHtml: () => view.refreshBoneWeighDisplay() 
        },
    ],
    
    'POLAR_STAR':[
                  { 
            id: 'control-container', 
            getHtml: () => view.createAstrologyCtrl() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.createAstrologyDisplay() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.pageUnderConstruction()
        }
    ],
        'polarStarAstroUpdate':[
        {
            id: 'polarStar-container', 
            getHtml: () => view.refreshAstrologyDisplay() 
        },
    ],
    // 大更新：面板、內容、簡介全刷
    'SUTRA': [
        { id: 'control-container', getHtml: () => view.createClassicCtrl() },
        { id: 'chart-display-container', getHtml: () => view.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => view.createSutraExplain() }
    ],

    // 中更新：只刷選單內部的 HTML、內容、簡介
    'SUTRA_BOOK': [
        { id: 'btn-sutraChapter', getHtml: () => view.refreshSutraChapterMenu() },
        { id: 'chart-display-container', getHtml: () => view.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => view.createSutraExplain() }
    ],

    // 小更新：只換內文
    'SUTRA_CHAPTER': [
        { id: 'chart-display-container', getHtml: () => view.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => view.refreshSutraExplain() }
    ],
    'CALENDAR':[
                  { 
            id: 'control-container', 
            getHtml: () => view.createCalendarControl() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.createDetailCalender() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.createCalendarSideBar()
        }
    ],
        'REFRESH_CALENDAR':[
                  {
            id: 'chart-display-container', 
            getHtml: () => view.refreshDetailCalender() 
        },
        {
            id: 'calendarSideBar', 
            getHtml: () => view.refreshCalendarSideBar()
        }
    ],
    'JP_ASTRO':[
                  { 
            id: 'control-container', 
            getHtml: () => view.jpBirthdaySelector() 
        },{
            id: 'chart-display-container', 
            getHtml: () => view.createJPFlyingStarChart() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => view.pageUnderConstruction()
        }
    ],
        'RE_JP_ASTRO':[
                  {
            id: 'chart-display-container', 
            getHtml: () => view.refreshJPFlyingStarChart() 
        }
    ],
};
// subscribeList.js

import { pageUnderConstruction, 
        getTaishuiHtml, 
        getFlyingStarChartHtml,
    createControlHtml,
createCalendarControl,
createDetailCalender,
refreshDetailCalender,
createCalendarSideBar,
refreshCalendarSideBar,
create6PillarsView,
create8PillarsView,
createBirthdaySelector,
createAstrologySidebar,
refresh6PillarsView,
refresh8PillarsView,
refreshAstrologySidebar,
refreshBoneWeighDisplay,
createBoneWeighDisplay,
boneWeighBirthdaySelector,
createAstrologyCtrl,
createAstrologyDisplay,
refreshAstrologyDisplay
 } from '../viewAPI.js';
   import { renderOracleDisplay, 
            renderOracleSidebar,
            createOracleCtrlHtml,
            refreshOracleDisplay,
            refreshOracleSidebar,
            refreshStickMenu } from '../View/oracleView.js';
import * as ClassicView from "../View/classicView.js";

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
            getHtml: () => createBirthdaySelector() 
        },{
            id: 'chart-display-container', 
            getHtml: () => create8PillarsView() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => createAstrologySidebar()
        }
    ],
        'eightWordUpdate':[
        {
            id: 'eightPillars', 
            getHtml: () => refresh8PillarsView() 
        },
        {
            id: 'taishui-container', 
           getHtml: () => refreshAstrologySidebar()
        }
    ],

    'BONE_WEIGH':[
                  { 
            id: 'control-container', 
            getHtml: () => boneWeighBirthdaySelector() 
        },{
            id: 'chart-display-container', 
            getHtml: () => createBoneWeighDisplay() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => pageUnderConstruction()
        }
    ],
        'boneWeightUpdate':[
        {
            id: 'boneWeighDisplay', 
            getHtml: () => refreshBoneWeighDisplay() 
        },
    ],
    
    'POLAR_STAR':[
                  { 
            id: 'control-container', 
            getHtml: () => createAstrologyCtrl() 
        },{
            id: 'chart-display-container', 
            getHtml: () => createAstrologyDisplay() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => pageUnderConstruction()
        }
    ],
        'polarStarAstroUpdate':[
        {
            id: 'polarStar-container', 
            getHtml: () => refreshAstrologyDisplay() 
        },
    ],
    // 大更新：面板、內容、簡介全刷
    'SUTRA': [
        { id: 'control-container', getHtml: () => ClassicView.createClassicCtrl() },
        { id: 'chart-display-container', getHtml: () => ClassicView.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => ClassicView.createSutraExplain() }
    ],

    // 中更新：只刷選單內部的 HTML、內容、簡介
    'SUTRA_BOOK': [
        { id: 'btn-sutraChapter', getHtml: () => ClassicView.refreshSutraChapterMenu() },
        { id: 'chart-display-container', getHtml: () => ClassicView.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => ClassicView.createSutraExplain() }
    ],

    // 小更新：只換內文
    'SUTRA_CHAPTER': [
        { id: 'chart-display-container', getHtml: () => ClassicView.createSutraDisplay() },
        { id: 'taishui-container', getHtml: () => ClassicView.refreshSutraExplain() }
    ],
    'CALENDAR':[
                  { 
            id: 'control-container', 
            getHtml: () => createCalendarControl() 
        },{
            id: 'chart-display-container', 
            getHtml: () => createDetailCalender() 
        },
        {
            id: 'taishui-container', 
            getHtml: () => createCalendarSideBar()
        }
    ],
        'REFRESH_CALENDAR':[
                  {
            id: 'chart-display-container', 
            getHtml: () => refreshDetailCalender() 
        },
        {
            id: 'calendarSideBar', 
            getHtml: () => refreshCalendarSideBar()
        }
    ],
};
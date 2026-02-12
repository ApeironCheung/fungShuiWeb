import { getPolarStarAstrologyGraph, getSetDescription } from "../Model/polarStarAstrologyModel.js";
import { getDate, getIsMale, solarToLunar } from "../modelAPI.js";
import { birthdaySelector, genderSelector, submitButton } from "./astrologyCtrlUI.js";
import { getText } from "../DataAPI.js";

export function createAstrologyCtrl(){
    const id = 'AstrologyCtrl';
    return `<div id = ${id}>${refreshAstrologyCtrl()}</div>`;
}
export function refreshAstrologyCtrl(){
    return `${birthdaySelector()}
        ${genderSelector()}
        ${submitButton()}`
}

export function createAstrologyDisplay(){
    const style = starStyle() + formStyle();
    const palacesHtml = refreshAstrologyDisplay();
    const id = "polarStar-container";
    return `
        ${style}
        <div class=${id} id=${id}>
        ${palacesHtml}
        </div>
    `; 
}

export function refreshAstrologyDisplay(){
    const graph = getPolarStarAstrologyGraph();
    const styledGraph = renderStars(graph);
    let palacesHtml = '';
    for (let i = 0; i < 12; i++) {
        palacesHtml += `<div id="palace-${i}" class="palace-box">${styledGraph[i]}</div>`;
    }
    return `    <div class="center-box">
                <h3>${getBirthdayInfo()}</h3>
                </div>
                ${palacesHtml}`;
}

function starStyle(){
    const starGroups = {
  palace: ['命宮','兄弟宮','夫妻宮','子女宮','財帛宮','疾厄宮',
        '遷移宮','奴僕宮','官祿宮','田宅宮','福德宮','父母宮'],
  main: ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍'],
  sixGood: ['文昌', '文曲', '左輔', '右弼', '天魁', '天鉞', '祿存', '天馬'],
  sixBad : ['擎羊','陀羅','火星','鈴星','地空','地劫'],
  classB: ['紅鸞','天喜','咸池','三台','八座','天官','龍池','鳳閣','孤辰','寡宿',
    '天福','天虛','天哭','蜚廉','破碎','華蓋','天德','天才','天壽','天刑','天姚',
    '解神','天巫','天月','陰煞','台輔','封誥','恩光','天貴'],
  classC: ['長生','沐浴','冠帶','臨官','帝旺','衰','病','死','墓','絕','胎','養','博士',
    '力士','青龍','小耗','將軍','奏書','飛廉','喜神','病符','大耗','伏兵','官符','天傷','天使'],
    classD: ['歲建','龍德','天德','將星','攀鞍','歲驛','華蓋','截路','空亡','旬中','旬空','天空','天廚','官府','月德'],
    classE: ['晦氣','喪門','貫索','大耗','白虎','吊客','劫煞','災煞','天煞','息神','指背','咸池','月煞','亡神']
};
const colors = {
        palace: { color: '#000000', size: '3vw' },     // 主星：深紫色 (高貴)
        main: { color: '#A52A2A', size: '2vw' },     // 主星：深紫色 (高貴)
        sixGood: { color: '#8B4513', size: '1.5vw' },  // 六吉：明亮紅
        sixBad: { color: '#000000', size: '1.5vw' },   // 六凶：純黑
        classB: { color: '#767676', size: '1.5vw' },   // B級：深綠色
        classC: { color: '#8C8C8C', size: '1.5vw' },   // C級：淺啡色 (漸淡)
        classD: { color: '#8C8C8C', size: '1.5vw' },   // D級：灰色
        classE: { color: '#8C8C8C', size: '1.5vw' }    // E級：極淺灰
    };
    let dynamicCSS = '';
    Object.entries(starGroups).forEach(([type, stars]) => {
        const config = colors[type] || { color: '#666', size: '2vw' };
        stars.forEach(star => {
            dynamicCSS += `
                #${star} { 
                    color: ${config.color}; 
                    font-size: ${config.size}; 
                    font-weight: ${type === 'main' ? '900' : 'bold'}; 
                }\n`;
        });
    });
    return `<style>${dynamicCSS}</style>`;
}

function formStyle(){
    return `<style>
.polarStar-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        width: 70vw; /* 加闊少少，費事啲星太擠迫 */
        height: auto;
        border: 2px solid #5d4037; /* 深啡色邊框更有古風 */
        background-color: #F4E9CD; /* 舊紙淡黃色 */
        font-family: "Kaiti", "STKaiti", "標楷體", serif; /* 用楷體更有 feel */
    }
        @media (min-width: 1240px) {
        .polarStar-container {
            width: 50vw;
        }
        }

    .palace-box { 
        border: 1px solid #d7ccc8; 
        padding: 8px; 
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex-wrap: wrap;      /* 夠位就橫排，唔夠位先自動換行 */
        flex-direction: row;  /* 橫向排列 */
    }

    .center-box { 
        grid-area: 2 / 2 / 4 / 4; 
        background-color: #e8dfd0; /* 中間稍深少少做層次 */
        border: 2px double #5d4037;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .star-item { cursor: default; }

  /* 紫微斗數宮位定位 (由左下角寅位開始順時針) */
  #palace-2 { grid-area: 4 / 1; } /* 寅 */
  #palace-3 { grid-area: 3 / 1; } /* 卯 */
  #palace-4 { grid-area: 2 / 1; } /* 辰 */
  #palace-5 { grid-area: 1 / 1; } /* 巳 */
  #palace-6 { grid-area: 1 / 2; } /* 午 */
  #palace-7 { grid-area: 1 / 3; } /* 未 */
  #palace-8 { grid-area: 1 / 4; } /* 申 */
  #palace-9 { grid-area: 2 / 4; } /* 酉 */
  #palace-10 { grid-area: 3 / 4; } /* 戌 */
  #palace-11 { grid-area: 4 / 4; } /* 亥 */
  #palace-0 { grid-area: 4 / 3; } /* 子 */
  #palace-1 { grid-area: 4 / 2; } /* 丑 */

  .center-box { grid-area: 2 / 2 / 4 / 4; background: #f0f0f0; }
</style>`;
}

function renderStars(graph) {
    const UI = getText('STARS_AND_PALACE');
    let html = [];
    for(let i =0; i < graph.length; i++){
        html.push('');
        const PALACE_ITEM_NUM = 2;
        const palace = graph[i][0];
        const limit = graph[i][1];

        html[i]+= `
        <div id ="${palace}" class="star-item">${UI[palace]}
        <br><div style = "font-size: 1.5vw; color: #555;">${limit}</div>
        </div><br>
        `
        for(let j = PALACE_ITEM_NUM; j < graph[i].length; j++){
            const starName = graph[i][j];
            const key = starName.substring(0,2);
            const name = UI[starName] || starName;
            html[i] += `<div id="${key}" class="star-item">${name}</div> `
        }
    }
    return html;
}

function getBirthdayInfo(){
    const title = getText('TOP_MENU')[3];

    const date = getDate();
    const lunarDate = solarToLunar(date);
    const UI = getText('EIGHT_WORDS_UI');
    const monthUI = getText('LUNAR_MONTH');
    const dateUI = getText('LUNAR_DATE');    
    const gender = getIsMale() ? UI[2] : UI[3];

    const solarYear  = date.getFullYear();
    const solarMonth = date.getMonth() + 1;
    const solarDate = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours} : ${minutes}`;

    const lunarYear = lunarDate.lunarYear;
    const lunarMonth = monthUI[lunarDate.lunarMonth];
    const leap = lunarDate.isLeap? monthUI[0] : "";
    const lunarDay = dateUI[lunarDate.lunarDay];

    const set = getSetDescription(date, lunarDate);

    return `${title}<br>
    ${set}<br>
    ${UI[1]}${gender}<br>
    ${UI[0]} ${time}<br>
    ${solarDate} ${solarMonth}, ${solarYear}<br>
    ${lunarYear}, ${lunarMonth}${leap}, ${lunarDay}    `
}
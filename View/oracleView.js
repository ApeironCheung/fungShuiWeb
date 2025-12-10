//oracleView.js
import { getText} from "../DataAPI";
import { getOracle, getOracleList, getStick} from "../modelAPI";

function getOracleReport(){
    const oracle = getOracle();
    const reportSheet = getText(oracle);
    const stick = getStick();
    const report = reportSheet[stick - 1];
    return report;
}

export function renderOracleDisplay(){
    let html = '<div id= "oracleDisplay">';
    html += refreshOracleDisplay();
    alert("renderOracleDisplay:<br>"+html)
    return html + '</div>'    
}

export function refreshOracleDisplay(){
    let html = '';
    let report = getOracleReport();
    let UX = getText('WDS_UX');
    if (report) {
        html += `<h2>${UX[0]}:${report["籤號"]} - <strong>${report["占驗古人"]}</strong> ${report["吉凶"]}</h2>`;
        const oracleText = report["籤文"]
        html += `<div class="oracle-text-section"><h3>📜 ${UX[3]}</h3><p>${oracleText}</p></div>`;
        html += `<div class="oracle-story-section"><h3>📚 ${UX[4]}</h3><p>${report["背景故事"].replace(/\n/g, '<br>')}</p></div>`;
    } else {
        html = '<p>無法取得籤詩報告。</p>';
    }
    return html;
} 

export function renderOracleSidebar(){
    let html = '<div id = "oracle-sidebar">';
    let report = getOracleReport();
    if (report) {
        html += report["詳情"];
    } else {
        html = '<p>無法取得籤詩報告。</p>';
    }
    alert("renderOracleSidebar:<br>"+html)
    return html + '</div>'
}

//
export function refreshStickMenu(){
    let html = createStickMenuContent(getOracleListLength());
    let element = document.getElementById("oracleStick");
    element.innerHTML = html;
}

function createOracleMenu(){
    let oracleList = getText('ORACLE_NAME_LIST');
    let html = '<select id = "btn-oracleMenu">';
    let oracleKey = getOracleList();
    for (let i =0;i < oracleList.length;i++){
        let oracle = oracleList[i];
        html += `<option value="${oracleKey[i]}">${oracle}</option>`;
    }
    return html + '</select>';
}

function createStickMenu(length){
    let html = '<select id = "btn-oracleStick">';
    html += createStickMenuContent(length);
    return html + '</select>';
}

function createRandomOracleButton(){
    let html = '<button id = "btn-oracleRandom">';
    html += "Random";
    return html +'</button>'
}
export function createOracleCtrlHtml(){
    loadOracle();
    let html = '<div id = oracle>';
    html += createOracleMenu();
    html += createStickMenu();
    html += createRandomOracleButton();
    return html + '</div>';
}

function createStickMenuContent(length){
    let html = '';
        for (let i =0; i < length; i++){
        html +=`<option value = "${i+1}">${i+1}</option>`;
    }
    return html;
}
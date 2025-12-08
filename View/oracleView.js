//oracleView.js
import { getText} from "../DataAPI";
import { getOracleReport } from "../modelAPI";

export function renderOracleDisplay(){
    let html = '<div id= "oracleDisplay">';
    html += refreshOracleDisplay();
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
    return html + '</div>'
}

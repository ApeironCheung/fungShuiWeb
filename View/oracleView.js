//oracleView.js
import { getText} from "../DataAPI.js";
import { getOracle, getOracleList, getStick, getOracleListLength} from "../modelAPI.js";


//get 報告
function getOracleReport(){
    const oracle = getOracle();//oracle代號
    const reportSheet = getText(oracle);//以代號從data拿取簽文全文
    //const reportSheet = WDS;
    const stick = getStick();//取得簽號
    const report = reportSheet[stick - 1];//取得簽文內容array
    return report;
}
//生成display html
export function renderOracleDisplay(){
    let html = '<div id= "oracleDisplay">';
    html += refreshOracleDisplay();//內文
    return html + '</div>'    
}

export function refreshOracleDisplay(){
    let html = '';
    let report = getOracleReport();//取得簽文內容array
    let UX = getText('WDS_UX');//取得UX字眼

    //UX = ['籤號','吉凶','占驗古人', '籤文', '背景故事','詳情'];
    if(!report){
        //report = getText('WDS');
    }
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
//生成sidebar html
export function renderOracleSidebar(){
    let html = '<div id = "oracle-sidebar">';
    html += refreshOracleSidebar();
    return html + '</div>'
}

export function refreshOracleSidebar(){
    let html = '';
    let report = getOracleReport();
    if (report) {
        html += report["詳情"];
    } else {
        html = '<p>無法取得籤詩報告。</p>';
    }
    return html;
}

//生成control下拉式選單及random按鈕
export function refreshStickMenu(){
    let html = createStickMenuContent(getOracleListLength());
    let element = document.getElementById("oracleStick");
    let elementPresent = false;
    if(element){elementPresent = true;}
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
    let html = '<div id = oracle>';
    html += createOracleMenu();
    html += createStickMenu(getOracleListLength());
    html += createRandomOracleButton();
    return html + '</div>';
}

function createStickMenuContent(length){
    let html = '';
        for (let i =1; i <= length; i++){
        html +=`<option value = "${i}">${i}</option>`;
    }
    return html;
}
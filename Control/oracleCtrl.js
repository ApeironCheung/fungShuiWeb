import { getOracleList, getOracleListLength, loadOracle, setOracle, setStick } from "../modelAPI";
import { updateSubscription } from "../viewAPI";

export function loadOracleCtrl(){
    loadOracle();
    attachOracleMenuListener();
    attachOracleStickListener();
}

function oraclePressed(oracle){
    setOracle(oracle);
    refreshStickMenu();
}

function stickPressed(stick){
    setStick(stick);
    updateSubscription('ORACLE');
}

function refreshStickMenu(){
    let html = createStickMenuContent(getOracleListLength);
    let element = document.getElementById("oracleStick");
    element.innerHTML = html;
}

export function createOracleMenu(){
    let oracleList = getText('ORACLE_NAME_LIST');
    let html = '<select id = "btn-oracleMenu">';
    let oracleKey = getOracleList();
    for (let i =0;i < oracleList.length;i++){
        let oracle = oracleList[i];
        html += `<option value="${oracleKey[i]}">${oracle}</option>`;
    }
    return html + '</select>';
}

export function createStickMenu(length){
    let html = '<select id = "btn-oracleStick">';
    html += createStickMenuContent(length);
    return html + '</select>';
}
function createStickMenuContent(length){
    let html = '';
        for (let i =0; i < length; i++){
        html +=`option value = "${i+1}">${i+1}</option>`;
    }
    return html;
}
function attachOracleMenuListener(){
    const menuBtn = document.getElementById('btn-oracleMenu');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            oraclePressed(selectedValue); 
        });
    }
}
function attachOracleStickListener(){
    const menuBtn = document.getElementById('btn-oracleStick');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            stickPressed(selectedValue); 
        });
    }
}
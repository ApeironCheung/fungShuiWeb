import { getFunction,setFunction } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";
import { getText } from "../DataAPI.js";
import { loadListeners } from "./loadModel.js";

// 選單的選項定義
let menu = [  ["流年運程", "仙家靈簽", "術數查詢","常用經咒"],//預設語言
                ['controlYear','ORACLE','ASTROLOGY','SUTRAS']];//updateSubscribtion用key

// generate HTML
export function switchPageMenu(){
    let html = '<select id="btn-menuSelect">';
    html += switchPageMenuContent();
    html += "</select>";
    return html;
}
function switchPageMenuContent(){
    let html = '';
        for(let i = 0; i < menu[0].length; i++){
        html += `<option value="${menu[1][i]}">${menu[0][i]}</option>`;
    }
    return html;
}

export function updateMenu(){
    menu[0] = getText("TOP_MENU");//更新語言
     const element = document.getElementById("btn-menuSelect"); 
     const newHtml = switchPageMenuContent();//新html
     element.innerHTML = newHtml;//replace
}

//core logic
function switchFunt(funt){
    let curr = getFunction();
    if(funt == curr){
        return;
    }else{
        setFunction(funt);
    }
    //preload(funt);
    updateSubscription(funt);
    //loadListeners(funt);
}

export function attachMenuListeners() {
    const menuBtn = document.getElementById('btn-menuSelect');

    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            switchFunt(selectedValue);
        });
    }
}
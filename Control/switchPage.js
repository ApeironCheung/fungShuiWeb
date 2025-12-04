import { getFunction,setFunction } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";

// 選單的選項定義
const menu = [  ["流年運程", "仙家靈簽", "術數查詢","常用經咒"],
                ['controlYear','ORACLE','ASTROLOGY','SUTRAS']];

// generate HTML
export function switchPageMenu(){
    let html = '<select id="btn-menuSelect">';

    for(let i = 0; i < menu[0].length; i++){
        // 注意: option 的 value 應該是你要傳遞的值
        html += `<option value="${menu[1][i]}">${menu[0][i]}</option>`;
    }
    html += "</select>";
    return html;
}

//core logic
export function switchFunt(funt){
    let curr = getFunction();
    if(funt == curr){
        return;
    }else{
        setFunction(funt);
    }
    updateSubscription(funt);
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
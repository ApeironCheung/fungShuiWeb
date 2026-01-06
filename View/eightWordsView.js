import { getText } from "../DataAPI.js"
import { calculate5elementStrength, getSixPillars } from "../Model/eightWordsModel.js";
import { getCalendarStyles } from "./calenderView.js";

const fiveElementCSS = `
    .wood: { main: "#2ecc71", grad: "linear-gradient(180deg, #2ecc71, #27ae60)", text: "#1e8449" },
    .fire: { main: "#e74c3c", grad: "linear-gradient(180deg, #e74c3c, #c0392b)", text: "#922b21" },
    .earth: { main: "#a67c52", grad: "linear-gradient(180deg, #a67c52, #8d6e63)", text: "#5d4037" },
    .metal: { main: "#f1c40f", grad: "linear-gradient(180deg, #f1c40f, #f39c12)", text: "#9a7d0a" },
    .water: { main: "#3498db", grad: "linear-gradient(180deg, #3498db, #2980b9)", text: "#1a5276" }
    .pillar-row { display: flex; gap: 10px; }`

function stemAndBranchesText(){
    const stemsText = getText("HEAVENLY_STEMS");
    const branchText = getText("EARTH_BRANCHES");
    let stems = [];
    for(let i=0; i<stemsText.length; i++){
        var element;
        if(i<2){element = "wood"}
        else if(i<4){element = "fire"}
        else if(i<6){element = "earth"}
        else if(i<8){element = "metal"}
        else {element = "water"}
        stems.push(warpWord(element, stemsText[i]))
    }
    let branch = [];
    for(let i=0; i<branchText.length; i++){
        var element; 
        if(i>1 && i<4){element = "wood"}
        else if(i>4 && i<7){element = "fire"}
        else if(i==0 || i==11){element = "water"}
        else if(i>7&&i<10){element = "metal"}
        else {element = "earth"}
        branch.push(warpWord(element, branchText[i]))
    }
    return [stems,branch];
}
function warpWord(id, word){
    return `<div class = ${id}>${word}</div>`;
}

export function create6PillarsView(){
    const id = "sixPillars";
    return` <style>${getCalendarStyles(id)}</style>
    <style>${fiveElementCSS}</style>
    <div id=${id}>${refresh6PillarsView()}</div>`;
}
export function refresh6PillarsView(){
    const sixPillars = getSixPillars();//六柱的int索引
    const text = stemAndBranchesText();//干支的文字
    let html = '';
    for(let i =0; i < sixPillars.length; i++){
        html += `<div>`
        for(let j =0;j<sixPillars[i].length;j++){
            html += `${text[i][sixPillars[j]]}`;
        }
        html += `</div>`
    }
    return html;
}

export function create5elementChartHTML(){
    return `<div id = elementChart>${refresh5elementChartHTML()}</div>`;
}

export function refresh5elementChartHTML() {
    const percentages = calculate5elementStrength.percentages;
    const order = ["木", "火", "土", "金", "水"];
    let segments = [];
    let currentDegree = 0;

    order.forEach(key => {
        const percent = parseFloat(percentages[key]);
        if (percent > 0) {
            const nextDegree = currentDegree + (percent * 3.6); // 1% = 3.6度
            segments.push(`${fiveElement_STYLE[key].main} ${currentDegree}deg ${nextDegree}deg`);
            currentDegree = nextDegree;
        }
    });

    const conic = `conic-gradient(${segments.join(', ')})`;

    return `
        <div style="display: flex; align-items: center; gap: 20px; padding: 20px;">
            <div style="
                width: 180px; height: 180px; 
                border-radius: 50%; 
                background: ${conic};
                position: relative;
                box-shadow: inset 0 0 15px rgba(0,0,0,0.2), 5px 5px 15px rgba(0,0,0,0.1);
            ">
                <div style="
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%);
                "></div>
            </div>
            
            <div style="font-family: sans-serif;">
                ${order.map(key => `
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="display: inline-block; width: 12px; height: 12px; background: ${fiveElement_STYLE[key].main}; margin-right: 8px; border-radius: 2px;"></span>
                        <span style="font-size: 14px;">${key}: <b>${percentages[key]}%</b></span>
                    </div>
                `).join('')}
            </div>
        </div>`;
}
// classicView.js
import { getText } from "../DataAPI.js"; 
import { 
    getSutraType, getSutraBook, getSutraChapter,
    getSutraTypeList, getSutraBookList 
} from "../Model/classicModel.js";

// 生成「種類」選單
function createSutraTypeMenu() {
    return `<select id="btn-sutraType">${refreshSutraTypeMenu()}</select>`;
}

export function refreshSutraTypeMenu(){
    const list = getSutraTypeList();// for value of button
    const current = getSutraType();
    const lang = getText('SUTRA_LIST');//for name of button
    if (!lang) return '<option>Error</option>';
    let html = '';
    for (let i =0;i<lang.length; i++){
        item = list[i];
        html += `<option value="${item}" ${item === current ? 'selected' : ''}>${lang[i]}</option>`;
    }
    return html;    
}

// 生成「書名」選單
function createSutraBookMenu() {
    return `<select id="btn-sutraBook">${refreshSutraBookMenu()}</select>`;
}
export function refreshSutraBookMenu(){
    const list = getSutraBookList(); //for value of button
    const current = getSutraBook();
    const lang = getText('SUTRA_BOOK_MAPPING')[current];//for name of button
    let html =''
    for(let i =0;i<lang.length;i++){
        item = list[i];
        html += `<option value="${item}" ${item === current ? 'selected' : ''}>${lang[i]}</option>`;
    }
    return html;
}

function createChapterMenu(){
    return `<select id="btn-sutraChapter">${refreshSutraChapterMenu()}</select>`;
}
// 生成「章節」選單 (核心邏輯：根據 Data 長度)
export function refreshSutraChapterMenu() {
    const book = getSutraBook();
    const currentIdx = getSutraChapter();
    const data = getText(book);   
    //const langArray = (data && data[lang]) ? data[lang] : [];
    let html = '';    
    if (data.length === 0) {
        html += `<option value="0">內容準備中</option>`;
    } else {
        langArray.forEach((_, index) => {
            html += `<option value="${index}" ${index === currentIdx ? 'selected' : ''}>第 ${index + 1} 章</option>`;
        });
    }
    return html;
}

export function createClassicCtrl(){
    let html = '<div id=classicCtrl>';
    html += createSutraTypeMenu();
    html += createSutraBookMenu();
    html += createChapterMenu();
    return html + '</div>';
}

// 渲染內文 (核心邏輯：Exception Handling)
export function createSutraDisplay(){
    return  `<div class="sutra-content">${refreshSutraDisplay()}</div>`;
}
export function refreshSutraDisplay() {
    const book = getSutraBook();
    const chapter = getSutraChapter();
    const data = getText(book);
    const title = data[0];
    
    const content = data ? data[chapter] : null;

    if (!content || content.trim() === "") {
        return `<div class="construction"><h3>${title}</h3><p>🚧 此內容尚在整理錄入中，請稍候再試。</p></div>`;
    }

    return `<h2>${title}</h2>
            <div class="content-body">${content}</div>`;
}
export function createSutraExplain(){
    return `<div id="sutraExplain">${refreshSutraExplain}</div>`
}
export function refreshSutraExplain(){
    const book = getSutraBook();
    const explain = book + "_EXPLAIN";
    const content = getText(explain);
    return content;
}
// globalState.js

// 預設功能和語言
const funtSet = ["YEAR_FORTUNE", "ORACLE", "CALCULATOR"];
let currentFunction = funtSet[0]; // 預設：流年運程 (九宮飛星)
export const languageSet = ['ZH','EN'];
let currentLanguage = languageSet[0];          // 預設：中文 (ZH: Traditional Chinese, EN: English)

/**
 * 設置當前語言並通知更新
 * @param {string} langCode - 語言代碼 (ZH/EN)
 */
export function setLanguage(langCode) {
    if (currentLanguage !== langCode) {
        for(let i = 0; i < languageSet.length; i++){
            if (langCode== languageSet[i]){
                currentLanguage = langCode;
                return;
            }
        }        
    }
    return;
}

export function getLanguage() {
    return currentLanguage;
}

/**
 * 設置當前功能頁面
 * @param {string} funcCode - 功能代碼 (如: FLYING_STAR, FORTUNE_STICKS)
 */
export function setFunction(funcCode) {
    if (currentFunction !== funcCode) {
        currentFunction = funcCode;
        console.log(`功能切換至: ${funcCode}`);
    }
}

export function getFunction() {
    return currentFunction;
}
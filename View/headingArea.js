// View/headingArea.js

import { languageSet,getLanguage } from '../managmentAPI.js'; 
import { switchPageMenu } from '../ctrlAPI.js';

export const HEADING_CONTAINER_ID = "heading-area";

function languageButton(){
    let html = "";
    let n = languageSet.length;
    const currentLang = getLanguage(); 

    for (let i = 0; i < n ; i++){
        const langCode = languageSet[i];
        const isActive = langCode === currentLang ? ' active' : '';
        
        html += `<button id="btn-lang-${langCode}" 
                          data-lang="${langCode}" 
                          class="lang-button${isActive}">
                      ${langCode}
                  </button>`;
    }
    return html;
}



function banner(){
    return '<img src="../Data/banner.png" alt="應用程式橫額">';
}

export function headingHtml(){
    let html = `<div id="${HEADING_CONTAINER_ID}" style="display: flex; flex-direction: row; align-items: center; margin-bottom: 20px;">`;
    html += banner();
    html += '<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 10px;">';
    html += languageButton();
    html += '<br>';
    html += switchPageMenu();
    html += '</div>';
    html += "</div>";
    return html;
}
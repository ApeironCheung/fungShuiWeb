import { updateMenu } from "../ctrlAPI.js";
import { getFunction,languageSet,getLanguage, setLanguage } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";

function switchLang(lang){
    setLanguage(lang);
    updateMenu();
    let funt = getFunction();
    updateSubscription(funt);
}

export function languageButton(){
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

export function attachLangListeners() {
    const langBtn = document.getElementById('btn-lang');

    if (langBtn) {
        langBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            switchLang(selectedValue);
        });
    }
}

function attachLangListener(lang){
    
}

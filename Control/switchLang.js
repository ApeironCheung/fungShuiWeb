import { updateMenu } from "../ctrlAPI.js";
import { getFunction,languageSet,getLanguage, setLanguage } from "../managmentAPI.js";
import { updateSubscription } from "../viewAPI.js";

function switchLang(lang){
    if(lang == getLanguage()){
        return;
    }
    setLanguage(lang);
    updateMenu();
    let funt = getFunction();
    updateSubscription(funt);
}

export function languageButton(){
    let html = "";

    html += "<div id='language-bar'>"

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
    html += "</div>"
    return html;
}

export function attachLangListeners() {
  let n = languageSet.length;
  for (let i =0; i<n; i++){
        attachControlListener(languageSet[i]);
  }
}

function attachControlListener(langCode){
    const langBtn = document.getElementById(`btn-lang-${langCode}`);

    if (langBtn) {
        langBtn.addEventListener('click', function(event) {
            const selectedValue = event.currentTarget.dataset.lang;         
            switchLang(selectedValue);
        });
    }
}
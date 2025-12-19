//classicCtrl.js

import { setSutraChapter, setSutraType } from "../Model/classicModel.js";
import { updateSubscription } from "../viewAPI.js";

function sutraTypePressed (type){
    setSutraType(type);
    updateSubscription('SUTRA')
}
function sutraBookPressed (book){
    setSutraBook(book);
    updateSubscription('SUTRA_BOOK')
}
function sutraChapterPressed(chapter){
    setSutraChapter(chapter);    
    updateSubscription('SUTRA_CHAPTER')
}

function attachSutraTypeListener(){
    const menuBtn = document.getElementById('btn-sutraType');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            sutraTypePressed(selectedValue); 
        });
    }
}
function attachSutraBookListener(){
    const menuBtn = document.getElementById('btn-sutraBook');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            sutraBookPressed(selectedValue); 
        });
    }
}

function attachSutraChapterListener(){
    const menuBtn = document.getElementById('btn-sutraChapter');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            sutraChapterPressed(selectedValue); 
        });
    }
}

export function attachClassicListeners(){
    attachSutraTypeListener();
    attachSutraBookListener();
    attachSutraChapterListener();
}
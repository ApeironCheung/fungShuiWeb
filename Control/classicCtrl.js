//classicCtrl.js

import { setSutraBook,
        setSutraChapter, 
        setSutraType } from "../modelAPI.js";

import { updateSubscription } from "../viewAPI.js";
import { attachListener } from "./attachListener.js";


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

export function attachClassicListeners(){
    attachListener('btn-sutraType',sutraTypePressed);
    attachListener('btn-sutraBook',sutraBookPressed);
    attachListener('btn-sutraChapter',sutraChapterPressed); 
}
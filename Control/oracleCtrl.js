//oracleCtrl.js

import { getOracleListLength, setOracle, setStick } from "../modelAPI";
import { updateSubscription } from "../viewAPI";

export function attachOracleListeners(){
    attachOracleMenuListener();
    attachOracleStickListener();
    attachOracleRandomListener();
}

function oraclePressed(oracle){
    setOracle(oracle);
    updateSubscription('ORACLE_STICK')// call refreshStickMenu();
}

function stickPressed(stick){
    setStick(stick);
    updateSubscription('ORACLE_DISPLAY')//call refreshOracleDisplay();
}

function randomStickPressed(){
    let length = getOracleListLength();
    let ran = Math.random() * length;
    stickPressed(ran);
}
function attachOracleMenuListener(){
    const menuBtn = document.getElementById('btn-oracleMenu');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            oraclePressed(selectedValue); 
        });
    }
}
function attachOracleStickListener(){
    const menuBtn = document.getElementById('btn-oracleStick');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {
            const selectedValue = event.target.value;           
            stickPressed(selectedValue); 
        });
    }
}

function attachOracleRandomListener(){
        const menuBtn = document.getElementById('btn-oracleRandom');
    if (menuBtn) {
        menuBtn.addEventListener('change', function(event) {         
            randomStickPressed(); 
        });
    }
}
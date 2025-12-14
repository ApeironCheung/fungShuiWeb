//oracleCtrl.js

import { getOracleListLength, setOracle, setStick } from "../modelAPI.js";
import { updateSubscription } from "../View/render.js";

export function attachOracleListeners(){
    attachOracleMenuListener();
    attachOracleStickListener();
    attachOracleRandomListener();
}

function oraclePressed(oracle){
    setOracle(oracle);
    setStick(1);
    updateSubscription('ORACLE')// call refreshStickMenu();
}

function stickPressed(stick){
    setStick(stick);
    updateSubscription('ORACLE_DISPLAY')//call refreshOracleDisplay();
}

function randomStickPressed(){
    let length = getOracleListLength();
    let ran = Math.floor(Math.random() * length) + 1;
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
        menuBtn.addEventListener('click', function(event) {         
            randomStickPressed(); 
        });
    }
}
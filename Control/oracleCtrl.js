//oracleCtrl.js

import { getOracleListLength, setOracle, setStick } from "../modelAPI.js";
import { updateSubscription } from "../View/render.js";
import { attachListener } from "./attachListener.js";

export function attachOracleListeners(){
    attachListener('btn-oracleMenu', oraclePressed);
    attachListener('btn-oracleStick', stickPressed);
    attachListener('btn-oracleRandom', randomStickPressed, 'click');
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
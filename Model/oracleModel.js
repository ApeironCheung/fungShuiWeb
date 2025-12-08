import {getText} from '../DataAPI.js';

const oracleList = ['WDS','Lui Jo', 'Goon Yum', 'Lo Zi', 'Confucius', 'Ma Jo']
let oracle = oracleList[0];
let stick = 1;
let loaded = false
let list = [];

export function loadOracle(){
    if (!loaded){
        loaded = true;
        list = getText(oracle)
    }
}

export function setOracle(input){
    for (let i = 0; i < oracleList.length; i++){
        if(input == oracleList[i]){
            oracle = oracleList[i];

        }
    }
}

export function getOracleList(){
    return oracleList;
}

export function getOracleListLength(){
    return oracleList.length;
}

export function getOracle(){
    return oracle;
}

export function setStick(input){
    if(input > 0 || input <= list.length){
        stick = input;
    }
}

export function getOracleReport(){
    return list[stick];
}
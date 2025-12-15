//oracleModel.js

const oracleList = ['WDS','Lui_Jo', 'Confucius', 'Lo_Zi', 'Buddha', 'Goon_Yum','Ma_Jo']
const listLength = [100, 100, 100, 28, 51, 100, 60 ];
let oracle = 0;
let stick = 1;

export function getOracleList(){
    return oracleList;
}

export function setOracle(input){
    for (let i = 0; i < oracleList.length; i++){
        if(input == oracleList[i]){
            oracle = i;
        }
    }
}

export function getOracleListLength(){
    return listLength[oracle];
}

export function getOracle(){
    return oracleList[oracle];
}

export function getStick(){
    return stick;
}

export function setStick(input){
    if(input > 0 && input <= listLength[oracle]){
        stick = input;
    }
}

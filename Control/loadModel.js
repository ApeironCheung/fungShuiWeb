import { attachControlListeners } from "./controlYear";
import { attachOracleListeners, loadOracleCtrl } from "./oracleCtrl";

export function preload(funt){
    switch (funt){
        case 'ORACLE':
            loadOracleCtrl();
            break;
    }
}

export function loadListeners(funt){
    switch (funt){
        case 'controlYear':
            attachControlListeners();
            break;
        case 'ORACLE':
            attachOracleListeners();
            break;
    }
}
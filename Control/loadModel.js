import { loadOracleCtrl } from "./oracleCtrl";

export function preload(funt){
    switch (funt){
        case 'ORACLE':
            loadOracleCtrl();
            break;
    }
}
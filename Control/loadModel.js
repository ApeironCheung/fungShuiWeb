import { loadOracle} from "../modelAPI";

export function preload(funt){
    switch (funt){
        case 'ORACLE':
            loadOracle();
            break;
    }
}
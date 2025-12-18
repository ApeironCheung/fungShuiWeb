//classicModel.js
const SUTRA_TYPE_LIST = ['道家經典', '佛教法寶', '道家咒文', '佛教咒文', '儒家經典'];

const SUTRA_BOOK_MAP = {
    '道家經典': ["道德經", "黃帝陰符經", "太上清靜經", "逍遙遊"],
    '佛教法寶': ["觀音心經", "金剛經", "佛說海龍王經"],
    '道家咒文': ["觀音救苦經", "淨天地神咒", "金光神咒", "衞靈神咒", "請社令咒", "開光令"],
    '佛教咒文': ["大悲咒", "佛說摩利支天陀羅尼咒經", "準提神咒"],
    '儒家經典': ["易經"]
};

let SUTRA_TYPE = SUTRA_TYPE_LIST[0];
let SUTRA_BOOK = SUTRA_BOOK_MAP[SUTRA_TYPE][0];
let SUTRA_CHAPTER = 0;

export function getSutraType(){return SUTRA_TYPE;}
export function setSutraType(input){
    if(input != SUTRA_TYPE){
        for(let i=0;i<SUTRA_TYPE_LIST.length;i++){
            if(input === SUTRA_TYPE_LIST[i]){
                SUTRA_TYPE = SUTRA_TYPE_LIST[i];
                SUTRA_BOOK = SUTRA_BOOK_MAP[SUTRA_TYPE][0];
                SUTRA_CHAPTER = 0;
            }
        } 
    }
}
export function getSutraBook(){return SUTRA_BOOK;}
export function setSutraBook(input){
    if(input != SUTRA_BOOK){
        for(let i=0;i<SUTRA_BOOK_MAP[SUTRA_TYPE].length;i++){
            if(input === SUTRA_BOOK_MAP[SUTRA_TYPE][i]){
                SUTRA_BOOK = SUTRA_BOOK_MAP[SUTRA_TYPE][i];
                SUTRA_CHAPTER = 0;
            }
        }
    }
}
export function getSutraChapter(){return SUTRA_CHAPTER;}
//contract: input must be in sutra_book.length
export function setSutraChapter(input){
    if(input != SUTRA_CHAPTER && input >=0){
        SUTRA_CHAPTER = input;
    }
}
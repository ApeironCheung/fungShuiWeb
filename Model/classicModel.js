//classicModel.js
const SUTRA_TYPE_LIST = ['TAOIST_CLASSIC', 'BUDDHIST_CLASSIC', 'TAOIST_SUTRA', 'BUDDHIST_SUTRA', 'CONFUCIUS_CLASSIC'];

const SUTRA_BOOK_MAP = {
    'TAOIST_CLASSIC': ["ON_TAO_AND_VIRTUE", "YELLOW_EMPEROR_HIDDEN_TALISMAN", "BOOK_OF_QUIET_AND_PURE", "FREE_WANDERING"],
    'BUDDHIST_CLASSIC': ["HEART_SUTRA", "DIAMOND_SUTRA", "SEA_DRAGON_KING_CLASSIC"],
    'TAOIST_SUTRA': ["GOON_YUM_GAO_FOO_GING", "JING_TINIDEI_SAN_JAU", "GAM_GWONG_SAN_JAU", "WAI_LING_SAN_JAU", "CHING_SE_LING_JAU", "HOI_GWONG_LING"],
    'BUDDHIST_SUTRA': ["DAAI_BEI_JAU", "MARICI_SUTRA", "JUNTI_SUTRA"],
    'CONFUCIUS_CLASSIC': ["BOOK_OF_CHANGES"]
};

let SUTRA_TYPE = SUTRA_TYPE_LIST[0];
let SUTRA_BOOK = SUTRA_BOOK_MAP[SUTRA_TYPE][0];
let SUTRA_CHAPTER = 1;

export function getSutraType(){return SUTRA_TYPE;}
export function setSutraType(input){
    if(input != SUTRA_TYPE){
        for(let i=0;i<SUTRA_TYPE_LIST.length;i++){
            if(input === SUTRA_TYPE_LIST[i]){
                SUTRA_TYPE = SUTRA_TYPE_LIST[i];
                SUTRA_BOOK = SUTRA_BOOK_MAP[SUTRA_TYPE][0];
                SUTRA_CHAPTER = 1;
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
                SUTRA_CHAPTER = 1;
            }
        }
    }
}
export function getSutraChapter(){return SUTRA_CHAPTER;}
//contract: input must be in sutra_book.length
export function setSutraChapter(input){
    const chapter = parseInt(input);
    if(chapter != SUTRA_CHAPTER && chapter >0){
        SUTRA_CHAPTER = chapter;
    }
}
export function getSutraBookList(){
    return SUTRA_BOOK_MAP[SUTRA_TYPE] || [];
}
export function getSutraTypeList(){return SUTRA_TYPE_LIST;}
// localizationData.js
import { getLanguage } from '../managmentAPI.js';
import { ORACLE_NAME_LIST, WDS, WDS_UX } from './oracleWDS.js';
import { Goon_Yum } from './oracleGoonYum.js';
import { Lui_Jo } from './oracleLuiJo.js';
import { Lo_Zi } from './oracleLoZi.js';
import { Ma_Jo } from './oracleMaJo.js';
import { Confucius } from './oracleConfucius.js';
import { Buddha } from './oracleBuddha.js';
import { SUTRA_LIST, SUTRA_BOOK_MAPPING,
     TAOIST_CLASSIC, BUDDHIST_CLASSIC,
    TAOIST_SUTRA, BUDDHIST_SUTRA,
    CONFUCIUS_CLASSIC,
    GOON_YUM_GAO_FOO_GING, DAAI_BEI_JAU,
    ON_TAO_AND_VIRTUE, BOOK_OF_QUIET_AND_PURE,
    HEART_SUTRA, FREE_WANDERING, DIAMOND_SUTRA,
    SEA_DRAGON_KING_CLASSIC, JING_TIN_DEI_SAN_JAU,
    GAM_GWONG_SAN_JAU, WAI_LING_SAN_JAU, CHING_SE_LING_JAU,
    JUNTI_SUTRA, BOOK_OF_CHANGES,MARICI_SUTRA
 } from './sutra.js';
const TOP_MENU = {'ZH': ["流年運程", "仙家靈簽", "術數查詢","常用經咒"],
               'EN': ['HOROSCOPE','ORACLE','ASTROLOGY','SUTRAS']};

const ZODIAC = {
    'ZH':["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"]
}
const HEAVENLY_STEMS = {
    'ZH':["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
    'EN':["Active Wood", "Passive Wood",
        "Active Fire", "Passive Fire",
        "Active Earth", "Passive Earth",
        "Active Metal", "Passive Metal",
        "Active Water", "Passive Water"
    ]
}
const EARTH_BRANCHES = {
    'ZH':["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"]
}

const TAI_SHUI_CONFLICT_MAPPING = {
    'ZH':["值太歲", "沖太歲","刑太歲","破太歲","害太歲"],
    'EN':["Clashing","Conflict","Being Punishing","Breaking","Harmful connection"]
}
const TAI_SHUI_CURR = {
    'ZH':["值年太歲: "],
    'EN':["Tai Shui of the year: "]
}
const TAI_SHUI_DEITIES = {
    'ZH':[
    "金辨大將軍", "陳材大將軍", "耿章大將軍", "沉興大將軍",
    "趙達大將軍", "郭燦大將軍", "王清大將軍", "李素大將軍",
    "劉旺大將軍", "康志大將軍", "施廣大將軍", "任保大將軍",
    "郭嘉大將軍", "汪文大將軍", "曾光大將軍", "龍仲大將軍",
    "董德大將軍", "鄭但大將軍", "陸明大將軍", "魏仁大將軍",
    "方杰大將軍", "蔣崇大將軍", "白敏大將軍", "封濟大將軍",
    "鄒鏜大將軍", "潘佐大將軍", "鄔桓大將軍", "范寧大將軍",
    "彭泰大將軍", "徐華大將軍", "章詞大將軍", "楊仙大將軍",
    "管仲大將軍", "唐傑大將軍", "姜武大將軍", "謝燾大將軍",
    "虞起大將軍", "楊信大將軍", "賢諤大將軍", "皮時大將軍",
    "李誠大將軍", "吳遂大將軍", "文哲大將軍", "繆丙大將軍",
    "徐浩大將軍", "程寶大將軍", "倪秘大將軍", "葉堅大將軍",
    "丘德大將軍", "朱得大將軍", "張朝大將軍", "萬清大將軍",
    "辛亞大將軍", "楊彥大將軍", "黎卿大將軍", "傅黨大將軍",
    "毛梓大將軍", "石政大將軍", "洪充大將軍", "虞程大將軍"
],
'EN':["Marshal Kam Pin","Marshal Chan Choi","Marshal Kang Cheung","Marshal Shum Hing",
    "Marshal Chiu Tat","Marshal Kwok Chan","Marshal Wong Chai","Marshal Lee So",
    "Marshal Lau Wong","Marshal Hong Chi","Marshal Sze Kwong","Marshal Yam Po",
    "Marshal Kwok Ka","Marshal Wong Man","Marshal Lo Sin","Marshal Lung Chung",
    "Marshal Tung Tak","Marshal Cheng Tan","Marshal Luk Ming","Marshal Ngai Yan",
    "Marshal Fong Cheung","Marshal Cheung Sung","Marshal Kwok Chi","Marshal Fung Chai",
    "Marshal Chau Tong","Marshal Fu Yau","Marshal Woo Wun","Marshal Fan Ning",
    "Marshal Pang Tai","Marshal Tsui Wa","Marshal Cheung Chi","Marshal Yeung Sin",
    "Marshal Koon Chung","Marshal Tong Kit","Marshal Keung Mo","Marshal Tse Sau",
    "Marshal Lo Bei","Marshal Yeung Shun","Marshal Ho Ngok","Marshal Pei Sze",
    "Marshal Lee Sing","Marshal Ng Sui","Marshal Wai Tat","Marshal Fu Chi",
    "Marshal Tsui Ho","Marshal Ching Po","Marshal Ngai Bei","Marshal Yip Kin",
    "Marshal Yau Tak","Marshal Chu Tak","Marshal Cheung Chiu","Marshal Man Ching",
    "Marshal San Kung","Marshal Yeung Yin","Marshal Lai Hing","Marshal Fu Sheung",
    "Marshal Mo Chi","Marshal Shek Ching","Marshal Hung Chung","Marshal Yu Ching"]
};

const YEAR_BUTTON = {
    'ZH':["今年","明年"],
    'EN':["current year","next year"]
}
const YEAR_BUTTON_SPECIAL = {
    'ZH':["管理員模式：選擇年份","確認年份"],
    'EN':["Admin mode: select year","Confirm"]
}

// --- 飛星常數 ---
const STAR_NAMES = {'ZH':{
    1: "一白貪狼星<br>(桃花, 財運)",
    2: "二黑病符星<br>(疾病, 災禍) ",
    3: "三碧是非星<br>(爭執, 官訟) ",
    4: "四綠文昌星<br>(學業, 文職) ",
    5: "五黃廉貞星<br>(大煞, 災難) ",
    6: "六白武曲星<br>(權力, 橫財)",
    7: "七赤破軍星<br>(破財, 口舌)",
    8: "八白左輔星<br>(財富, 吉慶)",
    9: "九紫右弼星<br>(喜慶, 姻緣) "},
    'EN':{
    1: "1 White Greed Wolf Star<br>(Romance, Wealth)", 
    2: "2 Black Sickness Star<br>(Illness, Disaster)",
    3: "3 Green Argument Star<br>(Conflict, Lawsuit)", 
    4: "4 Green Literary Star<br>(Study, Career)",
    5: "5 Yellow Disaster Star<br>(Grand Misfortune)", 
    6: "6 White Military Star<br>(Authority, Windfall)",
    7: "7 Red Army Breaker Star<br>(Loss, Disputes)", 
    8: "8 White Left Assistant Star<br>(Fortune, Joy)",
    9: "9 Purple Right Helper Star<br>(Celebration, Marriage)"
    }
};

// --- 八卦方位 ---
const DIRECTIONS = {'ZH':[
    ['西北', '正北', '東北'],
    ['正西', '中宮', '正東'],
    ['西南', '正南', '東南']],
    'EN':[
    ['Northwest', 'North', 'Northeast'],
    ['West', 'Center', 'East'],
    ['Southwest', 'South', 'Southeast']
    ]
};

const UX_WORD = {
    'ZH':['流年運程','年九宮飛星圖','切換至','顯示','流年圖表','年為','年'],
    'EN':['Annual Fortune Calculator','Fung Shui Graph','Change to','Change to','Graph','is','year']  
}

const headingMenu = {
    'ZH':["流年運程", "仙家靈簽", "術數查詢","常用經咒"],
    'EN':["Horoscope", "Oracle", "Astrology", "Sutras"]
}

const LOCAL_DATA = {
    TOP_MENU, ZODIAC, HEAVENLY_STEMS, EARTH_BRANCHES, 
    TAI_SHUI_CONFLICT_MAPPING, TAI_SHUI_CURR, TAI_SHUI_DEITIES,
    YEAR_BUTTON, YEAR_BUTTON_SPECIAL,
    STAR_NAMES, DIRECTIONS,
    UX_WORD,
    WDS, WDS_UX, ORACLE_NAME_LIST, Goon_Yum, Lui_Jo, Lo_Zi, Ma_Jo, Confucius, Buddha,
    headingMenu,
    SUTRA_LIST, SUTRA_BOOK_MAPPING,
     TAOIST_CLASSIC, BUDDHIST_CLASSIC,
    TAOIST_SUTRA, BUDDHIST_SUTRA,
    CONFUCIUS_CLASSIC,
    GOON_YUM_GAO_FOO_GING, DAAI_BEI_JAU,
    ON_TAO_AND_VIRTUE, BOOK_OF_QUIET_AND_PURE,
    HEART_SUTRA, FREE_WANDERING, DIAMOND_SUTRA,
    SEA_DRAGON_KING_CLASSIC, JING_TIN_DEI_SAN_JAU,
    GAM_GWONG_SAN_JAU, WAI_LING_SAN_JAU, CHING_SE_LING_JAU,
    JUNTI_SUTRA, BOOK_OF_CHANGES,MARICI_SUTRA
}

export function getText(key){
    const lang = getLanguage();
    if (!LOCAL_DATA[key]) {
        console.warn(`Localization key "${key}" not found.`);
        return null;
    }

//預設回傳中文
    const localizedData = LOCAL_DATA[key][lang] || LOCAL_DATA[key]['ZH'];
    // typeof localizedData === 'object' 包含 Array 和 Object
    if (typeof localizedData === 'object' && localizedData !== null) {
        // 使用 JSON 進行 Deep Copy，處理 1D/2D Array 和 Key/Value Object
        return JSON.parse(JSON.stringify(localizedData)); 
    }
   
    return localizedData;
}

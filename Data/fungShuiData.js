
export const TOP_MENU = {'ZH': ["流年運程", "仙家靈簽", "術數查詢","常用經咒","節氣誕期"],
               'EN': ['HOROSCOPE','ORACLE','ASTROLOGY','SUTRAS','CALENDAR']};

export const ZODIAC = {
    'ZH':["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"]
}
export const HEAVENLY_STEMS = {
    'ZH':["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
    'EN':["Active Wood", "Passive Wood",
        "Active Fire", "Passive Fire",
        "Active Earth", "Passive Earth",
        "Active Metal", "Passive Metal",
        "Active Water", "Passive Water"
    ]
}

export const SIX_PILLAR = {
    'ZH':['時','日','月','年','運','歲'],
    'EN':['Hour','Day','Month','Year','Cycle','Annual']
}

export const EIGHT_PILLAR = {
    'ZH':['流日','流月','流年','大運','時柱','日柱','月柱','年柱'],
    'EN':['Today','This Month', 'This Year', 'Cycle','Hour','Day','Month','Year',]
}

export const EIGHT_WORDS_CHART_UI = {
    'ZH':['木', '火','土','金','水','八字','流年','流日'],
    'EN':['WOOD','FIRE','EARTH','METAL','WATER','8 WORDS','CURRENT YEAR', 'TODAY']
}

export const EIGHT_WORDS_UI ={
    'ZH':['出生時間：','性別：','乾造 (男)','坤造 (女)','開始排盤','日主'],
    'EN':['Birth Time:','Sex', 'Gentleman', 'Lady', 'Start Calculation','Day Master']
}

export const EARTH_BRANCHES = {
    'ZH':["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"]
}

export const TEN_GODS = {
    'ZH': [
        "劫財", "比肩", // 距離 0 (同我): 異, 同
        "傷官", "食神", // 距離 1 (我生): 異, 同
        "正財", "偏財", // 距離 2 (我剋): 異, 同
        "正官", "七殺", // 距離 3 (剋我): 異, 同
        "正印", "偏印"  // 距離 4 (生我): 異, 同
    ],
    'EN': [
        "Rob Wealth", "Friend",         // Distance 0
        "Hurting Officer", "Eating God",// Distance 1
        "Direct Wealth", "Indirect Wealth", // Distance 2
        "Direct Officer", "7-Killings",     // Distance 3
        "Direct Resource", "Indirect Resource" // Distance 4
    ]
}

export const TAI_SHUI_CONFLICT_MAPPING = {
    'ZH':["值太歲", "沖太歲","刑太歲","破太歲","害太歲"],
    'EN':["Clashing","Conflict","Being Punishing","Breaking","Harmful connection"]
}
export const TAI_SHUI_CURR = {
    'ZH':["值年太歲: "],
    'EN':["Tai Shui of the year: "]
}
export const TAI_SHUI_DEITIES = {
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

export const YEAR_BUTTON = {
    'ZH':["今年","明年"],
    'EN':["current year","next year"]
}
export const YEAR_BUTTON_SPECIAL = {
    'ZH':["管理員模式：選擇年份","確認年份"],
    'EN':["Admin mode: select year","Confirm"]
}

// --- 飛星常數 ---
export const STAR_NAMES = {'ZH':{
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
export const DIRECTIONS = {'ZH':[
    ['西北', '正北', '東北'],
    ['正西', '中宮', '正東'],
    ['西南', '正南', '東南']],
    'EN':[
    ['Northwest', 'North', 'Northeast'],
    ['West', 'Center', 'East'],
    ['Southwest', 'South', 'Southeast']
    ]
};

export const UX_WORD = {
    'ZH':['流年運程','年九宮飛星圖','切換至','顯示','流年圖表','年為','年'],
    'EN':['Annual Fortune Calculator','Fung Shui Graph','Change to','Change to','Graph','is','year']  
}

export const headingMenu = {
    'ZH':["流年運程", "仙家靈簽", "術數查詢","常用經咒"],
    'EN':["Horoscope", "Oracle", "Astrology", "Sutras"]
}
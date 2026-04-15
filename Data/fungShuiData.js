
export const TOP_MENU = {'ZH': ["流年運程", "仙家靈簽", "八字算命","紫微斗數","天罡秤骨","常用經咒","節氣誕期","九星氣學"],
               'EN': ['HOROSCOPE','ORACLE','8 WORDS','POLAR ASTRO','BONE WEIGH','SUTRAS','CALENDAR','9 STAR KIGAKU'],
            'FR': ['HOROSCOPE ANNUEL', 'ORACLE DIVIN', '8 MOTS', 'ASTRO POLAIRE', 'POIDS DES OS', 'SUTRAS', 'CALENDRIER SOLAIRE', '9 ÉTOILES KIGAKU']};

export const ZODIAC = {
    'ZH':["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","豬"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"],
    'FR':["Rat","Bœuf","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"]
}
export const HEAVENLY_STEMS = {
    'ZH':["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
    'EN':["Active Wood", "Passive Wood",
        "Active Fire", "Passive Fire",
        "Active Earth", "Passive Earth",
        "Active Metal", "Passive Metal",
        "Active Water", "Passive Water"
    ],
    'FR':["Bois Yang", "Bois Yin", "Feu Yang", "Feu Yin", "Terre Yang", "Terre Yin", "Métal Yang", "Métal Yin", "Eau Yang", "Eau Yin"]
}

export const ASTROLOGY_SELECTOR_UI = {
    'ZH' : ['八字算命','紫微斗數','天罡秤骨','奇門遁甲','河洛理數'],
    'EN' : ['8 WORDS', 'POLAR STAR','BONE WEIGHT','GATE ESCAPE', 'RIVER BOOKS'],
    'FR' : ['8 MOTS', 'ASTRO POLAIRE', 'POIDS DES OS', 'QI MEN DUN JIA', 'LIVRE DU FLEUVE LO']
}

export const SIX_PILLAR = {
    'ZH':['時','日','月','年','運','歲'],
    'EN':['Hour','Day','Month','Year','Cycle','Annual'],
    'FR':['Heure','Jour','Mois','Année','Grand Cycle','Annuel']
}

export const EIGHT_PILLAR = {
    'ZH':['流日','流月','流年','大運','時柱','日柱','月柱','年柱'],
    'EN':['Today','This Month', 'This Year', 'Cycle','Hour','Day','Month','Year',],
    'FR':['Jour Actuel','Mois Actuel','Année Actuelle','Grand Cycle','Pilier de l’Heure','Pilier du Jour','Pilier du Mois','Pilier de l’Année']
}

export const EIGHT_WORDS_CHART_UI = {
    'ZH':['木', '火','土','金','水','八字','流年','流日'],
    'EN':['WOOD','FIRE','EARTH','METAL','WATER','8 WORDS','CURRENT YEAR', 'TODAY'],
    'FR':['BOIS','FEU','TERRE','MÉTAL','EAU','8 MOTS','ANNÉE ACTUELLE','AUJOURD’HUI']
}

export const EIGHT_WORDS_UI ={
    'ZH':['出生時間：','性別：','乾造 (男)','坤造 (女)','開始排盤','日主'],
    'EN':['Birth Time:','Sex', 'Gentleman', 'Lady', 'Start Calculation','Day Master'],
    'FR':['Heure de Naissance :','Sexe', 'Homme (Qian)', 'Femme (Kun)', 'Calculer le Thème','Maître du Jour']
}

export const EARTH_BRANCHES = {
    'ZH':["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
    'EN':["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Cock","Dog","Pig"],
    'FR':["Rat","Bœuf","Tigre","Lapin","Dragon","Serpent","Cheval","Chèvre","Singe","Coq","Chien","Cochon"]
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
    ],
    'FR': ["Pillage de Richesse", "Ami", "Officier Blessant", "Dieu de la Nourriture", "Richesse Directe", "Richesse Indirecte", "Officier Droit", "7-Tueries", "Ressource Directe", "Ressource Indirecte"]
}

export const TAI_SHUI_CONFLICT_MAPPING = {
    'ZH':["值太歲", "沖太歲","刑太歲","破太歲","害太歲"],
    'EN':["Clashing","Conflict","Being Punishing","Breaking","Harmful connection"]
}
export const TAI_SHUI_CURR = {
    'ZH':["值年太歲: "],
    'EN':["Tai Shui of the year: "],
    'FR':["Position de Tai Shui", "Conflit Direct", "Punition", "Destruction", "Dommage"]
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
    "Marshal Mo Chi","Marshal Shek Ching","Marshal Hung Chung","Marshal Yu Ching"],
'FR':["Général Kam Pin","Général Chan Choi","Général Kang Cheung","Général Shum Hing",
        "Général Chiu Tat","Général Kwok Chan","Général Wong Chai","Général Lee So",
        "Général Lau Wong","Général Hong Chi","Général Sze Kwong","Général Yam Po",
        "Général Kwok Ka","Général Wong Man","Général Lo Sin","Général Lung Chung",
        "Général Tung Tak","Général Cheng Tan","Général Luk Ming","Général Ngai Yan",
        "Général Fong Cheung","Général Cheung Sung","Général Kwok Chi","Général Fung Chai",
        "Général Chau Tong","Général Fu Yau","Général Woo Wun","Général Fan Ning",
        "Général Pang Tai","Général Tsui Wa","Général Cheung Chi","Général Yeung Sin",
        "Général Koon Chung","Général Tong Kit","Général Keung Mo","Général Tse Sau",
        "Général Lo Bei","Général Yeung Shun","Général Ho Ngok","Général Pei Sze",
        "Général Lee Sing","Général Ng Sui","Général Wai Tat","Général Fu Chi",
        "Général Tsui Ho","Général Ching Po","Général Ngai Bei","Général Yip Kin",
        "Général Yau Tak","Général Chu Tak","Général Cheung Chiu","Général Man Ching",
        "Général San Kung","Général Yeung Yin","Général Lai Hing","Général Fu Sheung",
        "Général Mo Chi","Général Shek Ching","Général Hung Chung","Général Yu Ching"]
};

export const YEAR_BUTTON = {
    'ZH':["今年","明年"],
    'EN':["current year","next year"],
    'FR':["Cette année", "L'année prochaine"]
}
export const YEAR_BUTTON_SPECIAL = {
    'ZH':["管理員模式：選擇年份","確認年份"],
    'EN':["Admin mode: select year","Confirm"],
    'FR':["Mode administrateur : choisir l'année", "Confirmer l'année"]
}

// --- 飛星常數 ---
export const STAR_NAMES = {'ZH':{
    1: "一白貪狼星<br>(桃花, 財運)",
    2: "二黑病符星<br>(疾病, 災禍) ",
    3: "三碧祿存星<br>(爭執, 官訟) ",
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
    },
     'FR': {
        1: "1 Étoile Loup Vorace Blanche<br>(Romance, Richesse)",
        2: "2 Étoile de Maladie Noire<br>(Maladie, Désastre)",
        3: "3 Étoile de Dispute Verte<br>(Conflit, Procès)",
        4: "4 Étoile Littéraire Verte<br>(Études, Carrière)",
        5: "5 Étoile du Désastre Jaune<br>(Grande Infortune)",
        6: "6 Étoile Militaire Blanche<br>(Autorité, Gain inattendu)",
        7: "7 Étoile Destructrice Rouge<br>(Pertes, Querelles)",
        8: "8 Étoile Assistante Blanche<br>(Fortune, Joie)",
        9: "9 Étoile de Célébration Pourpre<br>(Mariage, Fête)"
    }
};

export const KYUSEI_KIGAKU_UI ={
    'ZH':['九星氣學'],
    'EN':['KYUSEI KIGAKU'],
    'FR':['KYUSEI KIGAKU']
}

export const KYUSEI_KIGAKU = {
    'ZH':{
    "五黃殺":"五黃殺",
    "猛火殺":"猛火殺",
    "暗劍殺":"暗劍殺",
    "日破殺":"日破殺",
    "本命殺":"本命殺",
    "吉位":`<span style="color: #BC2020;">吉位</span>`,
    "無":""},
    'EN':{
    "五黃殺":"Go-ou Satsu<br>(Dead Pos)",
    "猛火殺":"Mouka Satsu<br>(Conflict)",
    "暗劍殺":"Anken Satsu<br>(ambush)",
    "日破殺":"Nippa Satsu<br>(Bad Luck)",
    "本命殺":"Honmei Satsu<br>(Pressure)",
    "吉位":`<span style = "color = #BF360C">Kichii<br>(Lucky Pos)</span>`,
    "無":""        
    },
    'FR':{ 
        "五黃殺":"Go-ou Satsu<br>(Position Morte)", 
        "猛火殺":"Mouka Satsu<br>(Conflit)", 
        "暗劍殺":"Anken Satsu<br>(Embuscade)", 
        "日破殺":"Nippa Satsu<br>(Malchance)", 
        "本命殺":"Honmei Satsu<br>(Pression)", 
        "吉位":`<span style = "color = #BF360C">Kichii<br>(Pos. Chanceuse)</span>`, 
        "無":""    
}
}

// --- 八卦方位 ---
export const DIRECTIONS = {'ZH':[
    ['西北', '正北', '東北'],
    ['正西', '中宮', '正東'],
    ['西南', '正南', '東南']],
    'EN':[
    ['Northwest', 'North', 'Northeast'],
    ['West', 'Center', 'East'],
    ['Southwest', 'South', 'Southeast']
    ],
    'FR':[['Nord-Ouest', 'Nord', 'Nord-Est'],['Ouest', 'Centre', 'Est'],['Sud-Ouest', 'Sud', 'Sud-Est']]
};

export const UX_WORD = {
    'ZH':['流年運程','年九宮飛星圖','切換至','顯示','流年圖表','年為','年'],
    'EN':['Annual Fortune Calculator','Fung Shui Graph','Change to','Change to','Graph','is','year'],
    'FR':['Calculateur de Fortune Annuelle', 'Graphique Feng Shui', 'Passer à', 'Afficher', 'Graphique', 'est l’année', 'an']  
}

export const headingMenu = {
    'ZH':["流年運程", "仙家靈簽", "術數查詢","常用經咒"],
    'EN':["Horoscope", "Oracle", "Astrology", "Sutras"]
}

export const ASTROLOGY_PERIOD = {
    'ZH': ['全局','大運','流年','流月','流日'],
    'EN': ['Whole Life', '10 Years', 'Year', 'Month', 'Day'],
    'FR': ['Vie Entière', 'Cycle de 10 ans', 'Année', 'Mois', 'Jour']
}

export const LUNAR_MONTH = {
    'ZH': ['(閏月)','正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','臘月'],
    'EN': ['(LEAP MONTH)','JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    'FR': ['(MOIS INTERCALAIRE)','JAN','FÉV','MAR','AVR','MAI','JUN','JUI','AOÛ','SEP','OCT','NOV','DÉC']
}
export const LUNAR_DATE = {
    'ZH' :['農曆日期','初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
        '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
        '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'],
    'EN' :['LUNAR_DATE','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th',
        '11th','12th','13th','14th','15th','16th','17th','18th','19th','20th',
        '21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th'],
    'FR' :['DATE LUNAIRE','1er','2e','3e','4e','5e','6e','7e','8e','9e','10e','11e','12e','13e','14e','15e','16e','17e','18e','19e','20e','21e','22e','23e','24e','25e','26e','27e','28e','29e','30e']  
}

export const STARS_AND_PALACE = (() => {
// Some stars intentionally appear multiple times in different systems.
// Order matters. Do NOT dedupe.
const baseEN = {
  main: [
    'Emperor','Strategist','Sun','Soldier','Hedonist','Virgin','Treasurer','Moon',
    'Greed Wolf','Gate','Minister','Sage','Marshal','Pioneer',
    'Literary','Eloquence','L Assist','R Assist'
  ],

  others: [
    'Nobleman(Day)','Nobleman(Night)','Treasure','Pegasus',
    'Goat Blade','Spinning Top','Fire Star','Siren Star',
    'Ground Void','Ground Loot',

    'Love','Sky Happiness','Sex','3 Stages','8 Blocks',
    'Heaven Official','Dragon Fountain','Phenix Court',

    'Alone Hour','Alone Place','Heaven Fortune','Heaven Void','Sky Cry',
    'Swift Wind','Break','Mystic Cover',

    'Heaven Virtue','Heaven Talent','Heaven Longevity','Heaven Punishment','Heaven Charm',
    'Solver (year)','Solver (month)','Heaven Shaman','Heaven Moon','Moon Evil',
    'Platform Aid','Imperial Decree','Grace Light','Heaven Noble',

    'Birth','Bath','Adulthood','Office','Peak','Decline','Sickness','Death',
    'Tomb','End','Womb','Nurture','Scholar',

    'Strongman','Azure Dragon','Minor Loss','General','Memorial','Flying Blade',
    'Joy Star','Illness Sign','Major Loss','Hidden Enemy',
    'Legal Sign','Heaven Wound','Heaven Messenger',

    'Year Authority','Dragon Virtue','Heaven Virtue','Commander Star',
    'Saddle Rise','Year Travel','Canopy',

    'Bad Luck','Mourning Gate','Chain Bind','Major Loss','White Tiger',
    'Hanging Guest','Robbery Evil','Disaster Evil','Heaven Evil',
    'Rest God','Back stab','Sex','Moon Evil','Loss Spirit',
    'Road Block', 'Emptiness', 'Cycle Void', 'Temporal Vacuity',
    'Heaven Chef', 'Moon Virtue', 'Sky Void', 'Body Palace',
    'Intellect+', 'Might+','Prestige+','Resource-','Command+','Documentation+',
    'Gossiper+','Happiness+','Health-','Loss+','Hidden Threats','Legal Issues',

    'Self Palace','Parent Palace','Fortune Palace','Property Palace',
    'Career Palace','Social Palace','Location Palace','Health Palace',
    'Spend Palace','Child Palace','Love Palace','Sibling Palace'
  ]
};


    const starGroups = {
  'main': ['紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府', '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍'
  ,'文昌', '文曲', '左輔', '右弼'],
  'others': ['天魁', '天鉞', '祿存', '天馬','擎羊','陀羅','火星','鈴星','地空','地劫',
  '紅鸞','天喜','咸池','三台','八座','天官','龍池','鳳閣','孤辰','寡宿',
    '天福','天虛','天哭','蜚廉','破碎','華蓋','天德','天才','天壽','天刑','天姚',
    '解神(年)','解神(月)','天巫','天月','陰煞','台輔','封誥','恩光','天貴',
  '長生','沐浴','冠帶','臨官','帝旺','衰','病','死','墓','絕','胎','養','博士',
    '力士','青龍','小耗','將軍','奏書','飛廉','喜神','病符','大耗','伏兵','官符','天傷','天使',
    '歲建','龍德','天德','將星','攀鞍','歲驛','華蓋',
    '晦氣','喪門','貫索','大耗','白虎','吊客','劫煞','災煞','天煞','息神','指背','咸池','月煞','亡神',
    '截路','空亡', '旬中', '旬空', '天廚', '月德', '天空', '身宮',
    '博士', '力士', '青龍', '小耗', '將軍', '奏書', '飛廉', '喜神', '病符', '大耗', '伏兵', '官府',
    '命宮','兄弟宮','夫妻宮','子女宮','財帛宮','疾厄宮',
        '遷移宮','奴僕宮','官祿宮','田宅宮','福德宮','父母宮']

};
const baseFR = {
    main: [
        'L’Empereur','Le Stratège','Le Soleil','Le Soldat','L’Hédoniste','La Vierge','Le Trésorier','La Lune',
        'Loup Vorace','La Porte','Le Ministre','Le Sage','Le Maréchal','Le Pionnier',
        'Littéraire','Éloquence','Assistant Gauche','Assistant Droit'
    ],
    'others': [
    // --- 輔星與吉凶星 (Sub-stars & Lucky/Unlucky Stars) ---
    'Noble (Jour)', 'Noble (Nuit)', 'Trésor', 'Pégase',
    'Lame de Chèvre', 'Toupie', 'Étoile de Feu', 'Étoile Sirène',
    'Vide Terrestre', 'Pillage Terrestre',

    // --- 桃花與雜曜 (Romance & Miscellaneous Stars) ---
    'Amour', 'Joie Céleste', 'Bassin d’Émeraude (Sexe)', 'Trois Étapes', 'Huit Blocs',
    'Officier Céleste', 'Bassin du Dragon', 'Pavillon du Phénix',

    // --- 孤剋與煞曜 (Loneliness & Negative Stars) ---
    'Solitude (Homme)', 'Veuve (Femme)', 'Fortune Céleste', 'Vide Céleste', 'Pleurs Célestes',
    'Flèche Volante', 'Destruction', 'Couverture Mystique',

    // --- 貴人與解神 (Noble & Solver Stars) ---
    'Vertu Céleste', 'Talent Céleste', 'Longévité Céleste', 'Châtiment Céleste', 'Charme Céleste',
    'Dissipateur (Année)', 'Dissipateur (Mois)', 'Chaman Céleste', 'Lune Céleste', 'Démon Lunaire',
    'Aide de Plateforme', 'Décret Impérial', 'Lumière de Grâce', 'Noblesse Céleste',

    // --- 長生十二神 (12 Stages of Life) ---
    'Naissance', 'Bain', 'Soutane (Adolescence)', 'Fonctionnaire', 'Apogée', 'Déclin', 'Maladie', 'Mort',
    'Tombe', 'Fin', 'Foetus', 'Nourriture', 'Docteur (Érudit)',

    // --- 博士十二神 (12 Doctor Stars) ---
    'Hercule', 'Dragon Vert', 'Petite Perte', 'Général', 'Mémorandum', 'Lame Volante',
    'Étoile de Joie', 'Signe de Maladie', 'Grande Perte', 'Ennemi Caché',
    'Signe Légal', 'Blessure Céleste', 'Messager Céleste',

    // --- 歲前十二神 (12 Year Gods) ---
    'Autorité de l’Année', 'Vertu du Dragon', 'Vertu Céleste', 'Étoile du Commandant',
    'Selle d’Équitation', 'Voyage de l’Année', 'Canopée',

    // --- 晦氣十二神 (12 Bad Luck Gods) ---
    'Malchance', 'Porte de Deuil', 'Chaîne de Liaison', 'Grande Perte', 'Tigre Blanc',
    'Invité Suspendu', 'Esprit de Vol', 'Esprit de Désastre', 'Esprit Céleste',
    'Dieu du Repos', 'Poignard dans le Dos', 'Bassin d’Émeraude (Sexe)', 'Démon Lunaire', 'Esprit de Perte',

    // --- 截路空亡與雜神 (Void & Misc Gods) ---
    'Route Bloquée', 'Grand Vide', 'Vide du Cycle', 'Vacuité Temporelle', 
    'Chef Céleste', 'Vertu Lunaire', 'Vide du Ciel', 'Palais du Corps',

    // --- 博士十二神重複項 (Dedupe reference from your code) ---
    'Docteur', 'Hercule', 'Dragon Vert', 'Petite Perte', 'Général', 'Mémorandum', 'Lame Volante', 'Étoile de Joie', 'Signe de Maladie', 'Grande Perte', 'Ennemi Caché', 'Signe Légal',

    // --- 十二宮位 (12 Palaces) ---
    'Palais du Soi', 'Palais des Parents', 'Palais de la Fortune', 'Palais de l’Immobilier',
    'Palais de la Carrière', 'Palais Social', 'Palais de la Mobilité', 'Palais de la Santé',
    'Palais des Dépenses', 'Palais des Enfants', 'Palais de l’Amour', 'Palais de la Fratrie'
  ]
};

     
    
    const transformsZH = ['化祿', '化權', '化科', '化忌'];
    const transformsEN = [' (Prosperity)', ' (Authority)', ' (Fame)', ' (Clouded)'];
    const transformsFR = [' (Prospérité)', ' (Autorité)', ' (Célébrité)', ' (Obscurci)'];

    const finalMap = {
        'ZH': {},
        'EN': {},
        'FR': {},
    };

    for (let i = 0; i < starGroups['main'].length; i++) {
        const zhStar = starGroups['main'][i];
        const enStar = baseEN['main'][i];
        const frStar = baseFR['main'][i];

        finalMap['ZH'][zhStar] = zhStar;
        finalMap['EN'][zhStar] = enStar;
        finalMap['FR'][zhStar] = frStar;

        for (let j = 0; j < transformsZH.length; j++) {
            const fullKey = zhStar + transformsZH[j]; // 例如 "紫微化祿"
            
            finalMap['ZH'][fullKey] = fullKey;
            finalMap['EN'][fullKey] = enStar + transformsEN[j]; // 例如 "The Emperor (Prosperity)"
            finalMap['FR'][fullKey] = frStar + transformsFR[j];
        }
    }

    for (let i = 0; i < starGroups['others'].length; i++) {
        const zhStar = starGroups['others'][i];
        const enStar = baseEN['others'][i];
        const frStar = baseFR['others'][i];

        finalMap['ZH'][zhStar] = zhStar;
        finalMap['EN'][zhStar] = enStar;
        finalMap['FR'][zhStar] = frStar;
    }
    return {
        'ZH': finalMap['ZH'], 
        'EN': finalMap['EN'],
        'FR': finalMap['FR']  
    };
})();


export const BONE_SONG = {'ZH': [
"二兩二 身寒骨冷苦伶仃，此命推來生乞人。碌碌巴巴無度日，終年打拱過平年。",
"二兩三	此命推來骨自輕，求謀作事難成。妻兒兄弟應難許，別處他鄉作散人。",
"二兩四	此命推來福祿無，門庭困苦總難營。六親骨肉皆無靠，流到他鄉作老翁。",
"二兩五	此命推來祖業微，門庭營度似稀奇。六親骨肉如冰炭，一生勤勞自把持。",
"二兩六	平生衣祿苦中求，獨自經營事不休。離祖出門宜早計，晚來衣祿自無憂。",
"二兩七	一生作事少商量，難靠祖宗作主張。獨馬單槍空做去，早來晚歲部無長。",
"二兩八	一生作事似飄蓬，祖宗產業在夢中。若不過房改姓，也當移徙兩三通。",
"二兩九	初年運限未曾享，縱有功名在後底。須過四旬繞可上，移居改姓始為良。",
"三兩	勞勞碌苦中求，東走西奔何日休。若使終身勤與儉，老來稍可免憂愁。",
"三兩一	忙碌忙碌中求，何日雲開見日頭。難得祖基家可立，中年衣食漸無憂。",
"三兩二	初年運蹇事難謀，漸有財源如水流。到得中年衣食旺，那時名利一齊來。",
"三兩三	早年做事事難成，百計徒勞枉費心。半世自如流水去，後來運到得黃金。",
"三兩四	此命福氣果如何，僧道門中衣祿多。離祖出家方得妙，終朝拜佛念彌陀。",
"三兩五	平生福量不周全，祖業根基覺少傳。營業生涯宜守舊，時來衣食勝從前。",
"三兩六	不須勞碌過平生，獨自成家福不輕。早有福星常照命，任君行去百般成。",
"三兩七	此命般般事不成，弟兄少力自孤成。雖然祖業須微有，來得明時去得明。",
"三兩八	一生骨肉最清高，早入黃門姓名標。待看看將三十六，藍袍脫去換紅袍。",
"三兩九	此命終身運不窮，勞勞作事盡皆空。苦心竭力成家計，到得那時在夢中。",
"四兩	生平衣祿是綿長，件件心中自主張。前面風霜多受過，後來必定享安康。",
"四兩一	此命推來事不同，為人能幹略凡庸。中年還有逍遙福，不比前年運未通。",
"四兩二	得寬懷處且寬懷，何用雙眉皺不開。若使中年命運濟，那時名利一齊來。",
"四兩三	為人心性最聰明，作事軒昂貴貴人。衣祿一生天數定，不須勞碌是豐享。",
"四兩四	來事由天莫苦求，須知福祿勝前途。當年財帛難如意，晚景欣然便不憂。",
"四兩五	名利推來竟若何，前途辛苦後奔波。命中難養男與女，骨肉扶持也不多。",
"四兩六	東西南北盡皆空，出姓移名更覺隆。衣祿無虧天數定，中年晚景一般同。",
"四兩七	此命推來旺末年，妻榮子貴自怡然。平生原有滔滔福，可有財源如水源。",
"四兩八	幼年運道未曾享，若是蹉躓再不興。兄弟六親皆無靠，一身事業晚年成。",
"四兩九	此命推來福不輕，自成自立耀門庭。從來富貴人親近，使婢差奴過一生。",
"五、兩	為名為利終日勞，中年福祿也多遭。老來是有財星照，不比前番日下高。",
"五兩一	一世榮華事事通，不須勞碌自享豐。弟兄叔侄皆如意，家業成時福祿宏。",
"五兩二	一世享通事事能，不須勞思自然能。家族欣然心皆好，家業豐享自稱心。",
"五兩三	此格推來氣像真，興家發達在其中。一生福祿安排家，欲是人間一富翁。",
"五兩四	此命推來厚且清，詩畫滿腹看功成。豐衣足食自然穩，正是人間有福人。",
"五兩五	走馬揚鞭爭名利，少年做事費籌謀。一朝福祿源源至，富貴榮華耀六親。",
"五兩六	此格推來禮義通，一生福祿用無窮。甜酸苦辣皆嚐過，財源滾滾穩且豐。",
"五兩七	福祿豐盈萬事全，一生榮耀顯雙親。名揚威振人欽敬，處世逍遙似遇春。",
"五兩八	平生福祿自然來，名利雙全福祿偕。雁塔題名為貴客，紫袍玉帶走金階。",
"五兩九	細推此格妙且清，必定財高禮義通。甲第之中應有分，揚鞭走馬顯威榮。",
"六兩	一朝金榜快題名，顯祖榮宗立大功。衣食定然原裕足，田園財帛更豐盛。",
"六兩一	不作朝中金榜客，定為世上一財翁。聰明天賦經書熟，名顯高科自是榮。",
"六兩二	此命推來福不窮，讀書必定顯親宗。紫衣金帶為卿相，富貴榮華皆可同。",
"六兩三	命主為官福祿長，得來富貴定非常。名題雁塔傳金榜，定中高科天下揚。",
"六兩四	此格威權不可擋，紫袍金帶坐高望。榮華富貴雖能及，積玉堆金滿儲倉。",
"六兩五	細推此命福不輕，安國安邦極品人。文紛雕樑徽富貴，威聲照耀四方聞。",
"六兩六	此格人間一福人，堆金積玉滿堂春。從來富貴由天定，正勿垂紳諤聖君。",
"六兩七	此命生來福自宏，田園家業最高隆。平生衣祿豐盈足，一世榮華萬事通。",
"六兩八	富貴由大莫苦求，萬金家計不須謀。十年不比前番事，祖業根基水上舟。",
"六兩九	君是人間前祿星，一生富貴眾人欽。縱然福祿由天定，安享榮華過一生。",
"七兩	此命推來福不輕，不須愁慮苦勞心。一生天定衣與祿，富貴榮華主一生。",
"七兩一	此命生來大不同，公侯卿相在其中。一生自有逍遙福，富貴榮華極品隆。"],
    'EN': [
        "2.2: A life of cold loneliness and poverty, destined to live like a beggar with constant struggle.",
        "2.3: A light-boned destiny where pursuits fail; family ties are weak, leading to a wandering life.",
        "2.4: Lacking fortune and wealth; home life is arduous with no kin to rely on until old age.",
        "2.5: Mere ancestral inheritance; family relations are as cold as ice. Success depends solely on hard toil.",
        "2.6: Wealth is earned through hardship; leaving home early brings a worry-free life in later years.",
        "2.7: Independent and solitary; unable to rely on ancestors. Early and late life remain unstable.",
        "2.8: Life drifts like duckweed; ancestral wealth is but a dream. Better to move or change one's name.",
        "2.9: Early years lack luck; success comes after forty. Relocation or name change brings goodness.",
        "3.0: Constant toil and wandering; only lifelong diligence and thrift can ease late-life worries.",
        "3.1: Searching for light through busyness; hard to build a home, but middle age brings sufficiency.",
        "3.2: Early obstacles yield to flowing wealth; middle age brings both fame and prosperity.",
        "3.3: Youthful efforts are in vain; life flows away like water until late luck brings gold.",
        "3.4: Fortune lies in spiritual paths; leaving home for the temple brings peace and devotion.",
        "3.5: Modest fortune and weak ancestral roots; better to keep to old ways until luck improves.",
        "3.6: No need for heavy toil; destined to build a home with luck. Many paths lead to success.",
        "3.7: Challenges in every task and little family support; ancestral wealth comes and goes clearly.",
        "3.8: Noble character and early fame; by thirty-six, one rises to high status and success.",
        "3.9: Endless effort yields little fruit; building a home with exhaustion feels like a fleeting dream.",
        "4.0: Long-lasting wealth and a strong mind; after early hardships, a peaceful life is guaranteed.",
        "4.1: A capable but modest life; middle age brings leisure and freedom unlike the difficult past.",
        "4.2: Keep a relaxed heart; no need for worry. Middle age brings fame and wealth together.",
        "4.3: Intelligent and noble-minded; life's abundance is predestined without excessive toil.",
        "4.4: Success is heaven-sent; future fortune surpasses the past's financial dissatisfactions.",
        "4.5: Fame and wealth are elusive; early toil leads to late struggle with little family support.",
        "4.6: Wandering yields nothing; changing one's name brings prosperity. Predestined abundance remains stable.",
        "4.7: Prosperity shines in later years; blessed with wealth and noble descendants like flowing water.",
        "4.8: Luckless youth and difficult recovery; self-made success arrives only in late life.",
        "4.9: Great fortune and self-reliance; honored by society and served by many throughout life.",
        "5.0: Laboring for fame and wealth; middle age is turbulent, but old age is lit by a lucky star.",
        "5.1: Lifelong glory and ease; family harmony and immense wealth come without hard labor.",
        "5.2: Capable and prosperous in all things; family joy and abundant estate come naturally.",
        "5.3: A truly noble destiny; destined to be a wealthy tycoon with great family prosperity.",
        "5.4: Refined and talented; well-fed and secure, a truly blessed person in the world.",
        "5.5: Pursuing fame in youth with great effort; eventually, wealth and glory shine upon the kin.",
        "5.6: Virtuous and endlessly blessed; after tasting all of life's flavors, wealth flows steadily.",
        "5.7: Perfect fortune in all matters; bringing glory to parents and living in perpetual spring.",
        "5.8: Natural wealth and fame; rising to high honors and walking the golden halls of power.",
        "5.9: Refined and brilliant destiny; destined for high office and great honor in the capital.",
        "6.0: Early academic success brings glory to ancestors; blessed with abundant land and wealth.",
        "6.1: If not a high official, then a tycoon; gifted with wisdom and destined for great honor.",
        "6.2: Infinite fortune and academic excellence; rising to the highest ranks of nobility.",
        "6.3: Long-lasting official luck and extraordinary wealth; fame spreads across the nation.",
        "6.4: Unstoppable authority and high status; wealth and jade fill the granaries to the brim.",
        "6.5: Exceptional fortune and a pillar of the state; fame and refinement recognized everywhere.",
        "6.6: A truly blessed person; wealth fills the halls. A life of high status decreed by heaven.",
        "6.7: Born with grand fortune; ancestral estates are supreme and all matters are prosperous.",
        "6.8: Wealth is fate, not to be forced; ancestral foundations may be as unstable as a boat.",
        "6.9: A star of fortune among men; honored by all and enjoying lifelong prosperity.",
        "7.0: Great predestined fortune; no need for worry as wealth and honor last a lifetime.",
        "7.1: An extraordinary destiny of the highest rank; enjoying ultimate glory and leisure."
    ],
    'FR':[
    "2.2: Une vie de solitude froide et de pauvreté, destinée à vivre comme un mendiant dans une lutte constante.",
    "2.3: Une destinée de 'poids léger' où les projets échouent ; les liens familiaux sont faibles, menant à une vie errante.",
    "2.4: Manque de fortune et de richesse ; la vie domestique est ardue, sans aucun proche sur qui compter jusqu'à la vieillesse.",
    "2.5: Simple héritage ancestral ; les relations familiales sont froides comme la glace. Le succès dépend uniquement du travail acharné.",
    "2.6: La richesse est acquise par l'épreuve ; quitter le foyer tôt permet d'obtenir une vie sans soucis dans les vieux jours.",
    "2.7: Indépendant et solitaire ; incapable de s'appuyer sur ses ancêtres. La jeunesse et la vieillesse demeurent instables.",
    "2.8: Une vie errante comme une plante aquatique ; la richesse ancestrale n'est qu'un rêve. Mieux vaut déménager ou changer de nom.",
    "2.9: Les premières années manquent de chance ; le succès vient après quarante ans. Un déménagement ou un changement de nom apporte le bien.",
    "3.0: Labeur constant et errance ; seule une diligence et une frugalité de toute une vie peuvent apaiser les soucis de la vieillesse.",
    "3.1: Chercher la lumière à travers l'agitation ; difficile de bâtir un foyer, mais l'âge mûr apporte enfin la suffisance.",
    "3.2: Les obstacles de la jeunesse cèdent la place à une richesse fluide ; l'âge mûr apporte à la fois renommée et prospérité.",
    "3.3: Les efforts de la jeunesse sont vains ; la vie s'écoule comme l'eau jusqu'à ce que la chance tardive apporte l'or.",
    "3.4: La fortune réside dans les voies spirituelles ; quitter le foyer pour le temple apporte la paix et la dévotion.",
    "3.5: Fortune modeste et racines ancestrales faibles ; il vaut mieux s'en tenir aux anciennes méthodes jusqu'à ce que la chance s'améliore.",
    "3.6: Pas besoin de dur labeur ; destiné à bâtir un foyer avec chance. De nombreux chemins mènent au succès.",
    "3.7: Des défis dans chaque tâche et peu de soutien familial ; la richesse ancestrale va et vient de manière limpide.",
    "3.8: Caractère noble et renommée précoce ; à trente-six ans, on s'élève vers un statut élevé et le succès.",
    "3.9: Des efforts sans fin donnent peu de fruits ; bâtir un foyer avec épuisement ressemble à un rêve éphémère.",
    "4.0: Richesse durable et esprit fort ; après les épreuves de la jeunesse, une vie paisible est garantie.",
    "4.1: Une vie capable mais modeste ; l'âge mûr apporte loisir et liberté, contrairement au passé difficile.",
    "4.2: Gardez un cœur détendu ; pas besoin de s'inquiéter. L'âge mûr apporte renommée et richesse simultanément.",
    "4.3: Intelligent et noble d'esprit ; l'abondance de la vie est prédestinée sans labeur excessif.",
    "4.4: Le succès est envoyé par le ciel ; la fortune future surpasse les insatisfactions financières du passé.",
    "4.5: La renommée et la richesse sont évasives ; le labeur précoce mène à la lutte tardive avec peu de soutien familial.",
    "4.6: L'errance ne mène à rien ; changer de nom apporte la prospérité. L'abondance prédestinée reste stable.",
    "4.7: La prospérité brille dans les dernières années ; béni par la richesse et des descendants nobles comme l'eau vive.",
    "4.8: Jeunesse sans chance et rétablissement difficile ; le succès autodidacte n'arrive qu'à la fin de la vie.",
    "4.9: Grande fortune et autonomie ; honoré par la société et servi par beaucoup tout au long de la vie.",
    "5.0: Travailler pour la gloire et la richesse ; l'âge mûr est turbulent, mais la vieillesse est éclairée par une étoile chanceuse.",
    "5.1: Gloire et aisance de toute une vie ; l'harmonie familiale et une immense richesse viennent sans dur labeur.",
    "5.2: Capable et prospère en toutes choses ; la joie familiale et un domaine abondant viennent naturellement.",
    "5.3: Un destin véritablement noble ; destiné à être un magnat riche avec une grande prospérité familiale.",
    "5.4: Raffiné et talentueux ; bien nourri et en sécurité, une personne véritablement bénie dans ce monde.",
    "5.5: Poursuivre la gloire dans la jeunesse avec grand effort ; finalement, la richesse et la gloire brillent sur la lignée.",
    "5.6: Vertueux et éternellement béni ; après avoir goûté à toutes les saveurs de la vie, la richesse coule de façon stable.",
    "5.7: Fortune parfaite en toutes matières ; apportant la gloire aux parents et vivant dans un printemps perpétuel.",
    "5.8: Richesse naturelle et renommée ; s'élever vers les hautes distinctions et marcher dans les couloirs dorés du pouvoir.",
    "5.9: Destin raffiné et brillant ; destiné à de hautes fonctions et à un grand honneur dans la capitale.",
    "6.0: Le succès académique précoce honore les ancêtres ; béni par des terres abondantes et la richesse.",
    "6.1: Si ce n'est pas un haut fonctionnaire, alors un magnat ; doué de sagesse et destiné à un grand honneur.",
    "6.2: Fortune infinie et excellence académique ; s'élever aux plus hauts rangs de la noblesse.",
    "6.3: Chance officielle durable et richesse extraordinaire ; la renommée se répand à travers toute la nation.",
    "6.4: Autorité imparable et statut élevé ; la richesse et le jade remplissent les greniers jusqu'au bord.",
    "6.5: Fortune exceptionnelle et pilier de l'État ; renommée et raffinement reconnus partout.",
    "6.6: Une personne véritablement bénie ; la richesse remplit les salles. Une vie de haut statut décrétée par le ciel.",
    "6.7: Né avec une immense fortune ; les domaines ancestraux sont suprêmes et toutes choses sont prospères.",
    "6.8: La richesse est le destin, ne forcez pas ; les fondations ancestrales peuvent être aussi instables qu'un bateau.",
    "6.9: Une étoile de fortune parmi les hommes ; honoré par tous et jouissant d'une prospérité à vie.",
    "7.0: Grande fortune prédestinée ; pas besoin de s'inquiéter car la richesse et l'honneur durent toute une vie.",
    "7.1: Une destinée extraordinaire du plus haut rang ; jouissant d'une gloire ultime et d'une oisiveté sereine."
]
}
// localizationData.js
import { getLanguage } from '../managmentAPI.js';
import * as AllData from './languageData.js';

const LOCAL_DATA = {};

//用 Object.assign 直接一次過併入
Object.assign(LOCAL_DATA, AllData);

export function getText(key) {
    const lang = getLanguage();
    if (!LOCAL_DATA[key]) {
        console.warn(`Localization key "${key}" not found.`);
        return null;
    }

    const localizedData = LOCAL_DATA[key][lang] || LOCAL_DATA[key]['ZH'];
    
    // Deep Copy 處理
    if (typeof localizedData === 'object' && localizedData !== null) {
        return JSON.parse(JSON.stringify(localizedData)); 
    }
   
    return localizedData;
}
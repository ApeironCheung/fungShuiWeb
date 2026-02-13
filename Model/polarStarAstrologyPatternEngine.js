import { getLifeBranch, getPolarStarAstrologyGraph } from './polarStarAstrologyModel.js';
import * as Rules from './polarStarAstrologyPatternRules.js';

export function getFinalPatterns(lifeIdx) {
    const graph = getPolarStarAstrologyGraph();
    const lifeIdx = getLifeBranch();
    const rawString = generator(graph, lifeIdx);
    return parser(rawString);
}

function generator (graph, lifeIdx){
    let rawString = "";
    Object.keys(Rules).forEach(key => {
        if (typeof Rules[key] === 'function') {
            rawString += Rules[key](graph, lifeIdx);
        }
    });
    return rawString;
}

function parser(rawString){
    if (rawString.length === 0) return [];
    return rawString.split(',').filter(item => item !== "");
}


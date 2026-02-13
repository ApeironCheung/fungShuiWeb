// 輔助工具：檢查宮位是否有某星
const hasStar = (palace, starName) => palace.some(s => s.includes(starName));

// 1. 修復後的資料獲取工具
function get3Direction4Square(graph, lifeIdx){
    const offsets = [0, 4, 8, 6]; // 命、財、官、遷
    // 直接回傳這四個宮位的資料 (拍平為一個長陣列，方便後續用 every/some)
    return offsets.map(offset => graph[(lifeIdx + offset) % 12]);
}

// 1. 權祿巡逢格 (Legend)
export function powerAndWealthIntoLife(graph, lifeIdx) {
    const p = graph[lifeIdx];
    const sfData = get3Direction4Square(graph, lifeIdx);
    
    // 最強：權祿同入命
    if (hasStar(p, '化祿') && hasStar(p, '化權')) {
        return "Legend:權祿巡逢格(同宮),";
    }
    
    // 次強：三方會見
    const flattenedStars = sfData.flat(); // 把四個宮位的星合成一個大 list
    const hasWealth = flattenedStars.some(s => s.includes('化祿'));
    const hasPower = flattenedStars.some(s => s.includes('化權'));
    
    return (hasWealth && hasPower) ? "Epic:權祿巡逢格," : "";
}

// 2. 善蔭朝綱格 (Epic)
export function strategistMaster(graph, lifeIdx) {
    // 4: 辰, 10: 戌
    if ((lifeIdx === 4 || lifeIdx === 10) && hasStar(graph[lifeIdx], '天機') && hasStar(graph[lifeIdx], '天梁')) {
        return "Epic:善蔭朝綱格,";
    }
    return "";
}

// 3. 天乙拱命格 (Epic)
export function scholarWithGuardianAngel(graph, lifeIdx) {
    const flattenedStars = get3Direction4Square(graph, lifeIdx).flat();
    let count = 0;
    if (flattenedStars.some(s => s.includes('天魁'))) count++;
    if (flattenedStars.some(s => s.includes('天鉞'))) count++;
    
    return (count >= 2) ? "Epic:天乙拱命格," : "";
}

// 4. 擎羊入廟格 (Rare)
export function sheepBladeInLife(graph, lifeIdx) {
    const positions = [1, 4, 7, 10]; // 丑辰未戌
    if (positions.includes(lifeIdx) && hasStar(graph[lifeIdx], '擎羊')) {
        return "Rare:擎羊入廟格,";
    }
    return "";
}

// 5. 機月同梁格 (Rare)
export function adminPerson(graph, lifeIdx) {
    const flattenedStars = get3Direction4Square(graph, lifeIdx).flat();
    const target = ['天機', '太陰', '天同', '天梁']; 
    
    // 檢查這四粒星是否都在三方四正大名單中
    const isMatch = target.every(star => flattenedStars.some(s => s.includes(star)));
    return isMatch ? "Rare:機月同梁格," : "";
}
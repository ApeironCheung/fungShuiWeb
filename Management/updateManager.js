import { attachControlListeners } from "../ctrlAPI";

// 更新訂閱函數
export function updateSubscription(publisherName) {
    const updateList = UPDATE_SUBSCRIPTIONS[publisherName];
    
    if (!updateList) {
        console.warn(`render.js: 找不到發布者 '${publisherName}' 的訂閱列表。`);
        return;
    }
    
    updateList.forEach(item => { 
        const element = document.getElementById(item.id); 
        const newHtml = item.getHtml(); 
        
        if (element && newHtml !== undefined) {
            element.innerHTML = newHtml;
        }
    });

    // 每次 DOM 更新後重新綁定按鈕的事件監聽器
    // 因為 innerHTML 重寫會移除舊的 Event Listeners
    if (publisherName === 'controlYear') {
        attachControlListeners();
    }
}
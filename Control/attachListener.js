/**
 * 通用 Listener 綁定工具
 * @param {string} id - Element 的 ID
 * @param {function} callback - 要執行的 function
 * @param {string} eventType - 事件類型，預設為 'change'
 */
export function attachListener(id, callback, eventType = 'change') {
    const element = document.getElementById(id);
    if (!element) return; // 如果找不到 element 就直接跳出，避免 error

    element.addEventListener(eventType, function(event) {
        if (eventType === 'click') {
            // click 通常不需要傳 value
            callback();
        } else {
            // change 通常需要傳 value
            callback(event.target.value);
        }
    });
}
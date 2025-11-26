let isSecretMode = false;

// --- 狀態定義 ---
const STATE_IDLE = 0;      // 閒置中，等待第一個 Space
const STATE_USER = 1;      // 正在輸入 Username
const STATE_PASS = 2;      // 正在輸入 Password (未來擴充用)

let currentState = STATE_IDLE;
let inputBuffer = "";      // 用來暫存使用者輸入的字串

// --- 模擬資料庫 (未來擴充用) ---
const USER_DB = {
    "admin": "1234",
    "master": "pass"
};

let currentAttemptUser = ""; // 暫存剛輸入正確的 username

// login.js - 修正後的 window.addEventListener
window.addEventListener('keydown', function(event) {
    const key = event.key; // 只需要宣告一次

    // 偵測是否按了 Spacebar
    if (event.code === "Space") {
        event.preventDefault(); 
        handleSpacebarTrigger();
        return;
    }

    // 如果不是 Spacebar，根據當前狀態決定做什麼
    if (currentState === STATE_USER || currentState === STATE_PASS) {
        
        // --- 只需要保留這一段 ---
        
        // 正規表達式: ^[a-zA-Z0-9]$
        const isValidChar = /^[a-zA-Z0-9]$/.test(key); 

        if (isValidChar) {
            // 只有驗證通過的字元才會被加進去 (且只加一次)
            inputBuffer += key; 
            console.log("當前輸入緩衝: " + inputBuffer);
        }
        
        // --- 移除重複的錄製邏輯 (原來的 if (key.length === 1)) ---
    }
});

function handleSpacebarTrigger() {
    switch (currentState) {
        case STATE_IDLE:
            // 收到第一個 Space -> 開始輸入 Username
            console.log("--- 開始輸入 Username ---");
            currentState = STATE_USER;
            inputBuffer = ""; // 清空緩衝區
            break;

        case STATE_USER:
            // 收到第二個 Space -> 檢查 Username
            console.log("檢查 Username: " + inputBuffer);
            if (USER_DB.hasOwnProperty(inputBuffer)) {
                // Username 正確
                console.log("Username 正確！請輸入 Password...");
                currentAttemptUser = inputBuffer;
                currentState = STATE_PASS; // 進入密碼模式
                inputBuffer = ""; // 清空緩衝區準備錄密碼
            } else {
                // Username 錯誤
                console.log("查無此人，回到原點");
                resetState();
            }
            break;

        case STATE_PASS:
            // 收到第三個 Space -> 檢查 Password
            const correctPass = USER_DB[currentAttemptUser];
            if (inputBuffer === correctPass) {
                console.log("✅ 登入成功！進入 Secret Mode");
                isSecretMode = true;
                // 這裡執行你的 Secret Mode 邏輯
                updateSubscription('controlYear');
                const appRoot = document.getElementById('app-root');
                    if (appRoot) {
                        // 溫和的淡黃色 (LemonChiffon) 模擬符紙
                        appRoot.style.backgroundColor = '#FFFACD'; 
                        // 深紅色/深啡色 (DarkRed) 模擬硃砂或墨寶
                        appRoot.style.color = '#8B0000';         
                    }
                alert("歡迎進入管理員模式");
            } else {
                console.log("❌ 密碼錯誤");
                alert("密碼錯誤");
            }
            resetState();
            break;
    }
}

function resetState() {
    currentState = STATE_IDLE;
    inputBuffer = "";
    currentAttemptUser = "";
}
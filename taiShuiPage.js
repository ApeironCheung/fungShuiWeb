function getTaishuiHtml() {
    const currentYear = getFlyingStarGraphYear(); 

    let result = "<div id='taishui-content' style='width: 100%; padding: 10px;'>";
    
    result += "<div style='text-align: right; font-size: 1.1em; margin-bottom: 15px;'>";
    result += getSixtyJiaZiTaiShui(currentYear); 
    result += "</div>";
    
    result += "<div style='text-align: right; border-top: 1px solid #ddd; padding-top: 10px;'>";
    
    result += getTaiShuiConflictReport(currentYear); 
    
    result += "</div>";
    
    result += "</div>"; 
    return result;
}
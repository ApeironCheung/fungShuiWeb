// View/headingArea.js

import { switchPageMenu, languageButton } from '../ctrlAPI.js';
import { createHeaderCalendar } from './calenderView.js';

export const HEADING_CONTAINER_ID = "heading-area";

function banner(){
    return createHeaderCalendar();
  //  return '<img src="./Data/banner.png" alt="應用程式橫額">';
}

export function headingHtml(){
    let html = `<div id="${HEADING_CONTAINER_ID}" style="display: flex; flex-direction: row; align-items: center; margin-bottom: 20px;">`;
    html += banner();
    html += '<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 10px;">';
    html += languageButton();
    html += '<br>';
    html += switchPageMenu();
    html += '</div>';
    html += "</div>";
    return html;
}
// View/headingArea.js

import { switchPageMenu, languageButton } from '../ctrlAPI.js';
import { createHeaderCalendar } from './calenderView.js';

export const HEADING_CONTAINER_ID = "heading-area";

function banner(){
    return createHeaderCalendar();
  //  return '<img src="./Data/banner.png" alt="應用程式橫額">';
}

const pcCSS = `display: flex; flex-direction: row; 
justify-content: center; gap: 20px; width: 100%; 
max-width: 1200px; margin: 40 auto; padding: 0 20px; box-sizing: border-box;`;

export function headingHtml(){
    let html = `<div id="${HEADING_CONTAINER_ID}" style="${pcCSS}">`;
    html += banner();
    html += '<div style="display: flex; flex-direction: column; justify-content: space-between; padding: 10px;">';
    html += languageButton();
    html += '<br>';
    html += switchPageMenu();
    html += '</div>';
    html += "</div><br>";
    return html;
}
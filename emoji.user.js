// ==UserScript==
// @name        ASCII Emoji
// @namespace   Violentmonkey Scripts
// @match       https://messages.google.com/*
// @grant       GM_addStyle
// @version     0.0.1
// @author      Kodesade
// @run-at      document-start
// ==/UserScript==


function GM_addStyle (cssStr) {
    var D               = document;
    var newNode         = D.createElement ('style');
    newNode.textContent = cssStr;

    var targ    = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (newNode);
}

const NEWCSS = `span[data-is-emoji] {
  font-family:'apple color emoji';
}`

GM_addStyle(NEWCSS)

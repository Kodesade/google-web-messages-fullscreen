// ==UserScript==
// @name        Fullscreen Button
// @namespace   Violentmonkey Scripts
// @match       https://messages.google.com/*
// @version     1.0
// @author      -
// @description 11/19/2023, 9:39:41 PM
// @run-at      document-end
// @grant       waitForElm
// ==/UserScript==

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const FullScreenBtn = document.createElement("button")
FullScreenBtn.textContent = "🖵"
FullScreenBtn.className = "fsr-btn"
FullScreenBtn.style.background = "transparent"
FullScreenBtn.style.border = "0"
FullScreenBtn.style.color = "white"
FullScreenBtn.style.fontSize = "20px"
FullScreenBtn.style.paddingTop = "7px"

FullScreenBtn.onclick = function(){
  var docel = document.documentElement
  if (!document.fullscreenElement) {
    docel.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}



function mainloop(){
  var btnExist = document.querySelector(".fsr-btn")
  if (btnExist){
    if(window.getComputedStyle(btnExist.parentNode)["display"] === "none"){
      btnExist.remove()
      return mainloop()
    }
    return setTimeout(mainloop,500)
  }
  waitForElm(".input-row").then((elm) => {
    var desktop_btnbox = document.querySelector(".inline-compose-buttons")
    var mobile_btnbox = document.querySelector(".stacked-compose-buttons")

    if(window.getComputedStyle(desktop_btnbox)["display"] !== "none"){
      desktop_btnbox.insertBefore(FullScreenBtn,desktop_btnbox.firstChild)
    }

    if(window.getComputedStyle(mobile_btnbox)["display"] !== 'none'){
      mobile_btnbox.insertBefore(FullScreenBtn,mobile_btnbox.firstChild)
    }


  });
  return setTimeout(mainloop,500)
}

mainloop()

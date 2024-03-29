// ==UserScript==
// @name         TTRockstars Devil
// @namespace    https://github.com/usercromix/TTrockstars-Devil
// @version      0.1
// @description  Automatic awnser bot for ttrockstars
// @author       usercromix
// @match        https://play.ttrockstars.com/*
// @icon         https://play.ttrockstars.com/ttrs-favicon.png
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';

    GM_log("Your script is running.");

    // Key code for enabling/disabling the bot (in this example, the 'B' key)
    var toggleKey = 66; // 'B' key code

    // Variable to track whether the bot is running or not
    var running = false;

    // Function to toggle the bot state
    function toggleBot() {
        running = !running;
        GM_log("Bot " + (running ? "enabled" : "disabled"));
    }

    // Event listener to toggle the bot when the toggle key is pressed
    document.addEventListener("keydown", function(event) {
        if (event.keyCode === toggleKey) {
            toggleBot();
        }
    });

    // Set up an interval function that runs every 100 milliseconds
    setInterval(() => {
        var equation = document.getElementsByClassName("notranslate height-100 noselect current")[0];
        var input = document.getElementsByClassName("input-holder width-100")[0];
        if (input == undefined || input == null) {
            input = document.getElementsByClassName("input-holder width-100 hint")[0];
        }
        var enter = document.getElementsByClassName("key-ent ng-star-inserted")[0];
        var top = document.getElementsByClassName("next-game-question padding-5")[0];
        var keypad = document.getElementsByClassName("keyboard mat-white-color bg-2")[0];
        var play;

        if (equation != undefined) {
            if (!running) {
                return;
            }

            let el = document.createElement("div");
            el.setAttribute("href", "projectuc.online");
            el.setAttribute("target", "_blank");
            for (var i = 0; i < top.children.length; i++) {
                top.children[i].remove();
            }
            el.style = "background-color: peachpuff; color: black; width: auto; align-items: center; margin-top: 10px; margin-bottom: 10px; padding: 5px; border-radius: 10px; text-align: center; font-family: 'Fredoka One', sans-serif;";
            el.innerHTML = "Exploit Enabled";
            top.appendChild(el);

            var id = setInterval(() => {
                if (running) {
                    let raw = equation.innerHTML.replace("×", "*").replace("÷", "/");
                    console.log(raw);
                    while (raw.includes("<!---->")) {
                        raw = raw.replace("<!---->", "");
                    }
                    raw = raw.replace(/<\s*span[^>]*>.*?<\s*\/\s*span\s*>/g, '');
                    raw = raw.trim();
                    console.log(raw);
                    let answer = String(eval(raw));
                    GM_log("answer: " + answer);

                    // Example: 30 <!---->÷<!----><!----> 5 <!----><!----><!----><!---->
                    /*let el = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>";
                    if (!input.innerHTML.includes(el)) {
                        input.innerHTML = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>" + input.innerHTML
                    }*/

                    [...answer].forEach(char => {
                        for (var row = 0; row < keypad.children.length; row++) {
                            for (var key = 0; key < keypad.children[row].children.length; key++) {
                                let elem = keypad.children[row].children[key];
                                if (elem.innerHTML.trim() == char) {
                                    elem.click();
                                    return;
                                }
                            }
                        }
                    });
                    enter.click();
                } else {
                    clearInterval(id);
                }
            }, 225);
        } else {
            running = false;
            var gameOver = document.getElementsByClassName("stamp center mat-white-color")[0];
            if (gameOver != undefined) {
                gameOver.innerHTML = "You like the hacks?😊";
            }
        }
    }, 100);
})();

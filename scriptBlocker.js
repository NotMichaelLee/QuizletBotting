// (function() {
//     "use strict";
//
//     var fileTypeToTag = {
//         js: "script",
//         css: "style"
//     };
//
//     var processDomain = function(domain) {
//         var rules = domain.rules || [];
//         rules.forEach(function(rule) {
//             if (rule.on && rule.type === "fileInject") {
//                 var newEl = document.createElement("script");
//                 newEl.appendChild(document.createTextNode(rule.file));
//                 if (rule.injectLocation === "head") {
//                     var firstEl = document.head.children[0];
//                     if (firstEl) {
//                         document.head.insertBefore(newEl, firstEl);
//                     } else {
//                         document.head.appendChild(newEl);
//                     }
//                 } else {
//                     if (document.body) {
//                         document.body.appendChild(newEl);
//                     } else {
//                         document.addEventListener("DOMContentLoaded", function() {
//                             document.body.appendChild(newEl);
//                         });
//                     }
//                 }
//             }
//         });
//     };
//
//     // chrome.extension.sendMessage({action: "getDomains"}, function(domains) {
//         var domains = [
//             {
//                 id: "d1",
//                 matchUrl: "*",
//                 on: true,
//                 "rules": [
//                     {type: "normalOverride", match: "https://quizlet.com/a/j/dist/gravity.ce7087cc54563b9e9e99.a.js", replace: "https://uddernetworks.com/js/replace_gravity_script.js", on: true},
//                     {type: "normalOverride", match: "https://quizlet.com/a/j/dist/main.f43832a47d9892381681.a.js", replace: "https://uddernetworks.com/js/gravityreplace_main.js", on: true},
//                     {type: "normalOverride", match: "http://73.218.245.138/test/alertStuff.js", replace: "http://73.218.245.138/test/alertStuff2.js", on: true}
//                 ]
//             }
//         ];
//         domains.forEach(function(domain) {
//             if (domain.on) {
//                 chrome.extension.sendMessage({
//                     action: "match",
//                     domainUrl: domain.matchUrl,
//                     windowUrl: location.href
//                 }, function(result) {
//                     console.log("Result!! " + result);
//                     // if (result) { // result
//                     //     processDomain(domain);
//                     // }
//                 });
//             }
//         });
//     // });
//
//     chrome.extension.onMessage.addListener(function(msg) {
//         if (msg.action === 'log') {
//             var logStyle = "color: #007182; font-weight: bold;";
//             if (msg.important) {
//                 logStyle += "background: #AAFFFF;";
//             }
//             console.log("%c[NOT REALLYYTY Resource Override] " + msg.message, logStyle);
//         }
//     });
// })(); //
//
//
// /*
//
//  */
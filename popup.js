function bknelson() {
    window.postMessage({ source: "Spanish Test Solver", command: "bknelson" }, "*");
}

function conjuguemos() {
    window.postMessage({ source: "Spanish Test Solver", command: "conjuguemos" }, "*");
}

function _123teachme() {
    window.postMessage({ source: "Spanish Test Solver", command: "teachme" }, "*");
}

function _quizlet() {
    window.postMessage({ source: "Spanish Test Solver", command: "quizlet" }, "*");
}

function checksite(site) {
    return window.location.href.includes(site);
}

document.getElementById("small_help").addEventListener("click", helpPage);

function helpPage() {
    chrome.tabs.create({ url: chrome.runtime.getURL("help.html") });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bknelson').addEventListener('click', function() {
        window.close();
        chrome.tabs.executeScript({
            code: 'window.postMessage({ source: "Spanish Test Solver", command: "bknelson" }, "*");'
        });
    });
    document.getElementById('conjuguemos').addEventListener('click', function() {
        window.close();
        chrome.tabs.executeScript({
            code: 'window.postMessage({ source: "Spanish Test Solver", command: "conjuguemos" }, "*");'
        });
    });
    document.getElementById('123teachme').addEventListener('click', function() {
        window.close();
        chrome.tabs.executeScript({
            code: 'window.postMessage({ source: "Spanish Test Solver", command: "teachme" }, "*");'
        });
    });
    document.getElementById('quizlet').addEventListener('click', function() {
        window.close();
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "copy_delay|' + copy_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "written_paste_delay|' + written_paste_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "matching_paste_delay|' + matching_paste_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "answer_delay|' + answer_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "scatter_delay|' + scatter_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "transition_delay|' + transition_delay + '" }, "*");'});
        chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "gravity_points|' + gravity_points + '" }, "*");'});
        chrome.tabs.executeScript({
            code: 'window.postMessage({ source: "Spanish Test Solver", command: "quizlet" }, "*");'
        });
    });
});

// alert("Test 2");
// chrome.tabs.executeScript({
//     code: 'var script = document.createElement("script"); script.src = "https://code.jquery.com/jquery-3.2.0.min.js"; script.setAttribute("integrity", "sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I="); script.setAttribute("crossorigin", "anonymous"); (document.head||document.documentElement).appendChild(script);'
// });
chrome.tabs.executeScript({
    code: 'var script = document.createElement("script"); script.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.6.0/clipboard.min.js"; (document.head||document.documentElement).appendChild(script);'
});

/*
chrome.tabs.executeScript({
    code: 'var script = document.createElement("script"); script.src = "https://www.uddernetworks.com/js/scripts.js"; (document.head||document.documentElement).appendChild(script);'
});
 */

chrome.tabs.executeScript({
    code: 'var script = document.createElement("script"); script.src = "' + chrome.runtime.getURL("/replacescripts/scripts.js") + '"; (document.head||document.documentElement).appendChild(script);'
});




// chrome.tabs.executeScript({
//     code: 'var script = document.createElement("script"); script.src = "https://uddernetworks.com/js/gravityreplace_main.js"; (document.head||document.documentElement).appendChild(script);'
// });
//
// chrome.tabs.executeScript({
//     code: 'var script = document.createElement("script"); script.src = "https://uddernetworks.com/js/replace_gravity_script.js"; (document.head||document.documentElement).appendChild(script);'
// });
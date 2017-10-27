var copy_delay = 5;
var written_paste_delay = 1000;
var matching_paste_delay = 5;
var answer_delay = 5;
var scatter = true;
var scatter_delay = 5;
var transition_delay = 100;
var gravity_points = 1000000;
var avail_icons = true;

var copy_delay_def = 5;
var written_paste_delay_def = 1000;
var matching_paste_delay_def = 5;
var answer_delay_def = 5;
var scatter_def = true;
var scatter_delay_def = 5;
var transition_delay_def = 100;
var gravity_points_def = 1000000;
var avail_icons = true;

document.body.onload = function() {
    chrome.storage.sync.get("copy_delay", function(items) {
        if (items.copy_delay == "" || items.copy_delay == "undefined" || items.copy_delay == null) {
            outputUpdate11(copy_delay_def);
        }
        if (!chrome.runtime.error) {
            copy_delay = items.copy_delay;
            document.querySelector('#copy_delay_fader').value = items.copy_delay;
            document.querySelector('#copy_delay').innerHTML = items.copy_delay;
        }
    });
    chrome.storage.sync.get("written_paste_delay", function(items) {
        if (items.written_paste_delay == "" || items.written_paste_delay == "undefined" || items.written_paste_delay == null) {
            outputUpdate21(written_paste_delay_def);
        }
        if (!chrome.runtime.error) {
            written_paste_delay = items.written_paste_delay;
            document.querySelector('#written_paste_delay_fader').value = items.written_paste_delay;
            document.querySelector('#written_paste_delay').innerHTML = items.written_paste_delay;
        }
    });
    chrome.storage.sync.get("matching_paste_delay", function(items) {
        if (items.matching_paste_delay == "" || items.matching_paste_delay == "undefined" || items.matching_paste_delay == null) {
            outputUpdate31(matching_paste_delay_def);
        }
        if (!chrome.runtime.error) {
            matching_paste_delay = items.matching_paste_delay;
            document.querySelector('#matching_paste_delay_fader').value = items.matching_paste_delay;
            document.querySelector('#matching_paste_delay').innerHTML = items.matching_paste_delay;
        }
    });
    chrome.storage.sync.get("answer_delay", function(items) {
        if (items.answer_delay == "" || items.answer_delay == "undefined" || items.answer_delay == null) {
            outputUpdate41(answer_delay_def);
        }
        if (!chrome.runtime.error) {
            answer_delay = items.answer_delay;
            document.querySelector('#answer_delay_fader').value = items.answer_delay;
            document.querySelector('#answer_delay').innerHTML = items.answer_delay;
        }
    });
    chrome.storage.sync.get("scatter_delay", function(items) {
        if (items.scatter_delay == "" || items.scatter_delay == "undefined" || items.scatter_delay == null) {
            outputUpdate61(scatter_delay_def);
        }
        if (!chrome.runtime.error) {
            scatter_delay = items.scatter_delay;
            document.querySelector('#scatter_fader').value = items.scatter_delay;
            document.querySelector('#scatter_delay').innerHTML = items.scatter_delay;
        }
    });
    chrome.storage.sync.get("transition_delay", function(items) {
        if (items.transition_delay == "" || items.transition_delay == "undefined" || items.transition_delay == null) {
            outputUpdate81(transition_delay_def);
        }
        if (!chrome.runtime.error) {
            transition_delay = items.transition_delay;
            document.querySelector('#transition_fader').value = items.transition_delay;
            document.querySelector('#transition_delay').innerHTML = items.transition_delay;
        }
    });
    chrome.storage.sync.get("gravity_points", function(items) {
        if (items.gravity_points == "" || items.gravity_points == "undefined" || items.gravity_points == null) {
            outputUpdate91(gravity_points_def);
        }
        if (!chrome.runtime.error) {
            gravity_points = items.gravity_points;
            document.querySelector('#gravity_points').value = items.gravity_points;
            document.querySelector('#gravity_points').innerHTML = items.gravity_points;
        }
    });
    chrome.storage.sync.get("avail_icons", function(items) {
        if (items.avail_icons == "" || items.avail_icons == "avail_icons" || items.avail_icons == null) {
            outputUpdate71(avail_icons);
        }
        if (!chrome.runtime.error) {
            avail_icons = items.avail_icons;
            document.querySelector('#avail_icons').checked = items.avail_icons;
        }
    });
};

document.getElementById("copy_delay_fader").addEventListener("input", outputUpdate1);
document.getElementById("scatter_fader").addEventListener("input", outputUpdate6);
document.getElementById("answer_delay_fader").addEventListener("input", outputUpdate4);
document.getElementById("transition_delay").addEventListener("input", outputUpdate8);
document.getElementById("gravity_points").addEventListener("input", outputUpdate9);
document.getElementById("written_paste_delay_fader").addEventListener("input", outputUpdate2);
document.getElementById("matching_paste_delay_fader").addEventListener("input", outputUpdate3);
jQuery("#avail_icons").change(function() {outputUpdate71(this.checked);});

function outputUpdate1(data) {
    outputUpdate11(data.target.value);
}

function outputUpdate2(data) {
    outputUpdate21(data.target.value);
}

function outputUpdate3(data) {
    outputUpdate31(data.target.value);
}

function outputUpdate4(data) {
    outputUpdate41(data.target.value);
}
function outputUpdate5(data) {
    outputUpdate51(document.getElementById("scatter").checked);
}

function outputUpdate6(data) {
    outputUpdate61(data.target.value);
}
function outputUpdate8(data) {
    outputUpdate81(data.target.value);
}
function outputUpdate9(data) {
    outputUpdate91(data.target.value);
}
function outputUpdate7(data) {
    console.log("Value is: " + data.target.value != "on");
    // outputUpdate71(data.target.value != "on");
}

function outputUpdate11(data) {
    copy_delay = data;
    document.querySelector('#copy_delay').value = copy_delay;
    chrome.storage.sync.set({ "copy_delay" : copy_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "copy_delay|' + copy_delay + '" }, "*");'});
}

function outputUpdate21(data) {
    written_paste_delay = data;
    document.querySelector('#written_paste_delay').value = written_paste_delay;
    chrome.storage.sync.set({ "written_paste_delay" : written_paste_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "written_paste_delay|' + written_paste_delay + '" }, "*");'});
}

function outputUpdate31(data) {
    matching_paste_delay = data;
    document.querySelector('#matching_paste_delay').value = matching_paste_delay;
    chrome.storage.sync.set({ "matching_paste_delay" : matching_paste_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "matching_paste_delay|' + matching_paste_delay + '" }, "*");'});
}

function outputUpdate41(data) {
    answer_delay = data;
    document.querySelector('#answer_delay').value = answer_delay;
    chrome.storage.sync.set({ "answer_delay" : answer_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "answer_delay|' + answer_delay + '" }, "*");'});
}
function outputUpdate51(data) {
    scatter = data;
    document.querySelector('#scatter').value = scatter;
    chrome.storage.sync.set({ "scatter" : scatter }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

function outputUpdate61(data) {
    scatter_delay = data;
    document.querySelector('#scatter_delay').value = scatter_delay;
    chrome.storage.sync.set({ "scatter_delay" : scatter_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "scatter_delay|' + scatter_delay + '" }, "*");'});
}

function outputUpdate81(data) {
    transition_delay = data;
    document.querySelector('#transition_delay').value = transition_delay;
    chrome.storage.sync.set({ "transition_delay" : transition_delay }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "transition_delay|' + transition_delay + '" }, "*");'});
}

function outputUpdate91(data) {
    gravity_points = data;
    document.querySelector('#gravity_points').value = gravity_points;
    chrome.storage.sync.set({ "gravity_points" : gravity_points }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
    chrome.tabs.executeScript({code: 'window.postMessage({ source: "Spanish Test Solver Data", command: "gravity_points|' + gravity_points + '" }, "*");'});
}

function outputUpdate71(data) {
    avail_icons = data;
    document.querySelector('#avail_icons').checked = avail_icons;
    chrome.storage.sync.set({ "avail_icons" : avail_icons }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

function getCopyDelay() {
    return copy_delay;
}

function getWrittenPasteDelay() {
    return written_paste_delay;
}

function getMatchingPasteDelay() {
    return matching_paste_delay;
}

function getAnswerDelay() {
    return answer_delay;
}

function getScatterDelay() {
    return scatter_delay;
}

function showAvailIcons() {
    return avail_icons;
}
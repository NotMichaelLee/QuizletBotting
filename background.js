chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        file: 'show_icons.js'
    });
}, {
    url: [{
        hostContains: 'quizlet.com'
    }]
    }
);


var cancel = false;
var notup = false;
// types:
// 0 - blue (info)
// 1 - orange (warning)
// 2 - red - (error)
function sendNotification(text, type) {
    var color;
    if (type === 0) {
        color = "#00B0FF";
    } else if (type === 1) {
        color = "#FFA500";
    } else if (type === 2) {
        color = "#FF0000";
    } else {
        color = "#00B0FF";
    }
    if (notup) {
        cancel = true;
        jQuery("#notification").remove();
        sendpriv();
    } else {
        sendpriv();
    }
    function sendpriv() {
        console.log("Onload making notification popup!");
        var element_popup = document.createElement("DIV");
        element_popup.id = "notification";
        element_popup.setAttribute("display", "block");
        element_popup.style.display = "block";
        element_popup.style.backgroundColor = color;
        element_popup.style.height = "100px";
        element_popup.style.width = "300px";
        element_popup.style.top = "40px";
        element_popup.style.right = "20px";
        element_popup.style.position = "fixed";
        element_popup.style.zIndex = "100";
        element_popup.style.boxShadow = "7px 7px 7px grey";

        var element_other = document.createElement("DIV");
        element_other.style.width = "0";
        element_other.style.height = "0";
        element_other.style.display = "block";
        element_other.style.top = "15px";
        element_other.style.right = "20px";
        element_other.style.borderLeft = "25px solid transparent";
        element_other.style.borderRight = "25px solid transparent";
        element_other.style.borderBottom = "25px solid " + color;
        element_other.style.position = "fixed";

        var textelem = document.createElement("P");
        textelem.style.width = "280px";
        textelem.style.height = "100%";
        textelem.style.margin = "10px";
        textelem.style.color = "white";
        textelem.style.position = "fixed";
        textelem.innerHTML = text;

        notup = true;
        document.getElementsByClassName("ModeLayout")[0].appendChild(element_popup);
        element_popup.appendChild(element_other);
        element_popup.appendChild(textelem);

        setTimeout(function() {
            if (!cancel) {
                jQuery("#notification").fadeOut("slow", function() {
                    jQuery("#notification").remove();
                    notup = false;
                });
            }
        }, 3000);

        jQuery("#notification").click(function() {
            jQuery("#notification").fadeOut("slow", function() {
                jQuery("#notification").remove();
                notup = false;
            });
        });
    }
}

function dismissNotification() {
    if (notup) {
        $("#notification").fadeOut("slow", function() {
            $("#notification").remove();
            notup = false;
        });
    }
}


function handleRequest(requestUrl, tabUrl, tabId) {
    if (!tabUrl.toString().includes("quizlet.com/")) return requestUrl;

    if (tabUrl.toString().includes("/write")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/learn.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/write.js")};
        }
    } else if (tabUrl.toString().includes("/gravity")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/gravity.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/gravity.js")};
        }
    } else if (tabUrl.toString().includes("/spell")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/speller.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/spell.js")};
        }
    } else if (tabUrl.toString().includes("/flashcards")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/cards.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/card.js")};
        }
    } else if (tabUrl.toString().includes("/match")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/match.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/match.js")};
        }
    } else if (tabUrl.toString().includes("/micromatch")) {
        if (requestUrl.toString().includes("quizlet.com/a/j/dist/match.")) {
            return {redirectUrl: chrome.runtime.getURL("/replacescripts/match.js")};
        }
    }

    return requestUrl;
}

var requestIdTracker = (function() {
    var head;
    var tail;
    var length = 0;
    var tracker = {};
    var maxSize = 1000;

    function pop() {
        var val = head.val;
        head = head.next;
        length--;
        delete tracker[val];
    }

    function push(obj) {
        var newNode = {
            val: obj,
            next: undefined
        };
        if (length > 0) {
            tail.next = newNode;
            tail = newNode;
        } else {
            head = newNode;
            tail = newNode;
        }
        length++;
        tracker[obj] = true;
        while (length > maxSize) {
            pop();
        }
    }

    function has(id) {
        return tracker[id];
    }

    return {
        push: push,
        has: has
    };
})();

var tabUrlTracker = (function() {
    // All opened urls
    var urls = {};
    var closeListeners = [];

    var queryTabsCallback = function(allTabs) {
        if (allTabs) {
            allTabs.forEach(function(tab) {
                urls[tab.id] = tab.url;
            });
        }
    };

    var updateTabCallback = function(tabId, changeinfo, tab) {
        urls[tabId] = tab.url;
    };

    // Not all tabs will fire an update event. If the page is pre-rendered,
    // a replace will happen instead.
    var tabReplacedCallback = function(newTabId, oldTabId) {
        delete urls[oldTabId];
        chrome.tabs.get(newTabId, function(tab) {
            urls[tab.id] = tab.url;
        });
    };

    var removeTabCallback = function(tabId) {
        closeListeners.forEach(function(fn) {
            fn(urls[tabId]);
        });
        delete urls[tabId];
    };

    // init
    chrome.tabs.query({}, queryTabsCallback);
    chrome.tabs.onUpdated.addListener(updateTabCallback);
    chrome.tabs.onRemoved.addListener(removeTabCallback);
    chrome.tabs.onReplaced.addListener(tabReplacedCallback);

    return {
        getUrlFromId: function(id) {
            return urls[id];
        }
    };
})();



chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if (!requestIdTracker.has(details.requestId)) {
        if (details.tabId > -1) {
            var tabUrl = tabUrlTracker.getUrlFromId(details.tabId);
            if (details.type === "main_frame") {
                // a new tab must have just been created.
                tabUrl = details.url;
            }
            console.log("tabURL = ");
            console.log(tabUrl);
            if (tabUrl) {
                var result = handleRequest(details.url, tabUrl, details.tabId);
                // if (result) {
                //     // make sure we don't try to redirect again.
                //     requestIdTracker.push(details.requestId);
                // }
                console.log("---------------------------------------------===============================");
                console.log("GADEEEMMMMMMM");
                console.log(result);
                return result;
            }
        }
    }
},
    {urls: ["<all_urls>"]},
    ["blocking"]);
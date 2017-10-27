var use = true;
useIcons(function() {
    if (use) {
        var i120 = 0;
        iconGen();
        function iconGen() {
            if (!(i120 >= 6)) {
                var e = document.createElement("IMG"),
                    t = document.getElementsByClassName("SetPageModeButton-icon"),
                    n = new Image;
                n.onload = function() {
                    e.src = this.src, e.style.position = "relative";
                    e.style.height = "40px";
                    e.style.width = "40px";
                    e.style.paddingLeft = "0";
                    e.style.paddingTop = "0";
                    e.style.top = "-134px";
                    e.style.left = "-46px";
                    var n = i120 + 1;
                    if (n != null) {
                        t[n].appendChild(e);
                    }
                    i120++;
                    iconGen();
                };
                n.src = "https://www.uddernetworks.com/js/icon_80x80.png";
            }
        }
    }
})

function useIcons(callback) {
    chrome.storage.sync.get("avail_icons", function(items) {
        if (items.avail_icons == "" || items.avail_icons == "avail_icons" || items.avail_icons == null) use = true;
        if (!chrome.runtime.error) use = items.avail_icons;
        callback();
    });
}
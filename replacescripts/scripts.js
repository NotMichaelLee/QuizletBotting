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

function convertWordUrlThing() {
    if (window.location.href.toString().includes("prompt-with=0")) { // Definition
        return "Definition";
    } else if (window.location.href.toString().includes("prompt-with=1")) { // Term
        return "Term";
    } else if (window.location.href.toString().includes("prompt-with=2")) { // Both
        return "Both";
    }
}

var copy_delay = null;
var written_paste_delay = null;
var matching_paste_delay = null;
var answer_delay = null;
var scatter_delay = null;
var transition_delay = null;
var gravity_points = null;

var question_type = convertWordUrlThing();

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

function getTransitionDelay() {
    return transition_delay;
}

function getScatterTime() {
    return scatter_delay;
}

function getGravityPoints() {
    return gravity_points;
}

window.addEventListener("message", function (event) {
    if (event.data.source && (event.data.source === "Spanish Test Solver")) {
        switch (event.data.command) {
            case "teachme":
                teachme_();
                break;
            case "bknelson":
                bknelson_();
                break;
            case "conjuguemos":
                conjuguemos_();
                break;
            case "quizlet":
                quizlet_();
                break;
            default:
                console.log("Invalid message! GOT: " + event.data.command);
                break;
        }
    } else if (event.data.source && (event.data.source === "Spanish Test Solver Data")) {
        if (event.data.command.indexOf('copy_delay|') === 0) {
            copy_delay = parseInt(event.data.command.replace("copy_delay|", ""));
        } else if (event.data.command.indexOf("written_paste_delay|") === 0) {
            written_paste_delay = parseInt(event.data.command.replace("written_paste_delay|", ""));
        } else if (event.data.command.indexOf("matching_paste_delay|") === 0) {
            matching_paste_delay = parseInt(event.data.command.replace("matching_paste_delay|", ""));
        } else if (event.data.command.indexOf("answer_delay|") === 0) {
            answer_delay = parseInt(event.data.command.replace("answer_delay|", ""));
        } else if (event.data.command.indexOf("scatter_delay|") === 0) {
            scatter_delay = parseFloat(event.data.command.replace("scatter_delay|", ""));
        } else if (event.data.command.indexOf("transition_delay|") === 0) {
            transition_delay = parseFloat(event.data.command.replace("transition_delay|", ""));
        } else if (event.data.command.indexOf("gravity_points|") === 0) {
            gravity_points = parseInt(event.data.command.replace("gravity_points|", ""));
        }
    }
}, false);

function teachme_() {
    if (!window.location.href.toString().includes("www.123teachme.com")) {
        sendNotification("ERROR: Not detected to be a 123Teachme URL", 2);
        return;
    }
    var text = document.getElementsByTagName("script")[10].innerText;
    var parsed = JSON.parse(text.substring(96, text.length - 90));
    for (var i = 0; i < parsed.length; i++) {
        var elem = document.getElementsByClassName("sq-sel" + i)[0];
        for (var i2 = 0; i2 < elem.options.length; i2++) {
            if (parsed[i].correct === elem.options[i2 + 1].innerText.substring(elem.options[i2 + 1].innerText.indexOf(">"), elem.options[i2 + 1].length)) {
                elem.options[i2 + 1].selected = true;
                jQuery.tch.store[0].t.checkWord(i);
                break;
            }
        }
    }
    sendNotification("Completed questions!", 0);
}
function conjuguemos_() {
    if (!window.location.href.toString().includes("conjuguemos.com")) {
        sendNotification("ERROR: Not detected to be a Conjuguemos URL", 2);
        return;
    }
    activity.showResult(0, 0);
    sendNotification("Shown completed message!", 0);
}
function bknelson_() {
    if (!window.location.href.toString().includes("personal.colby.edu/~bknelson")) {
        sendNotification("ERROR: Not detected to be a bknelson URL", 2);
        return;
    }
    var i = 0;
    var elemz = document.getElementsByTagName("input");
    for (var i662 = 0; i662 < elemz.length; i662++) {
        var elem = elemz[i662];
        if (elem.name.includes("item")) {
            var onch = elem.getAttribute("onchange");
            elem.value = onch.substring(12, onch.length - 2);
        }
    }
    sendNotification("Completed questions!", 0);
}
var stopg = false;
function stopg() {
    stopg = true;
}

var terms_defs = [];
var curr_grav_word = null;
var j = 0;
var waitPasting = false;
var clickElem = null;
var waiting;
var pasting = "";
var element = null;
var container_exter = null;
function quizlet_() {
    if (!window.location.href.toString().includes("quizlet.com")) {
        sendNotification("ERROR: Not detected to be a Quizlet URL", 2);
        return;
    }

    // if(window.location.href.toString().includes("/learn") || window.location.href.toString().includes("/micromatch")) { //  && !window.jQuery
    //     var script = document.createElement('script');
    //     script.type = "text/javascript";
    //     script.src = "https://code.jquery.com/jquery-3.2.0.min.js";
    //     script.setAttribute("integrity", "sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I=");
    //     script.setAttribute("crossorigin", "anonymous");
    //     document.getElementsByTagName('head')[0].appendChild(script);
    // }

    // if ($ != null) $.noConflict();
    // $.noConflict();

    if (window.location.href.toString().includes("/learn")) {
        setCookie("runningLearn", 'true', 1);

        location.reload();

    } else if (window.location.href.toString().includes("/flashcards")) {
        setCookie("runningCards", 'true', 1);

        location.reload();

    } else if (window.location.href.toString().includes("/spell")) {
        setCookie("runningSpell", 'true', 1);

        location.reload();

    } else if (window.location.href.toString().includes("/write")) {
        setCookie("runningWrite", 'true', 1);

        location.reload();

    } else if (window.location.href.toString().includes("/match")) {

        setCookie("runningMatch", 'true', 1);
        setCookie("matchTime", getScatterTime(), 1);
        console.log("scaterTime:::: " + getScatterTime());

        location.reload();

        // alert("You will be rerouted to " + window.location.href.replace("/match", "/micromatch") + " shortly. Please click the 'quizlet' button again once the page is loaded.");
        // setTimeout(function() { window.location.href = window.location.href.replace("/match", "/micromatch"); }, 100);
    } else if (window.location.href.toString().includes("/micromatch")) {

        setCookie("runningMatch", 'true', 1);
        setCookie("matchTime", getScatterTime(), 1);
        console.log("scaterTime:::: " + getScatterTime());

        location.reload();

        return;
    } else if (window.location.href.toString().includes("/gravity")) {
        setCookie("runningGravity", 'true', 1);
        setCookie("gravityPoints", getGravityPoints(), 1);

        location.reload();

        return;
    } else if (window.location.href.toString().includes("/test")) {
        sendNotification("Starting test, don't do anything yet...", 0);
        startTest();
    } else {
        sendNotification("ERROR: URL did not match any Quizlet game URLs", 2);
        return;
    }

    // TODO :::: START WITH TERM

    function startTest() {
        createiFrame("/test", function() {
            var elem1 = document.getElementsByClassName("TestModeSection-questionItem");
            for (var i3 = 0; i3 < elem1.length; i3++) {
                if (!!elem1[i3].getElementsByTagName("span")[0]) {
                    // exists
                    var clazzname = elem1[i3].getElementsByTagName("span")[0].className;
                    if (clazzname === "TestModeTrueFalseQuestion") {
                        var q_base = elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-prompt")[0].getElementsByClassName("TestModeTermText");

                        var first = q_base[0].getElementsByTagName("span")[0].innerText.trim();
                        var second = q_base[1].getElementsByTagName("span")[0].innerText.trim();

                        var error = true;
                        for (var i2 = 0; i2 < terms_defs.length; i2++) {
                            if (question_type === "Term") {
                                console.log("Term");
                                if (terms_defs[i2][1] === first) {
                                    if (terms_defs[i2][0] === second) {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[0].getElementsByClassName("UIRadio-input")[0].click();
                                    } else {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[1].getElementsByClassName("UIRadio-input")[0].click();
                                    }
                                    error = false;
                                    break;
                                }
                            } else if (question_type === "Definition") {
                                console.log("Definition");
                                if (terms_defs[i2][0] === first) {
                                    if (terms_defs[i2][1] === second) {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[0].getElementsByClassName("UIRadio-input")[0].click();
                                    } else {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[1].getElementsByClassName("UIRadio-input")[0].click();
                                    }
                                    error = false;
                                    break;
                                }
                            } else {
                                if (terms_defs[i2][1] === first) {
                                    if (terms_defs[i2][0] === second) {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[0].getElementsByClassName("UIRadio-input")[0].click();
                                    } else {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[1].getElementsByClassName("UIRadio-input")[0].click();
                                    }
                                    error = false;
                                    break;
                                }

                                if (terms_defs[i2][0] === first) {
                                    if (terms_defs[i2][1] === second) {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[0].getElementsByClassName("UIRadio-input")[0].click();
                                    } else {
                                        elem1[i3].getElementsByClassName("TestModeTrueFalseQuestion")[0].getElementsByClassName("TestModeTrueFalseQuestion-choices")[0].getElementsByClassName("UIRadio")[1].getElementsByClassName("UIRadio-input")[0].click();
                                    }
                                    error = false;
                                    break;
                                }
                            }
                        }
                    } else if (clazzname === "TestModeMultipleChoiceQuestion") {
                        var text = elem1[i3].getElementsByClassName("TestModeMultipleChoiceQuestion")[0].getElementsByClassName("TestModeMultipleChoiceQuestion-prompt")[0].getElementsByClassName("TestModeTermText")[0].getElementsByTagName("span")[0].innerText.trim();
                        var answer_elems = elem1[i3].getElementsByClassName("TestModeMultipleChoiceQuestion")[0].getElementsByClassName("TestModeMultipleChoiceQuestion-choicesList")[0].getElementsByClassName("TestModeMultipleChoiceQuestion-choice");
                        for (var i4 = 0; i4 < answer_elems.length; i4++) {
                            var answer = answer_elems[i4];

                            var current_ = answer.getElementsByClassName("UIRadio")[0].getElementsByClassName("UIRadio-label")[0].getElementsByClassName("TestModeTermText")[0].getElementsByTagName("span")[0].innerText;
                            for (var i2 = 0; i2 < terms_defs.length; i2++) {
                                if (question_type === "Term") {
                                    if (terms_defs[i2][0] === current_) {
                                        if (terms_defs[i2][1] === text) {
                                            answer.getElementsByTagName("input")[0].click();
                                            break;
                                        }
                                    }
                                } else if (question_type === "Definition") {
                                    if (terms_defs[i2][1] === current_) {
                                        if (terms_defs[i2][0] === text) {
                                            answer.getElementsByTagName("input")[0].click();
                                            break;
                                        }
                                    }
                                } else {
                                    if (terms_defs[i2][0] === current_) {
                                        if (terms_defs[i2][1] === text) {
                                            answer.getElementsByTagName("input")[0].click();
                                            break;
                                        }
                                    }

                                    if (terms_defs[i2][1] === current_) {
                                        if (terms_defs[i2][0] === text) {
                                            answer.getElementsByTagName("input")[0].click();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var elem11 = document.getElementsByClassName("TestModeWrittenQuestion");
            if (elem11 !== null && elem11.length > 0) {
                var answers = [];
                for (var i31 = 0; i31 < elem11.length; i31++) {
                    var question = elem11[i31].getElementsByClassName("TermText notranslate")[0].innerText.trim();
                    for (var i2 = 0; i2 < terms_defs.length; i2++) {
                        if (question_type === "Term") {
                            if (terms_defs[i2][1] === question) {
                                answers[i31] = [];
                                answers[i31][0] = terms_defs[i2][1];
                                answers[i31][1] = terms_defs[i2][0];
                            }
                        } else if (question_type === "Definition") {
                            if (terms_defs[i2][0] === question) {
                                answers[i31] = [];
                                answers[i31][1] = terms_defs[i2][1];
                                answers[i31][0] = terms_defs[i2][0];
                            }
                        } else {
                            if (terms_defs[i2][1] === question) {
                                answers[i31] = [];
                                answers[i31][0] = terms_defs[i2][1];
                                answers[i31][1] = terms_defs[i2][0];
                            }

                            if (terms_defs[i2][0] === question) {
                                answers[i31] = [];
                                answers[i31][1] = terms_defs[i2][1];
                                answers[i31][0] = terms_defs[i2][0];
                            }
                        }
                    }
                }

                jQuery(".AutoExpandTextarea-textarea").bind("paste", function (e) {
                    if (waiting !== null && waitPasting) {
                        var pastedData = e.originalEvent.clipboardData.getData('text');
                        if (pastedData.trim() === pasting) {
                            waitPasting = false;
                            setTimeout(waiting, getWrittenPasteDelay());
                        } else {
                            e.preventDefault();
                            copyText(container_exter, "err_textcopyier_written_", true, element, pasting, null);
                        }
                    } else {
                        e.preventDefault();
                    }
                });

                var written_cont = document.getElementsByClassName("TestModeWrittenQuestion")[0].parentNode.parentNode;

                var element3 = written_cont.getElementsByClassName("AutoExpandTextarea-textarea")[0];
                if (element3 !== null) element3.parentNode.style.backgroundColor = "#FFA500";

                sendNotification("Click the orange element and hold CTRL + V", 0);
                var first = true;
                written_cont.getElementsByClassName("AutoExpandTextarea-textarea")[0].onclick = function () {
                    dismissNotification();
                    if (first) {
                        first = false;
                        element3.parentNode.style.backgroundColor = "transparent";
                        increment_written();
                        written_cont.getElementsByClassName("AutoExpandTextarea-textarea")[0].onclick = null;
                    }
                };

                var index = 0;

                function increment_written() {
                    if (answers.length > index) {
                        var element_written = document.getElementsByClassName("AutoExpandTextarea-textarea")[j];
                        if (element_written !== null) {
                            copyText(written_cont, "textcopyer_fillin_", true, element_written, answers[index][1], function (success) {
                                index++;
                                clickElem = element_written;
                                element_written.click();
                                element_written.focus();
                                element_written.select();
                                waitPasting = true;
                                waitPaste(function () {
                                    clearPaste();
                                    j++;
                                    increment_written();
                                });
                            });
                        }
                    } else {
                        clearSelection();
                        jQuery(".AutoExpandTextarea-textarea").unbind("paste");
                        startMatch();
                    }
                }
            } else {
                startMatch();
            }

            function startMatch() {
                // console.log("startMatch()");


                var container_qs = document.getElementsByClassName("TestModeMatchingQuestion")[0].parentNode.parentNode;
                if (container_qs === null) return;
                if (container_qs.length === 0) return;

                var question_arr = [];
                var answer_arr_temp = [];
                var answer_arr = [];

                var questions = container_qs.getElementsByClassName("TestModeMatchingQuestion-promptSide")[0].getElementsByClassName("TestModeMatchingQuestion-promptSideList")[0].getElementsByClassName("TestModeMatchingQuestion-promptSideListItem");
                for (var i2 = 0; i2 < questions.length; i2++) {
                    question_arr[i2] = [];
                    var text = questions[i2].getElementsByClassName("TestModeMatchingQuestion-prompt")[0].getElementsByClassName("TestModeTermText")[0].getElementsByTagName("span")[0].innerText;
                    question_arr[i2][1] = text.trim();
                    question_arr[i2][0] = questions[i2].getElementsByClassName("TestModeMatchingQuestion-matchingInput")[0].getElementsByClassName("UIInput")[0].getElementsByClassName("UIInput-content")[0].getElementsByClassName("UIInput-input")[0];
                }

                var answers = container_qs.getElementsByClassName("TestModeMatchingQuestion-optionsSide")[0].getElementsByClassName("TestModeMatchingQuestion-optionsSideList")[0].getElementsByClassName("TestModeMatchingQuestion-optionsSideListItem");
                for (var i3 = 0; i3 < questions.length; i3++) {
                    var text = answers[i3].getElementsByClassName("TestModeTermText")[0].getElementsByTagName("span")[0].innerText;
                    answer_arr_temp[i3] = text.trim();
                }

                var letters = getLettering(answer_arr_temp.length);
                for (var i4 = 0; i4 < answer_arr_temp.length; i4++) {
                    answer_arr[i4] = [];
                    answer_arr[i4][1] = letters[i4].toUpperCase();
                    answer_arr[i4][0] = answer_arr_temp[i4];

                    console.log(answer_arr[i4]);
                }

                for (var i5 = 0; i5 < question_arr.length; i5++) {
                    for (var i6 = 0; i6 < terms_defs.length; i6++) {

                        if (question_type === "Term") {
                            if (terms_defs[i6][0] === question_arr[i5][1]) {
                                for (var i7 = 0; i7 < answer_arr.length; i7++) {
                                    if (answer_arr[i7][0] === terms_defs[i6][1]) {
                                        question_arr[i5][0] = answer_arr[i7][1];
                                        break;
                                    }
                                }
                            }
                        } else if (question_type === "Definition") {
                            if (terms_defs[i6][1] === question_arr[i5][1]) {
                                for (var i7 = 0; i7 < answer_arr.length; i7++) {
                                    if (answer_arr[i7][0] === terms_defs[i6][0]) {
                                        question_arr[i5][0] = answer_arr[i7][1];
                                        break;
                                    }
                                }
                            }
                        } else {
                            if (terms_defs[i6][0] === question_arr[i5][1]) {
                                for (var i7 = 0; i7 < answer_arr.length; i7++) {
                                    if (answer_arr[i7][0] === terms_defs[i6][1]) {
                                        question_arr[i5][0] = answer_arr[i7][1];
                                        break;
                                    }
                                }
                            }

                            if (terms_defs[i6][1] === question_arr[i5][1]) {
                                for (var i7 = 0; i7 < answer_arr.length; i7++) {
                                    if (answer_arr[i7][0] === terms_defs[i6][0]) {
                                        question_arr[i5][0] = answer_arr[i7][1];
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                jQuery(".UIInput-input").bind("paste", function (e) {
                    if (waiting !== null && waitPasting) {
                        var pastedData = e.originalEvent.clipboardData.getData('text');
                        if (pastedData.trim() === pasting) {
                            waitPasting = false;
                            setTimeout(waiting, getMatchingPasteDelay());
                        } else {
                            e.preventDefault();
                            copyText(container_exter, "err_textcopyier_", true, element, pasting, null);
                        }
                    } else {
                        e.preventDefault();
                    }
                });

                // var element2 = container_qs.getElementsByClassName("UIInput-input")[0];
                // if (element2 !== null) element2.parentNode.style.backgroundColor = "#FFA500";

                // sendNotification("Click the orange element (Until the orange is gone, may require 2 clicks) and hold CTRL + V", 0);
                // var first = true;
                // container_qs.getElementsByClassName("UIInput-input")[0].onclick = function () {
                //     if (first) {
                //         first = false;
                //         element2.parentNode.style.backgroundColor = "transparent";
                //         increment();
                //         document.getElementsByClassName("UIInput-input")[0].onclick = null;
                //     }
                // };

                container_qs.getElementsByClassName("UIInput-input")[0].click();
                setTimeout(function() {
                    increment();
                }, getTransitionDelay());

                container_qs.getElementsByClassName("UIInput")[0].onfocus = function() {
                    if (first) {
                        container_qs.getElementsByClassName("UIInput-input")[0].click();
                    }
                    container_qs.getElementsByClassName("UIInput")[0].onfocus = null;
                };

                var index = 0;

                j = 0;
                function increment() {
                    if (question_arr.length > index) {
                        var element = container_qs.getElementsByClassName("UIInput-input")[j];
                        if (element !== null) {
                            copyText(container_qs, "textcopyier_", true, element, question_arr[index][0], function () {
                                index++;
                                clickElem = element;
                                element.click();
                                element.focus();
                                element.select();
                                waitPasting = true;
                                waitPaste(function () {
                                    clearPaste();
                                    j++;
                                    increment();
                                });
                            });
                        }
                    } else {
                        clearSelection();
                        jQuery(".UIInput-input").unbind("paste");
                        // console.log("Finished! Submitting test!");

                        setTimeout(function() {
                            document.getElementsByClassName("UIButton UIButton--fill UIButton--hero")[0].click();
                        }, getTransitionDelay());
                    }
                }

                function getLettering(threshhold) {
                    function getCharAt(at) {
                        return genCharArray('a', 'z')[at - 1];
                    }

                    function genCharArray(charA, charZ) {
                        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
                        for (; i <= j; ++i) {
                            a.push(String.fromCharCode(i));
                        }
                        return a;
                    }

                    var at = 0;
                    var index = 0;
                    var rets = [];
                    while (true) {
                        var arr = genCharArray('a', 'z');
                        if (at >= 100) break; // Master threshhold of 2600 questions (If you need to change this for a test I reccomend changing your teacher first because holy crap)
                        if (at === 0) {
                            for (var i = 0; i < arr.length; i++) {
                                if (index >= threshhold) return rets;
                                index++;
                                console.log("cha = " + (arr[i]));
                                rets.push(arr[i]);
                            }
                            at++;
                        } else {
                            var before = getCharAt(at);
                            for (var i = 0; i < arr.length; i++) {
                                if (index >= threshhold) return rets;
                                index++;
                                console.log("cha = " + (before + arr[i]));
                                rets.push(before + arr[i]);
                            }
                            at++;
                        }
                    }
                    return rets;
                }
            }
        });
    }
}

function idToWord(id) {
    var ret = null;
    window.Quizlet.gravityModeData.terms.forEach(function(elem) {
        if (parseInt(elem.id) === parseInt(id)) {
            ret = elem.word;
        }
    });
    return ret;
}

function createiFrame(prefix, callback) {
    console.log("Creating iframe!!!!"); // window.Quizlet.matchModeData

    var obj;
    switch (prefix) {
        case "/test":
            obj = window.Quizlet.TestModeData;
            break;
        case "/gravity":
            obj = window.Quizlet.gravityModeData;
            break;
        case "/micromatch":
            obj = window.Quizlet.matchModeData;
            break;
    }

    obj["terms"].forEach(function(elem) {
        terms_defs.push([elem.word, elem.definition]);
    });
    callback();
}

function copyText(container, prefix, selectnstuff, elem, text, callback) {
    console.log("Copying \"" + text + "\"");
    function random_character() {
        var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
        return chars.substr(Math.floor(Math.random() * 62), 1);
    }
    container_exter = container;
    var elemtt = document.createElement("TEXTAREA");
    var idName = prefix + random_character() + random_character() + random_character() + random_character() + random_character() + "_" + random_character() + random_character() + random_character() + random_character() + random_character();
    if (document.getElementById(idName) !== null) document.getElementById(idName).remove();
    elemtt.id = idName;
    elemtt.innerHTML = text;
    if (callback !== null) waiting = callback;
    pasting = text;
    elemtt.setAttribute("display", "none");
    elemtt.style.opacity = "0";
    elemtt.style.backgroundColor = "transparent";
    elemtt.style.color = "transparent";
    elemtt.style.position = "absolute";
    elemtt.onclick = function () {
        elemtt.focus();
        elemtt.select();
        var completed = !!document.execCommand("copy");
        setTimeout(function () {
            elemtt.remove();
            if (selectnstuff) {
                elem.click();
                elem.focus();
                elem.select();
            }
            if (callback !== null) callback(completed);
        }, getCopyDelay());

    };
    element = elem;
    elem.parentNode.insertBefore(elemtt, elem);
    jQuery("#" + idName).bind("paste", function (e) {
        e.preventDefault();
    });

    setTimeout(function() {
        document.getElementById(idName).focus();
        jQuery("#" + idName).click();
    }, 10);
}

function clearSelection() {
    if (document.selection) {
        document.selection.empty();
    } else if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
}

function waitPaste(callback) {
    waiting = callback;
}

function clearPaste() {
    waitPasting = false;
    waiting = null;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
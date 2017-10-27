if (window.location.toString().includes("quizlet.com")) {

    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");
    console.log("scriptInjector.js");

// Array.prototype.forEach.call(document.getElementsByTagName("script"), function(el) {
//     if (el.src.includes("main")) {
//         console.log(el.src);
//         el.src = "https://uddernetworks.com/js/gravityreplace_main.js";
//     } else if (el.src.includes("gravity.ce")) {
//         console.log(el.src);
//         el.src = "https://uddernetworks.com/js/replace_gravity_script.js";
//     }
// });

    // document.write('<script src="https://uddernetworks.com/js/gravityreplace_main.js"></script>');
    // document.write('<script src="https://uddernetworks.com/js/replace_gravity_script.js"></script>');

    $(document.head).on('custom-update', '.sub-element', function(){
        $(this).html('<b>yaay!</b>');
    })

    $(document).on('load', 'script', function () {
        console.log("onload script src=\"" + $(this).attr("src") + "\"");
    });

    $("script").load(function () {
        console.log("Script load");
        console.log($(this).attr("src"));
        console.log("-----------");
        console.log("-----------");
    });

}
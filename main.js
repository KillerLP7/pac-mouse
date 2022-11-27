



$(document).ready(function() {
    console.log("ready");

    $("#btnDumm").click(function() {
        console.log("debug"); 
        $("#dummerText").val("Dummmer Text UwU");
    });
    
    $("#btnPizza").click(function() {
        console.log("Pizza"); 
        $("#dummerText").val("PIZZAAAA!!!!");
    });


    // TODO: in jQuery machen
    document.addEventListener("mousemove", e => {
        $(".pizza").css({"padding-left": `${e.clientX}px`, "padding-top": `${e.clientY}px`});
    });
});

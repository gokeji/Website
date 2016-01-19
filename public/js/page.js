var dim = function(element, amount) {
    amount = 100 - amount;
    $(element).css({
        filter: "brightness(" + amount + "%)",
        "-webkit-filter": "brightness(" + amount + "%)", /* Prefixed CSS3 blur filters */
        "-o-filter": "brightness(" + amount + "%)",
        "-ms-filter": "brightness(" + amount + "%)"
    });
}

$(document).ready(function() {

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = ( function() {

            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                    window.setTimeout( callback, 1000 / 60 );

                };

        } )();
    }

    window.onscroll= function() {
        window.requestAnimationFrame(function () {
            var scrollLeft = $(window).scrollLeft();
            var windowWidth = window.innerWidth;

            $(".galleryItem").each(function(idx, ele) {
                var item = $(ele);
                if (item.position().left < scrollLeft + windowWidth * 0.5) {
                    dim(item, 0);
                } else {
                    var overScrollAmount = (item.position().left) - (scrollLeft + windowWidth * 0.5);
                    var brightness = overScrollAmount / (windowWidth * 0.5);
                    dim(item, brightness * 100);
                }
            });
            console.log()
        });
    };

    $(window).trigger("scroll");
});
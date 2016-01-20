var currentPhoto = 0;

$(document).ready(function() {
    var photoCount = $(".photo").length;

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

    //window.onscroll= function() {
    //    window.requestAnimationFrame(function () {
    //        var scrollLeft = $(window).scrollLeft();
    //        var windowWidth = window.innerWidth;
    //
    //        $(".galleryItem").each(function(idx, ele) {
    //            var item = $(ele);
    //            if (item.position().left < scrollLeft + windowWidth * 0.5) {
    //                dim(item, 0);
    //            } else {
    //                var overScrollAmount = (item.position().left) - (scrollLeft + windowWidth * 0.5);
    //                var brightness = overScrollAmount / (windowWidth * 0.5);
    //                dim(item, brightness * 100);
    //            }
    //        });
    //        console.log()
    //    });
    //};

    $("#prevPhoto").click(function(){
        if (currentPhoto > 0) {
            currentPhoto--;
        }

        if (currentPhoto == 0) {
            $("#prevPhoto").hide();
        }

        $("#nextPhoto").show();
        scrollToPic(currentPhoto);
    });

    $("#nextPhoto").click(function(){
        if (currentPhoto < photoCount - 1) {
            currentPhoto++;
        }

        if (currentPhoto == photoCount - 1) {
            $("#nextPhoto").hide();
        }

        $("#prevPhoto").show();
        scrollToPic(currentPhoto);
    });

    //$(window).trigger("scroll");
});

function scrollToPic(index) {
    var leftPosition = 0;

    if (index != 0) {
        var photo = $(".photo").eq(index);
        var padding = (photo.innerWidth() - photo.width()) / 2;

        leftPosition = photo.position().left + padding - 50;

        var galleryWidth = 0;
        $(".galleryItem").each(function(idx, ele) {
            galleryWidth += $(ele).width();
        });
        leftPosition = Math.min(leftPosition, galleryWidth - $(window).width());
    }

    allTransform($("#gallery"), "translate3d(-" + leftPosition + "px, 0, 0)");
}

function allTransform(element, value) {
    $(element).css({
        "-webkit-transform": value,
        "-moz-transform":    value,
        "-ms-transform":     value,
        "-o-transform":      value,
        "transform":         value
    });
}

function dim(element, amount) {
    amount = 100 - amount;
    $(element).css({
        filter: "brightness(" + amount + "%)",
        "-webkit-filter": "brightness(" + amount + "%)", /* Prefixed CSS3 blur filters */
        "-o-filter": "brightness(" + amount + "%)",
        "-ms-filter": "brightness(" + amount + "%)"
    });
}

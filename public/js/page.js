var currentPhoto = 0;

$(document).ready(function() {

    $('.photo').click(function(e){
        var photo = $(e.currentTarget);
        var src = photo.data('src');
        var image = $('img').attr('src', src);
        $('#spotlight').append(image);
        $('#spotlight-overlay').show();
        $('body').addClass('overlay');
    });

    $('#spotlight-overlay').click(function(e){
        $(e.currentTarget).hide();
        $('body').removeClass('overlay');
    });

    $('#prevPhoto').click(function(){
        if (currentPhoto > 0) {
            currentPhoto--;
        }

        if (currentPhoto == 0) {
            $('#prevPhoto').hide();
        }

        $('#nextPhoto').show();
        scrollToPic(currentPhoto);
    });

    $('#nextPhoto').click(function(){
        if (currentPhoto < photoCount - 1) {
            currentPhoto++;
        }

        if (currentPhoto == photoCount - 1) {
            $('#nextPhoto').hide();
        }

        $('#prevPhoto').show();
        scrollToPic(currentPhoto);
    });
});

function scrollToPic(index) {
    var leftPosition = 0;

    if (index != 0) {
        var photo = $('.photo').eq(index);
        var padding = (photo.innerWidth() - photo.width()) / 2;

        leftPosition = photo.position().left + padding - 50;

        var galleryWidth = 0;
        $('.galleryItem').each(function(idx, ele) {
            galleryWidth += $(ele).width();
        });
        leftPosition = Math.min(leftPosition, galleryWidth - $(window).width());
    }

    allTransform($('#gallery'), 'translate3d(-' + leftPosition + 'px, 0, 0)');
}

function allTransform(element, value) {
    $(element).css({
        '-webkit-transform': value,
        '-moz-transform':    value,
        '-ms-transform':     value,
        '-o-transform':      value,
        'transform':         value
    });
}

function dim(element, amount) {
    amount = 100 - amount;
    $(element).css({
        filter: 'brightness(' + amount + '%)',
        '-webkit-filter': 'brightness(' + amount + '%)', /* Prefixed CSS3 blur filters */
        '-o-filter': 'brightness(' + amount + '%)',
        '-ms-filter': 'brightness(' + amount + '%)'
    });
}

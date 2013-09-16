var navbarHeight = 50;

$(document).ready(function ($) {

	// initial Home section resize
	homeResize();


	// Smooth scrolling to anchors
  	var $root = $('html, body');
	$('#navbar a, a.animate').click(function() {
	    var href = $.attr(this, 'href');
	    $root.animate({
	        scrollTop: $(href).offset().top - navbarHeight
	    }, 500, function () {
	        window.location.hash = href;

	    });


	    return false;
	});
  	$('#navbar').scrollspy();
  
    
    // resize home section when resizing window
    $(window).resize(function(){
        homeResize();
	    // $('#navbar').offset({top: $('body').scrollTop(), left:0});
    });

    // $(window).scroll(function(){
	   //  // fix bug where navbar wouldn't stay on top in iphone
	   //  $('#navbar').offset({top: $('body').scrollTop(), left:0});
    // });

    // Redirect external links
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	

});


var homeResize = function(){
	var h = $(window).height() - $('#navbar').height();
    var w = $(window).width();
    $("#Home").css('height',h);
    $("#Home").css('width',w);

    // needed to make div scroll independantly, but removing feature
    // $('.my-fluid-container').height(h);
}
var navbarHeight = 50;

$(document).ready(function ($) {

	// initial Home section resize

	homeResize();


	// Smooth scrolling to anchors

  	var $root = $('html, body');
	$('a').click(function() {
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
    });


    // Redirect external links
	
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	

});


var homeResize = function(){
	var h = $(window).height() - navbarHeight;
    var w = $(window).width();
    $("#Home").css('height',h);
    $("#Home").css('width',w);
}
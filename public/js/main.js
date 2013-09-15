$(document).ready(function ($) {

	// Smooth scrolling to anchors

  	var $root = $('html, body');
	$('a').click(function() {
	    var href = $.attr(this, 'href');
	    $root.animate({
	        scrollTop: $(href).offset().top - $('#navbar').height()
	    }, 500, function () {
	        window.location.hash = href;
	    });
	    return false;
	});
  	$('#navbar').scrollspy();
  
    
    // resize home section when resizing window

    $(window).resize(function(){
        var h = $(window).height() - $('#navbar').height();
        var w = $(window).width();
        $("#Home").css('height',h);
        $("#Home").css('width',w);
    });


    // Redirect external links
	
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	


});
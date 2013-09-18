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

	//start carousel animation
	$('.carousel').carousel({
		interval: 3000
	});
    // Redirect external links
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	

	$('#contactForm').on('submit', function(e){
		e.preventDefault();

	    // create a FormData dataObject from our form
	    var fd = new FormData(document.getElementById('contactForm'));

	    // send it to the server
	    var req = new XMLHttpRequest();


	    req.onreadystatechange=function()
		{
		  	if (req.readyState==4 && req.status==200){
		    	clearFormErrors();
		    	formSuccess();
		    	return;
		  	}

		  	else if (req.readyState==4 && req.status==422){
		    	clearFormErrors();
		    	formHandler(req.responseText);
		    	return;
		  	}

		  	else if (req.readyState==4){
		  		console.log('error: ' + req.statusText);
		  	}
		}

	    req.open('POST', '/message', true);
	    req.send(fd);
	});
});

// function that resizes the Home section to the full size of the viewport
var homeResize = function(){
	var h = $(window).height() - $('#navbar').height();
    var w = $(window).width();
    $("#Home").css('height',h);
    $("#Home").css('width',w);

    // needed to make div scroll independantly, but removing feature
    // $('.my-fluid-container').height(h);
}

// function that takes ajax response and looks for form errors to display
var formHandler = function(data){
	var dataObject = eval(data);
	// console.log(data);
	// console.log(dataObject);

	for(var i = 0; i < dataObject.length; i++){
		var obj = dataObject[i];
		$('#'+obj.param+'Form').addClass('has-error');
		// console.log(obj.param);
		$('#'+obj.param+'Form .help-block').html(obj.msg);
		// console.log(obj.msg);
	}
}

var clearFormErrors = function(){
	$('#contactForm > .form-group').removeClass('has-error has-success');
	$('#contactForm > .form-group > .help-block').html('');
}

var formSuccess = function(){
	$('#contactForm > .form-group').addClass('has-success');
	$('#contactForm > .form-group:first-child > .help-block').html('Message sent!');
	
}
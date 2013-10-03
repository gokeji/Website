var navbarHeight = 50;
var projectsAnimated = false;

$(document).ready(function ($) {

	// initial Home section resize
	homeResize();


	// Smooth scrolling to anchors
  	var $root = $('.my-fluid-container'); //change to html, body for original scrolling
	$('#navbar a, a.animate').click(function() {
	    var href = $.attr(this, 'href');
	    $root.animate({
	        scrollTop: $root.scrollTop() + $(href).position().top //- navbarHeight
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

    // window.onorientationchange = function(){
    // 	homeResize();
    // }

    // $(window).scroll(function(){
	   //  // fix bug where navbar wouldn't stay on top in iphone
	   //  $('#navbar').offset({top: $('body').scrollTop(), left:0});
    // });

	//start carousel animation
	$('.carousel').carousel({interval: 8000});
	
    // Redirect external links
	$("a[rel='external']").click(function(){
		this.target = "_blank";
	}); 	

	$('#contactForm').on('submit', function(e){
		e.preventDefault();

	    clearFormErrors(function(){
	    	$('#contactForm > .form-group:first-child > .help-block').html('Sending message...');
	    });

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

		  	else if (req.readyState==4 && req.status==500){
		    	clearFormErrors();
		    	formFail();
		    	console.log('error: ' + req.statusText);
		    	return;
		  	}

		  	else if (req.readyState==4){
		    	formFail();
		  		console.log('error: ' + req.statusText);
		  	}
		}

	    req.open('POST', '/message', true);
	    req.send(fd);
	});

	$('#projectsTab').on('activate', function(){
		if($(window).width() >= 768){
			if(!projectsAnimated) {
				// create popovers

				$('.carousel-control.right').popover({trigger: 'manual', placement: 'left'});
				$('.carousel-control.right').popover('show');
				$('.carousel-control.left').popover({trigger: 'manual', placement: 'right'});
				$('.carousel-control.left').popover('show');
			}
		}
		projectsAnimated = true;
	});

	$('#Projects').on('click', function(){
		$('.carousel-control.right').popover('hide');
		$('.carousel-control.left').popover('hide');
		//$('.popover').hide(); // I don't know why the popover appears even.. but it does
	});

	$(document).keyup(function(event){
		if(event.which == 39){
			// right arrow key
			$('.carousel-control.right').click();
		}
		if(event.which == 37){
			// right arrow key
			$('.carousel-control.left').click();
		}
	});

	//activate fitText
	// $('.carousel-inner p').each(function(){
	// 	$(this).fitText();
	// });
});

// function that resizes the Home section to the full size of the viewport
var homeResize = function(){
	var navHeight = $(window).width() < 768 ? 64 : 50; //hardcoded navbar height. DO NOT CHANGE NAVBAR HEIGHT
	var h = $(window).height() - navHeight;
    var w = $(window).width();
    $("#Home").css('height',h);
    $("#Home").css('width',w);

    // needed to make div scroll independantly, but removing feature
    $('body').css('padding-top', navHeight);
    $('.my-fluid-container').height(h);

    // change button size accordingly
    // if($(window).width() < 768){

    // }
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

var clearFormErrors = function(callback){
	$('#contactForm > .form-group').removeClass('has-error has-success');
	$('#contactForm > .form-group > .help-block').html('');

	if (Object.prototype.toString.call(callback) == "[object Function]") {
      callback(); 
    }
}

var formSuccess = function(){
	$('#contactForm > .form-group').addClass('has-success');
	$('#contactForm > .form-group:first-child > .help-block').html('Message sent!');
	
}

var formFail = function(){
	$('#contactForm > .form-group').addClass('has-error');
	$('#contactForm > .form-group:first-child > .help-block').html('Message could not be sent. Please try again later or send an email to contact@kaijiangao.com');
	
}
$(window).ready(function(){
	$('img').click(function(){
		document.location.href = $(this).attr('src');
	});
});
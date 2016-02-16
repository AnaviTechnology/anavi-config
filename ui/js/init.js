$(document).on('pagecontainershow', function(e, ui) {
  scan();
});

$( "#buttonConnect" ).bind( "click", function(event, ui) {
	//TODO: validate input data
	var data = {};
	$.post( "/save", function( data ) {
		//TODO: handle response
	});
});

function scan() {
  $.mobile.loading( 'show', {
    text: 'Loading',
    textVisible: true,
    theme: 'b',
    textonly: false,
    html: ''
  });

  $.ajax({
    type: 'GET',
    url: 'scan',
    data: '',
    success: function(data, status) {
      console.log(data);
      $.mobile.loading('hide');
    },
    error: function() {
      console.log('error');
      var errorMessage = 'Error ';
      errorMessage += XMLHttpRequest.status;
      errorMessage += ': ';
      errorMessage += XMLHttpRequest.statusText;
      console.log(errorMessage);
      $.mobile.loading('hide');
    },
  });

}

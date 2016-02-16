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

function wifiShow(data, status) {
  var html = "<li data-role=\"list-divider\">WiFi Networks:</li>\n";
  if (0 === data.length) {
    html += "<li><a href=\"#\">No networks found.</a></li>\n";
  }
  else {
    for (var network=0; network < data.length; network++) {
      var name = (0 === data[network].name.length) ? 'Hidden' : data[network].name;
      html += "<li><a href=\"#\">"+name+"</a></li>\n";
    }
  }
  $('#listWiFi').empty();
  $('#listWiFi').append(html);
  $('#listWiFi').listview('refresh');
  $.mobile.loading('hide');
}

function wifiError() {
  $('#listWiFi').empty();
  $('#listWiFi').listview('refresh');
  console.log('error');
  var errorMessage = 'Error ';
  errorMessage += XMLHttpRequest.status;
  errorMessage += ': ';
  errorMessage += XMLHttpRequest.statusText;
  console.log(errorMessage);
  $.mobile.loading('hide');
}

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
    success: wifiShow,
    error: wifiError,
  });

}

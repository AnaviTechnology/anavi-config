$(document).on('pagecontainershow', function(e, ui) {
  scan();
});

function showWarning(message) {
  $('#warningText').text(message);
  $('#warning').popup('open');
}

function isValid(id, message) {
  if (0 === $(id).val().length) {
    showWarning(message);
    return false;
  }
  return true;
}

$( '#buttonConnect' ).bind( 'click', function(event, ui) {
	//validate input
  if (
      (false == isValid('#inputUserName', 'Please enter username.')) ||
      (false == isValid('#inputUserPassword', 'Please enter password.')) ||
      (false == isValid('#inputServerHost', 'Please specify server host.')) ||
      (false == isValid('#inputServerPort', 'Please specify server port.'))
    ) {
    return;
  }

       var inputData = {
           wifi: {
           name: $('#wifiName').val(),
           id: $('#wifiId').val(),
           hidden: $('#wifiIsOpen').val(),
           password: $('#wifiIsHidden').val()
         },
         mqtt: {
           username: $('#inputWiFiPassword').val(),
           password: $('#inputUserName').val(),
           host: $('#inputServerHost').val(),
           port: $('#inputServerPort').val()
         }
       }

       $.ajax({
         method: 'POST',
         url: '/save',
         data: inputData
       })
       .done(function( msg ) {
         alert( "Saved!" );
       });
});

function updateWiFiData(name, id, isOpen, isHidden) {
  $('#wifiIsHidden').val(isHidden);
  if (true === isHidden) {
    $('#wifiName').val('');
    $('#wifiId').val('');
    $('#wifiIsOpen').val(false);
  }
  else {
    $('#wifiName').val(name);
    $('#wifiId').val(id);                                                     
    $('#wifiIsOpen').val(isOpen);
  }
}

function wifiShow(data, status) {
  var html = "<li data-role=\"list-divider\">WiFi Networks:</li>\n";
  if (0 === data.length) {
    html += "<li><a href=\"#\">No networks found.</a></li>\n";
  }
  else {
    for (var network=0; network < data.length; network++) {
      if (0 === data[network].name.length) {
        html += "<li><a href=\"#\" onclick=\"updateWiFiData('', '', false, true)\">Hidden</a></li>\n";
      }
      else {
        html += "<li><a href=\"#\" onclick=\"updateWiFiData('";
        html += data[network].name.replace(/'/g, "\\'");;
        html += "', '";
        html += data[network].id.replace(/'/g, "\\'");;
        html += "', ";
        html += data[network].open.toString();
        html += ", false)\">"+data[network].name+"</a></li>\n";
      }
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

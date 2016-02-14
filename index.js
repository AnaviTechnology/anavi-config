var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/ui'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', function(req, res) {
	console.log("post request detected");
	var result = { error: 0, errCode: '' }
	res.json(result);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});


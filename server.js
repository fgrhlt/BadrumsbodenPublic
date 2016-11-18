const express = require('express')
const path = require('path')
const app = express()

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/dist'))


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//Initialize app
// var server = app.listen(process.env.PORT || 5000, function () {
//   var port = server.address().port
//   console.log("App now running on port", port)
// })

// //Listen for all APIs
// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'dist/index.html'))
// })

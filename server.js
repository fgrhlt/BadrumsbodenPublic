const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(__dirname+'/dist'))

//Initialize app
var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port
  console.log("App now running on port", port)
})

// //Listen for all APIs
// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'dist/index.html'))
// })

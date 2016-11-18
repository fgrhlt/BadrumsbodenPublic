const express = require('express')
const path = require('path')
const app = express()
console.log('sdfdsf', process.env.PORT);
console.log('TESTTEST:', config, config.devServer, config.port);

app.use(express.static(__dirname))

app.get('/api/posts', (req, res) => {
  res.send([{ id: 1 }])
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.listen(process.env.PORT || 8080)
console.log('Server started')

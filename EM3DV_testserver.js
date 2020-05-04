const express = require('express')
const app = express()

app.use("/examples", express.static('examples'));
app.use("/src", express.static('src')); 
app.use("/assets", express.static('assets')); 

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000);
console.log("Listening on Port 3000");
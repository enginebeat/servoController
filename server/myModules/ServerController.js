function ServerController (){
  var express = require('express');
  var app = express();
  app.use(express.static('server/public'));

  

  var server = app.listen(9000, ()=>{
    console.log('server started on port 9000')

  });
}
module.exports = ServerController;

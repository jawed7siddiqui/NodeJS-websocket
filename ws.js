var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 40510})


CLIENTS=[];

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  // process.exit(1);

});

try {

wss.on('connection', function (ws) {
  CLIENTS.push(ws);

  console.log('Client connected');
  
  ws.on('message', function (message) {
    console.log('received: %s', message)
      sendAll(message);
  })
  ws.on('disconnect', function () {
    console.log('connection disconnect')
  })

  ws.on('error', function () {
    console.log('connection error')
  })

  ws.on('close', function () {
    console.log('connection closed');
  })



// data send to client
  // const data = JSON.stringify({
  //   sell: "test1",
  //   buy: 123,
  // });

  // setInterval(  
  //   () => ws.send(data),
  //   1000
  // )
})

function sendAll (message) {
  for (var i=0; i<CLIENTS.length; i++) {
      CLIENTS[i].send(message, (err) => {
      if (err) console.error(err);
    });

  }
}

} catch (error) {
  console.log(error);
}




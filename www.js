const server = require('./app.js')

server.listen(process.env['PORT'], (err) => {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", process.env['PORT']);
});
// server.on('error', onError);
// server.on('listening', onListening);
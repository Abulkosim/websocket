import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

// io.on('connection', (socket) => {
//   // join the room named 'some room'
//   socket.join('some room');
  
//   // broadcast to all connected clients in the room
//   io.to('some room').emit('hello', 'world');

//   // broadcast to all connected clients except those in the room
//   io.except('some room').emit('hello', 'world');

//   // leave the room
//   socket.leave('some room');
// });
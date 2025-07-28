const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('Chat server running on ws://localhost:8080');
});

// Broadcast to all clients except the sender
function broadcast(sender, message) {
  wss.clients.forEach((client) => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    broadcast(ws, message); // Send to others
  });

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

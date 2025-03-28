const net = require('net');

const MAX = 50000;
const PORT = 3001;
const HOST = '127.0.0.1';

let connections = 0;

for (let i = 0; i < MAX; i++) {
  const socket = net.connect(PORT, HOST, () => {
    connections++;
    console.log(`Connected: ${connections}`);
  });

  socket.on('error', (err) => {
    console.log(`❌ Error at ${i}: ${err.code}`);
  });
}

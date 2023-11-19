// Import required modules
const net = require('net');
const readline = require('readline');

// Create a TCP server
const server = net.createServer();

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set the IP address and port for the chat server
const IP = '192.168.0.1';
const PORT = 8080;

// Connect to the chat server
const client = net.createConnection({ host: '192.168.0.2', port: 8080 });

// Handle incoming messages from the server
client.on('data', (data) => {
  console.log(`Received: ${data}`);
});

// Handle user input and send messages to the server
rl.on('line', (input) => {
  client.write(input);
});

// Start the server
server.listen(PORT, IP, () => {
  console.log(`Server running on ${IP}:${PORT}`);
});

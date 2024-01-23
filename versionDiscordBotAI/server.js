// Import the express module
const express = require('express');

// Initialize the express application
const server = express();

// Define the response for all requests to the root path
server.all('/', (req, res) => {
  res.send(`Bot online, now please copy the link above and paste it in uptimerobot to make this bot 24/7 working!`);
});

// Define the keepAlive function
function keepAlive() {
  // Start the server on port 5000 and log a message to the console
  server.listen(5000, () => {
    console.log(`Server is Ready!! ${Date.now()}`);
  });
}

// Export the keepAlive function
module.exports = keepAlive;

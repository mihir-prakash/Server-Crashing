const http = require("http");

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/register",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on("data", (chunk) => {
    console.log(`Body: ${chunk}`);
  });
});

req.on("error", (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Send malformed JSON
req.write("{ username: 'broken' "); // missing closing brace, bad format
req.end();

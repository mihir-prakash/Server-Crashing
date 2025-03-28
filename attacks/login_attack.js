// attack.js
const fetch = require("node-fetch");

const runFlood = async () => {
  for (let i = 0; i < 1000; i++) {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "fakeuser" + i,
        password: "wrongpass"
      }),
    }).then(res => console.log(`Attempt ${i} - Status: ${res.status}`))
      .catch(err => console.error(`Attempt ${i} - ERROR`, err));
  }
};

runFlood();

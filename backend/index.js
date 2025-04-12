require('dotenv').config();
console.log("MONGO_URI from process.env:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const cors = require('cors');
const http = require('http');

const auth = require('./auth.js');
const articles = require('./articles.js');
const profile = require('./profile.js');
const { loginLimiter } = require('./rateLimit');

const app = express();

// Security-related middleware
const corsOptions = {
    origin: ['https://owl-connect.surge.sh', 'http://localhost:3000'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Limit body size to avoid large payload attacks
app.use(bodyParser.json({ limit: '1kb' }));

// Apply rate limiter on login endpoint
app.use('/login', loginLimiter);

// Test route
app.get('/', (req, res) => res.send({ hello: 'world' }));

// Avoid reconnecting if already connected
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.error("MongoDB Connection Error:", err));
}

app.set('userObjs', {});

// Register all routes
auth(app);
articles(app);
profile(app);

// Create HTTP server to control socket behavior
const port = process.env.PORT || 3001;
const server = http.createServer(app);

// Set keep-alive timeout and header size limit
server.keepAliveTimeout = 5000;  // Close idle connections after 5 sec
server.headersTimeout = 6000;    // Must be larger than keepAliveTimeout

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

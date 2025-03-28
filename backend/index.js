require('dotenv').config();
console.log("🔍 MONGO_URI from process.env:", process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const auth = require('./auth.js');
const cors = require('cors');
const articles = require('./articles.js');
const profile = require('./profile.js');

const app = express();

// ✅ Check if Mongoose is already connected to avoid multiple calls
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGO_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

const hello = (req, res) => res.send({ hello: 'world' });

const allowedOrigins = [
    'https://owl-connect.surge.sh',
    'http://localhost:3000'
];
const corsOptions = { origin: allowedOrigins, credentials: true };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.get('/', hello);
app.set('userObjs', {});

auth(app);
articles(app);
profile(app);

// ✅ Fix Server Logging to Avoid "::" (IPv6 Issue)
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});

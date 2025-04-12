let sessionUser = {};
let cookieKey = "sid";
const md5 = require('md5');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/social_app';

// mongoose.connect(url);
let userObjs = {};

var userSchema = new mongoose.Schema({
    username: String, salt: String, hash: String
});
const User = mongoose.model('user', userSchema);

var profileSchema = new mongoose.Schema({
    username: String, email: String, phone: String, zipcode: String, dob: Date, status: String, following: Array, avatar: String
});
const Profile = mongoose.model('profile', profileSchema);

function isLoggedIn(req, res, next) {
    if (!req.cookies) {
        return res.sendStatus(401);
    }

    let sid = req.cookies[cookieKey];

    if (!sid) {
        return res.sendStatus(401);
    }

    let user = sessionUser[sid];

    if (user) {
        req.user = user;
        next();
    } else {
        return res.sendStatus(401);
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    User.findOne({ username: username }).exec().then(user => {
        if (!user || !user.username || !user.salt || !user.hash) {
            return res.sendStatus(401);
        }

        const hashedPassword = hash(password, user.salt);
        if (hashedPassword !== user.hash) {
            return res.sendStatus(401);
        }

        let sid = hashedPassword;
        sessionUser[sid] = user;

        res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true, sameSite: 'None', secure: true });
        let msg = { username: user.username, result: 'success' };
        res.send(msg);
    });
}

const hash = function (password, salt) {
    return md5(salt + password);
}

function register(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let dob = req.body.dob;
    let phone = req.body.phone;
    let zip = req.body.zip;
    let password = req.body.password;

    if (!username || !password || !email || !dob || !phone || !zip) {
        return res.sendStatus(400);
    }

    let salt = username + new Date().getTime();
    let hashedPass = hash(password, salt);
    new User({ username: username, salt: salt, hash: hashedPass }).save();
    new Profile({
        username: username,
        password: password,
        email: email,
        dob: dob,
        phone: phone,
        zipcode: zip,
        status: "no headline",
        following: [],
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
    }).save();

    let msg = { result: 'success', username: username };
    res.send(msg);
}

function logout(req, res) {
    let sid = req.cookies[cookieKey];
    if (sid) {
        delete sessionUser[sid];
        res.clearCookie(cookieKey);
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
}

module.exports = (app) => {
    //Login route with validation
    app.post('/login',
        [
            body('username').isString().trim().notEmpty(),
            body('password').isString().trim().isLength({ min: 6 })
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            login(req, res);
        });

    //Register route with validation
    app.post('/register',
        [
            body('username').isString().notEmpty(),
            body('password').isString().isLength({ min: 6 }),
            body('email').isEmail(),
            body('dob').isISO8601(),
            body('phone').isMobilePhone(),
            body('zip').isPostalCode('any')
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            register(req, res);
        });

    app.use(isLoggedIn);
    app.put('/logout', logout);
}

module.exports.Profile = Profile;

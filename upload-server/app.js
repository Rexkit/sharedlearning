require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + "-" + file.originalname);
    }
});

const verifyToken = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch {
        return null;
    }
};

const verifyUser = (req, res, next) => {
    if (req.cookies['auth-token'] && verifyToken(req.cookies['auth-token'])) {
        next();
    } else {
        res.send(400);
    };
}

const upload = multer({ storage: storage })

const app = express();
app.use(cookieParser());
app.use(verifyUser);

app.post('/', upload.single('file'), (req, res) => {
    try {
        res.send(req.file);
    }catch(err) {
        res.send(400);
    }
});

app.listen(3001);
require('dotenv').config();
const express = require('express');
const fs = require('fs-extra');
const multer = require('multer');
const cors = require('cors');
const ms = require('mediaserver');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];  
const database = require('knex')(configuration);

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const page_id = req.params.page_id;
        let path = `./uploads/${page_id}`;
        fs.mkdirsSync(path);
        cb(null, path);
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

const upload = multer({ storage: storage })

const app = express();
app.options('*', cors(corsOptions));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const verifyUser = (req, res, next) => {
    if (req.originalUrl.includes('/files')) {
        next();
    } else if (req.cookies['auth-token'] && verifyToken(req.cookies['auth-token'])) {
        next();
    } else {
        res.send(400);
    };  
}

app.use(verifyUser);

app.post('/:user_id/:page_id', upload.single('file'), async (req, res) => {
    console.log(req.file);
    const file = req.file;
    let filesToInsert = {
        filename: file.filename,
        type: file.mimetype.substring(0, file.mimetype.indexOf('/')),
        user_id: req.params.user_id,
        page_id: req.params.page_id
    }
    try {
        await database('media').insert(filesToInsert);
        res.send(filesToInsert);
    }catch(err) {
        res.send(400);
    }
});

app.delete('/:page_id/:id', async (req, res) => {
    const page_id = req.params.page_id;
    const [file] = await database('media').where('id', req.params.id);
    if (await database('media').where('id', req.params.id).del()) {
        fs.unlinkSync(`./uploads/${page_id}/` + file.filename);
        res.send(200);
    } else {
        res.send(400);
    }
});

app.post('/multi/:user_id/:page_id', upload.array('files'), async (req, res) => {
    const files = req.files;
    let filesToInsert = files.map(file => ({
        filename: file.filename,
        type: file.mimetype.substring(0, file.mimetype.indexOf('/')),
        user_id: req.params.user_id,
        page_id: req.params.page_id
    }));;
    try {
        await database('media').insert(filesToInsert);
        res.send(filesToInsert);
    }catch(err) {
        res.send(400);
    }
});

app.get('/files/:page_id/:filename',function(req,res){
    const page_id = req.params.page_id;
    const filename = req.params.filename;
    ms.pipe(req, res, `./uploads/${page_id}/${filename}`);
});

app.listen(3001);
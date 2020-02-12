const express = require('express');
const bodyParser = require('body-parser');
const configParam = require('./config')
const db = require('./db');

const USER = encodeURIComponent(configParam.config.dbUser);
const PASSWORD = encodeURIComponent(configParam.config.dbPassword);
const DB_NAME = configParam.config.dbName;
const DB_HOST = configParam.config.dbHost;
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
db(MONGO_URI);

const router = require('./network/routes');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router(app);
app.use('/app', express.static('public')); //sirve archivos estaticos dentro de "/app"

app.listen(3000);
console.log('la app esta escuchando en http://localhost:3000')
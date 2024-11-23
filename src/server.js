const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg')

RD_HOST = 'redis';
RD_PORT = 6379;
const client = redis.createClient({
    url: `redis://${RD_HOST}:${RD_PORT}`
});

client.on('error', err => console.log('Redis Client Error', err))
client.on('connect', () => console.log('Connected Redis Sucsessfuly'))
client.connect();

// await client.set('key', 'value');
// const value = await client.get('key');
// await client.disconnect();

const app = express();
const PORT = process.env.PORT || 4000

DB_USER = 'root';
DB_PASSWORD = 'example';
DB_HOST = 'mongo';
DB_PORT = 27017;
DB_URI =  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
//conect db

mongoose.connect(DB_URI).then(()=>console.log('connected to mongo DB ')).catch((err)=> console.log('faild to connect to mongo DB', err));

// connect to postgres DB

PDB_USER = 'root';
PDB_PASSWORD = 'example';
PDB_HOST = 'postgres';
PDB_PORT = 5432;
PDB_URI =  `postgresql://${PDB_USER}:${PDB_PASSWORD}@${PDB_HOST}:${PDB_PORT}`;

const postgresClient = new Client({
    connectionString: PDB_URI
});
postgresClient.connect().then(()=> console.log("Connected to postgres DB")).catch((err) => console.log('faild to connect to postgres DB', err));

app.get('/', (req, res)=>{

    client.set('products','products...');
    res.send("Hello fadi");
});

app.get('/data', async (req, res)=>{

    const products = await client.get('products');
    res.send(`<h2>${products}</h2>`);
});

app.listen(PORT, function(){

    console.log("app is listen at port " + PORT);
});
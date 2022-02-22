// node 後端伺服器
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 後端api路由
app.use('/api', userApi);
// app.use('/api/user', userApi);

// 監聽埠
app.listen(5500);
console.log('success listen at port:5500');

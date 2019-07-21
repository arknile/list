// node 后端服务器
 
const userApi = require('./api/userApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
 
// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
 
// 后端api路由
app.use('/api/user', userApi);
 
// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');

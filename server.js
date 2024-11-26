// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 预定义的访问秘钥
const correctAccessKey = '123';

// 中间件
app.use(bodyParser.json());
app.use(express.static('public')); // 假设前端文件放在public目录

// 登录路由
app.post('/login', (req, res) => {
    const { accessKey } = req.body;
    if (accessKey === correctAccessKey) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

// 预定义的访问秘钥
const correctAccessKey = 'mySecretKey';

// 中间件
app.use(bodyParser.json());
app.use(express.static('public')); // 仅用于公共资源

// 设置会话
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// 登录路由
app.post('/login', (req, res) => {
    const { accessKey } = req.body;
    if (accessKey === correctAccessKey) {
        req.session.loggedIn = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 访问控制中间件
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.status(401).send('Unauthorized: Please log in first.');
    }
}

// 受保护的路由
app.get('/g11b.html', requireLogin, (req, res) => {
    res.sendFile(__dirname + '/protected/g11b.html'); // 假设文件在protected目录
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});

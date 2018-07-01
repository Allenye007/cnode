
// 程序的入口

const express = require('express');
const session = require('express-session')  //  session 包

const app =  express();
const art = require('express-art-template');
var bodyParser = require('body-parser');

// 配置静态资源   让服务器访问到
app.use('/public',express.static('./public'));
app.use('/node_modules', express.static('./node_modules'))
// 配置模板
app.engine('html', require('express-art-template'));  //   配置完之后 可以用render 了

// 第三方模块
const router = require('./routes/router')  //  导入路由   挂起路由


// 配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 配置session -----------------    在登录成功时设置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


var port = 3000;

app.listen(port, () => {
    console.log('服务器启动了')
})
  
// 挂载路由
app.use(router);




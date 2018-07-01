// 设置路由    步骤   引包  实例路由对象  导出路由   挂在路由

const express = require('express');

const router = express.Router();   // 设置路由对象

// 第三方模板
const indexCtrl = require('../controllers/index');
const userCtrl = require('../controllers/user');

// 配置路由
router.get('/', indexCtrl.showIndex);

// router.get('/signin', (req, res) => {
//     res.send('asdds');
//     // console.log(req.query);
//     console.log(req.params)
// })

router.get('/signin', userCtrl.renderSignin)
router.post('/signin', userCtrl.handelSignin)
router.get('/signup', userCtrl.renderSignup)
router.post('/signup', userCtrl.handelSignup)
// ----------------------------------------------------------------------
module.exports = router;   //  导出路由

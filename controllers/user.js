
// 导出函数  (操作函数)


const md5 = require('md5');

// 导入moudel 数据类型
var userMoudel = require('../models/user')  //  数据库模板

// 渲染登录页面
exports.renderSignin = (req, res) => {
    // res.send('renderSignin')
    res.render('../views/signin.html')
}
// 处理登录页面   需要判断 邮箱/密码   -------------------接口
exports.handelSignin = (req, res) => { 
    // res.send('handelSignin')
    // 检测邮箱-------------------------------------------------
    // getByEmail(email, callback)   参数(post的数据,  回掉函数)   就是调用函数  getByEmail() 并传参数
    userMoudel.getByEmail = (req.body.email, (error, user) => {
        if (error) {
            return res.send({
                msg: '服务器错误'
            })
        }
        // 判断Email是否存在
        if (!user) {
            return res.json({
                code: 401,
                msg: '请输入正确的用户名'
            })
        }
        // 判断nickname 是否存在
        // 把post的密码加密
        const password = md5(res.body.password);
        if (password === user.password) {    //   数据库密码与post来的数据一致
            // 密码一致
            res.json({
                code: 200,
                msg: '登录成功'
            });
        } else {
            res.json({
                code: 402,
                msg: '密码错误，请重新输入'
            });
        }

    })
}
// 渲染注册页面   就是显示注册页面  
exports.renderSignup = (req, res) => {
    // res.send('renderSignup')
    res.render('signup.html')
    // console.log(req.body);


}

// 处理注册页面  验证注册的一些事情 验证邮箱 用户名  是否存在    -------接口
exports.handelSignup = (req, res) => {
    // res.send('handelSignup');
    // console.log(body.req); 

    // 验证邮箱
    userMoudel.getByEmail = (req.body.email, (error, user) => {
        if (error) {
            return res.send({
                msg: '服务器错误'
            })
        }
        if (user) {
            // 邮箱已经存在
            return res.render('signup.html', {
                msg: '邮箱已经存在'
            });
        }

        // 验证nickname
        userMoudel.getByNickname = (req.body.nickname, (error, user) => {
            if (error) {
                return res.send({
                    msg: '服务器错误'
                })
            }
            if (user) {
                // 昵称已经存在
                return res.render('signup.html', {
                    msg: '昵称已经存在'
                });
            }
            // 注册用户   邮箱 昵称 都不存在时  => 插入数据操作
            req.body.password = md5(req.body.password);
            req.body.createdAt = new Date();
            userMoudel.creatUser = (req.body, (error, isOk) => {
                if (error) {
                    return res.send({
                        msg: '服务器错误'
                    })
                }
                if (isOk) {
                    res.json({
                        code: 200,
                        msg: '注册成功'
                    })
                    res.redirect('/signin');
                } else {
                    res.json({
                        code: 401,
                        msg: '注册失败'
                    })
                    res.render('signup.html', {
                        msg:'失败'
                    })
                }
            })
        })
    })
    // db.query(
    //     'select * from `users` where `email`=?',
    //     req.body.email,
    //     (error, result) => {
    //         console.log(result + '000')
    //         if (error) {
    //             return console.log(error);
    //         }
    //         if (result.length > 0) {
    //             // 说明邮箱存在
    //             res.render('../views/signup.html', {
    //                 msg: '邮箱已经存在'
    //             })
    //         }
    //         // 验证昵称
    //         db.query(
    //             'select * from `users` where `nickname`=?',
    //             req.body.nickname,
    //             (error, result) => {
    //                 // console.log(result + '111')
    //                 if (error) {
    //                     return console.log(error);
    //                 }
    //                 if (result.length > 0) {
    //                     // 说明昵称已经存在
    //                     res.render('../views/signup.html', {
    //                         msg: '昵称已存在'
    //                     })
    //                     return;
    //                 }
    //                 // 插入数据库
    //                 req.body.createdAt = new Date();
    //                 req.body.password = md5(req.body.password);   // md5加密
    //                 db.query(
    //                     'insert into `users` set ?',
    //                     req.body,
    //                     (error, result) => {
    //                         // console.log(result)
    //                         if (error) {
    //                             return res.send(error);
    //                         }
    //                         if (result.affectedRows = 1) {
    //                             res.redirect('/signin')
    //                         } else {
    //                             res.send('../views/signup.html', {
    //                                 msg: '注册失败'
    //                             });
    //                         }
    //                     }
    //                 )
    //             }
    //         )
    //     }
    // )

}


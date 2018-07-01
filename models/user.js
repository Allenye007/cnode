// 引入数据库模板
const db = require('./database');

// 添加一个用户
     // creatUser = (req.body, (error, isOk)   // 函数调用
exports.creatUser = (user, callback) => {
    db.query(
        // 添加用户
        'insert into `users` set ?',
        user,
        (error, result) => {
            if(error) {
                // 如果错误让回掉函数处理错误
                return callback(error);
            }
            // 回掉函数返回查询到数据
            callback(null,result);  //  null就是没有错误
        }
    )
}
// 根据Email查询数据    注册用户时 使用
exports.getByEmail = (email, callback) => {
    db.query(
        'select * from `users` where `email`=?',
        email,
        (error, result) => {
            if(error) {
                // 如果错误，让回调函数处理错误
                return callback(error)
            }

            // callback(null, result);   相当于  以下 代码
            if(result.length > 0) {
                // 说明有数据   把数据传回去  (只有一条数据)
                callback(null, result[0]);
            } else {
                // 没有结果
                callback(null, false);
            }
        }
    )
}
// 根据nickname查询数据   注册时  使用

exports.getByNickname = (email, callback) => {
    db.query(
        'select * from `users` where `nickname`=?',
        nickname,
        (error, result) => {
            if(error) {
                // 如果错误，让回调函数处理错误
                return callback(error)
            }

            // callback(null, result);   相当于  以下 代码
            if(result.length > 0) {
                // 说明有数据  把数据传回去
                callback(null, result[0]);
            } else {
                // 没有结果
                callback(null, false);
            }
        }
    )
}

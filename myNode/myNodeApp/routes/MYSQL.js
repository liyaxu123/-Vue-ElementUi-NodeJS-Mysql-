// 1, 引模块:npm install mysql
const mysql = require('mysql');
// 2, 创建连接
const pool = mysql.createPool({
    host: 'localhost',// 数据库地址
    user: 'root',// 数据库用户
    password: 'admin',// 数据库密码
    database: 'studentdormitory'// 要连接的数据库
});
// connection.connect();

// 数据库操作
let query = function( sql, values) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) { // 开启数据库
            if (err) {
                reject( err );
            } else {
                console.log('开启成功!');
                pool.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    // 结束会话
                    connection.release();
                });
            }
        });
    });
};



module.exports = query;










//引入mysql模块  
var mysql = require('mysql');  

//创建配置数据库  

var connection = mysql.createConnection({  
    host:'localhost',  
    user:'root',  
    password:'Liuyong,28',  
    database:'test',
    port:3306
}) 



/**
 * [DB description]
 * @type {Object}
 */

var itemApiHandles = {
    /**
     * [dbQuery 查询用户列表数据]
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    dbQuery:function(req, res, next){
        // 开始连接
        // connection.connect();
        //查询数据  
        var sql = 'SELECT * FROM sys_user';  
        connection.query(sql,function (err,data) {
            var result = {}
            if( err ){  
                console.log('error' + err);
                result = {
                    status:500,
                    msg:'查询异常',
                    data: err
                }
            }else{
                result = {
                    status:200,
                    msg:'操作成功',
                    data: data
                }
            }
            res.send(result)
        }) 

        // 结束连接
        // connection.end();
    },
    dbAdd:function(req,res,next){
        // 开始连接
        // connection.connect();
        var addsql = 'INSERT INTO sys_user(name,birthday) VALUES(?,?)';  
        var addsqlparams = [ req.query.name || 'name', req.query.birthday || '2018-12-11'];  
        connection.query(addsql,addsqlparams,function (err,data) {  
            var result = {}
            if( err ){  
                console.log('error' + err);
                result = {
                    status:500,
                    msg:'添加异常',
                    data: err
                }
            }else{
                result = {
                    status:200,
                    msg:'添加成功',
                    data: data
                }
            }
            res.send(result)
        }) 
        // 结束连接
        // connection.end();
    },
    dbEdit:function(req,res,next){
        var id = req.query && req.query.id ? req.query.id : 1;
        var modsql = 'UPDATE sys_user SET name = ? WHERE id = ?';  
        var modsqlparams = [ req.query.name || 'name', id];  
        connection.query(modsql,modsqlparams,function (err,data) {  
            var result = {}
            if( err ){  
                console.log('error' + err);
                result = {
                    status:500,
                    msg:'修改异常',
                    data: err
                }
            }else{
                result = {
                    status:200,
                    msg:'修改成功',
                    data: data
                }
            }
            res.send(result)
        }) 
    },
    dbDelete:function(req,res,next){
    
        var id = req.query && req.query.id ? req.query.id : 1;

        var delsql = 'DELETE FROM sys_user where id = ' + id;  
        connection.query(delsql,function (err,data) {  
            var result = {}
            if( err ){  
                console.log('error' + err);
                result = {
                    status:500,
                    msg:'删除异常',
                    data: err
                }
            }else{
                result = {
                    status:200,
                    msg:'删除成功',
                    data: data
                }
            }
            res.send(result) 
        })
    },
}


/* ===============API=============== */
function apiFactory(req, res, next) {
    var path = req.route.path;
    var match = /^\/api\/(\S*)/i.exec(path);
    if (match && match[1]) {
        var handleKey = match[1];
        var handler = itemApiHandles[handleKey];
        handler(req, res, next);
    }
}

exports = module.exports = {
    apiHandle: apiFactory
};
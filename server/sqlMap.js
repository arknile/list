// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(name, age) values (?, ?)', 
		deleteS: 'delete from user where name = ?'
    }
}
 
module.exports = sqlMap;
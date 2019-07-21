// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(name, age) values (?, ?)', 
        deleteS: 'delete from user where name = ?',
        search: 'select * from user',
        takimg: 'select * from testimg2 where id=7',
        addimg: 'insert into testimg2(img) values (?)'
    }
}
 
module.exports = sqlMap;
// sql語句
var sqlMap = {
    // 使用者
    user: {
        add: 'insert into user(name, age) values (?, ?)'
    }
}

module.exports = sqlMap;
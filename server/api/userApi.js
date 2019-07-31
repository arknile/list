var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')
 
// Connect database
var conn = mysql.createConnection(models.mysql)
 
conn.connect()
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: 'Error'
        })
    } else {
        res.json(ret)
    }
};

router.post('/getTool', (req, res) => {
    var sql = $sql.user.getTool
    var params = req.body
    console.log(sql)
    conn.query(sql, [params.id],function(err, result) {
        res.send(result)
    })
});

router.post('/getRatingBrief', (req, res) => {
    var sql = $sql.user.getRatingBrief
    var params = req.body
    conn.query(sql, [params.id],function(err, result) {
        res.send(result)
    })
});

router.post('/getRating', (req, res) => {
    var sql = $sql.user.getRating
    var params = req.body
    console.log(sql)
    conn.query(sql, [params.id],function(err, result) {
        res.send(result)
    })
});

router.post('/getAdvancedInfo', (req, res) => {
    var sql = $sql.user.getAdvancedInfo
    var params = req.body
    console.log(sql)
    conn.query(sql, [params.id], function(err, result) {
        res.send(result)
    })
});

router.get('/getAllTag', (req, res) => {
    var sql = $sql.user.getAllTag
    console.log(sql)
    conn.query(sql, function(err, result) {
        res.send(result)
    })
});

router.post('/postUser', (req,res) => {
    var sql= $sql.user.postUser
    var params = req.body
    console.log(params.password)
    let sha256 = require('js-sha256').sha256// 这里用的是require方法，所以没用import
    var password = sha256(String(params.password).substring(0, 32) + String(params.username).toLowerCase())// 要加密的密码
    console.log(password)// 这就是你加密之后的密码
    console.log(sql)
    conn.query(sql, [params.username, password], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            res.send(result)
        }
    })
});

router.post('/checkPassword', (req,res) => {
    var sql= $sql.user.checkPassword
    var params = req.body
    console.log(params.password)
    let sha256 = require('js-sha256').sha256// 这里用的是require方法，所以没用import
    var password = sha256(String(params.password).substring(0, 32) + String(params.username).toLowerCase())// 要加密的密码
    console.log(password)// 这就是你加密之后的密码
    console.log(sql)
    conn.query(sql, [params.username, password], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            res.send(result)
        }
    })
});

router.post('/getToolBrief', (req,res) => {
    var sql= $sql.user.getToolBrief
    var params = req.body
    for (var i in params.data) {
        console.log(JSON.stringify(params.data[i]) + ',')
        if (JSON.stringify(params.data[i]) !== '[]') {
            console.log('executed')
            sql = sql + ' AND id IN (SELECT tool_id FROM tnt WHERE tag_id IN ('
            for (var j in params.data[i]) {
                sql = sql + params.data[i][j] + ', '
            }
            sql = sql.substring(0, sql.length - 2)
            sql = sql + '))'
        } 
    }
    if (params.searchField !== null) {
        sql = sql + params.searchField
    }
    console.log(sql)
    conn.query(sql, function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            res.send(result)
        }
    })
});

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add
    var params = req.body
    console.log(params)
    conn.query(sql, [params.username, params.age], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            result = {
                code: 200,
                msg:'增加成功'
            }    
            jsonWrite(res, result)
        }
    })
});

router.post('/addimg', (req, res) => {
    var sql = $sql.user.addimg
    var params = req.body
    console.log(params)
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            result = {
                code: 200,
                msg:'增加成功'
            }    
            jsonWrite(res, result)
        }
    })
});

router.post('/addTool', (req, res) => {
    var sql = $sql.user.addTool
    var params = req.body
    console.log(params)
    conn.query(sql, [params.name, params.author, params.link, params.image], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            res.send(result[1])
        }
    })
});

router.post('/checkDuplicate', (req, res) => {
    var sql = $sql.user.checkDuplicate
    var params = req.body
    console.log(params)
    conn.query(sql, [params.name], function(err, result) {
        if (err) {
            console.log(err)
            jsonWrite(res,result)
        }
        if (result) {
            res.send(result)
        }
    })
});

router.post('/addToolTags', (req, res) => {
    var sql = $sql.user.addToolTag
    var params = req.body
    var count = 0
    console.log(params)
    for (var i in params.submission) {
        conn.query(sql, [params.id, params.submission[i]], function(err, result) {
            if (err) {
                count = count + 1
                break
            }
        })
    }
    res.json(count)
});

router.post('/getimg', (req, res) => {
    var sql = $sql.user.takimg
    var params = req.body
    console.log(params)
    conn.query(sql, function(err, result) {
        res.send(result)
    })
});

router.post('/deleteUser', (req, res) => {
    var sql = $sql.user.deleteS
    var params = req.body
    console.log(sql)
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
});

router.post('/searchUser', (req, res) => {
    var sql = $sql.user.search
    var params = req.body
    console.log(sql)
    conn.query(sql, [params.username], function(err, result) {
        res.send(result)
    })
});

module.exports = router
var express = require('express');
var router = express.Router();
const user  = require('../dao/users_dao')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user进入路由根目录')
})

router.post('/login', function (req, res){
  user.Login(req, res)
})

router.get('/getUserDataByToken', function (req, res) {
  user.getUserDataByToken(req, res)
})

router.get('/getUsersByTypePage', function (req, res ,next) {
  user.getUsersByTypePage(req, res)
})

router.get('/delUserdata', function (req, res) {
  if (req.query.u_id == 0)
    res.send("您不能删除管理员")
  else
    user.delUserdata(req, res)
})

router.post('/upUserdate', function (req, res) {
  user.upUserdate(req, res)
})

router.post('/setXlsxData', function (req, res) {
  user.setXlsxData(req, res)
})

module.exports = router;

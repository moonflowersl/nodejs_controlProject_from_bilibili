var express = require("express");
var router = express.Router();
const admin = require('../dao/admin_dao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('admin进入路由根目录');
})

router.get('/getUsersByTypeAndChar', function (req, res){
    admin.getUsersByTypeAndChar(req, res)
})
/**
 * 发布公告
 */
router.post('/announce', function (req, res, next) {
    admin.announce(req, res)
})
/**
 * 分页获取所有通知与数量
 */
router.get("/getAllNotice", function (req, res, next) {
    admin.getAllNotice(req, res)
})
/**
 * 获取该老师所属班级的全部请假单与数量（分页查询）
 */
router.get('/getLeave', function (req, res, next) {
    admin.getLeave(req, res)
})


module.exports = router;
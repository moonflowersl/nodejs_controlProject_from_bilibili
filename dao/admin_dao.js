const jwtUtil = require('../utils/jwtUtils')
module.exports = class admin_dao extends require('../model/admin_mod') {

    /**
     * 根据用户类型与查询字段模糊查询
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getUsersByTypeAndChar(req, resp) {
        let query = req.query
        let type = query.type
        let inputText = query.inputText
        let CharType = query.CharType
        let currPage = query.currPage
        let pageNum = query.pageNum
        let data = await this.getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum)
        let total = await this.getUsersByTypeAndCharTotal(type, inputText, CharType)
        resp.send({data, total:total[0].count})
    }

    /**
     * 发布公告
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async announce(req, resp) {
        let title = req.body.title
        let classes = req.body.classes
        let results = await this.announceMod(title, classes)
        resp.send(results)
    }

    /**
     * 分页获取所有通知和数量
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getAllNotice(req, resp) {
        let pageNum = req.query.pageNum
        let currPage = req.query.currPage
        let data = await this.getAllNoticeMod(pageNum, currPage)
        let total = await  this.getAllNoticeAll()
    }

    /**
     * 取该老师所属班级的全部请假单与数量(分页查询)
     * @param req
     * @param resp
     * @returns {Promise<void>}
     */
    static async getLeave(req, resp) {
        let verity = await jwtUtil.verifysync(req.query.token, globalKey)
        let classArr = verity.classes.split(";")
        let data = await this.getLeaveMod(classArr, req.query.currPage, req.query.pageNum)
        let total = await this.getLeaveTotal(classArr)
        resp.send({data, total: total[0].count})
    }
}
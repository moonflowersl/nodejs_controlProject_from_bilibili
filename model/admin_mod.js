
module.exports = class admin_mod extends require('./model') {

    /**
     * 分页获取搜索结果
     * @param type
     * @param inputText
     * @param CharType
     * @param currPage
     * @param pageNum
     * @returns {Promise<unknown>}
     */
    static getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum) {
        pageNum = Number(pageNum);
        currPage = Number(currPage);
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = 'select * from `user` where  ' + CharType + '  like "%' + inputText + '%" and type = ' + type + ' order by modifytime desc LIMIT ?,?'
            console.log(sql)
            this.query(sql, this.formParams(currPage, pageNum)).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    static async getUsersByTypeAndCharTotal(type, inputText, CharType) {
        return new Promise(((resolve, reject) => {
            let sql = 'select count(1) as count from user where  ' + CharType + '  like "%' + inputText + '%" and type = ' + type
            console.log(sql)
            this.query(sql).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        }))
    }

    /**
     * 发布公告
     * @param title
     * @param classes
     */
    static announceMod(title, classes) {
        return new Promise((resolve, reject) => {
            let sql = "insert into `notice` (title, class) values (?,?)"
            this.query(sql, this.formParams(title, classes)).then((result) => {
              resolve("发布成功")
            }).catch(err => {
                console.log(`发布公告出错：${err.message}`)
                reject("由于网络原因，您的公告并没有发出")
            })
        })
    }


    /**
     * 分页获取所有通知和数量
     * @param pageNum
     * @param currPage
     */
    static getAllNoticeMod(pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage)
        return new Promise(((resolve, reject) => {
            let sql = "select * from notice order by createtime desc LIMIT ?,?"
            this.query(sql, this.formParams(currPage, pageNum)).then((result) => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        }))
    }

    static getAllNoticeAll() {
        return new Promise(((resolve, reject) => {
            let sql = "select count(1) as count from notice"
            this.query(sql).then((result) => {
                resolve(result)
            }).catch(err => {
                reject("由于网络原因，获取数量失败")
            })
        }))
    }

    static get



}
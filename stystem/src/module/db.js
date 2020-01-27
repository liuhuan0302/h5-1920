const MongoClient = require("mongodb").MongoClient;

class Db {
    //单例模式(判断是否实例化了Db,如果没有实例化,将其实例化,并赋值给一个变量,下一次不用在实例化,直接调用这个变量就行)
    //static 为静态函数
    static getMongoDb() {
        //判断是否实例化了Db 类
        if (!Db.install) {
            Db.install = new Db();
        }
        return Db.install;
    }
    constructor() {
        this.db = "";
        this.connect();
    }
    //连接数据库
    connect() {
        let that = this;
        //关联本地的mongodb
        return new Promise((reslove, reject) => {
            //console.log(this);//Db { db: '' }
            //单例模式 判断是否关联(不用多次关联数据库)
            if (!that.db) {
                MongoClient.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, (err, client) => {
                    if (err) {
                        reject(err);
                        throw new TypeError(err);
                    }
                    //创建或者使用数据库
                    that.db = client.db("kuaieba");
                    //数据库关联成功,则返回db
                    reslove(that.db);
                    //console.log(that.db);//数据库的相关信息
                })
            } else {
                //如果关联了数据库,就直接返回数据库
                reslove(that.db);
            }
        })
    }
    //多条查询
    find(cName, obj) {
        const that = this;
        return new Promise((reslove, reject) => {
            //拿到连接数据里面的 数据库(db)
            that.connect().then(db => {
                //创建或使用 集合 cName,并在这个集合里面查找 obj 
                //如果没有这个集合会先创建,在查找数据
                //查找到的是一个数据组
                const result = db.collection(cName).find(obj);
                //console.log(result);//返回查询的结果包含很多信息
                //将查找的结果转成数组
                result.toArray((err, doc) => {
                    if (err) {
                        reject(err);
                        throw new TypeError("find : " + err)
                    }
                    reslove(doc);
                    //console.log(doc);//[ { _id: 5dbae78aa8b09e25d43653ba, username: '111', password: '111' } ]
                })
            })
        })
    }
    //增加
    insert(cName, obj) {
        const that = this;
        return new Promise((reslove, reject) => {
            that.connect().then(db => {
                const result = db.collection(cName).insertOne(obj, (err, result) => {
                    if (err) {
                        reject(err);
                        throw new TypeError(err);
                    }
                    reslove(result)
                })
            })
        })
    }
    //修改
    update() {
        const that = this;
        return new Promise((reslove, reject) => {
            const result = db.collection(cName).updateOne(obj, (err, result) => {
                if (err) {
                    reject(err);
                    throw new TypeError(err);
                }
                reslove(result);
            })
        })
    }
    //删除
    remove() {
        const that = this;
        return new Promise((reslove, reject) => {
            that.connect().then(db => {
                const result = db.collection(cName).deleteOne(obj, (err, result) => {
                    if (err) {
                        reject(err);
                        throw new TypeError(err);
                    }
                    reslove(result);
                })
            })
        })
    }
}

//暴露模块
module.exports = Db.getMongoDb();

/*
static 属性 | 方法
    可以转化为类的私有变量
        静态属性和方法 直接通过类名调用
        如果没有static 的属性和方法  需要 实例化之后在调用


*/
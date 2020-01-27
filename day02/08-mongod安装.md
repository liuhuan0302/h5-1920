1.下载软件
2.配置环境变量 path: C:\Program Files\MongoDB\Server\3.2\bin
3.在同一磁盘下安装  data db
4.终端输入 : mongod --dbpath c:\data\db
5.连接数据库  mongod  注:必须开启数据库 保持在4状态

mongdb  非关联型数据库  mySql 关联型数据库 
mongdb  数据库在本地           
命令语句:
    查看当前数据库 : show dbs
    切换数据库  :  use test (如果没有,在切换是进行创建,但必须保证有数据,才能查看) 
    增加数据 : db.people.save({name:"xiaohu",age:18})
    查找数据: db.people.find() 查找全部
             db.people.find({name:"xiaohu"},{name:1,age:1,_id:0})
             查找具体某一条数据  1 表示保留数据 0 是过滤数据
    修改数据:db.people.update({name:"xiaohu"},{$set:{name:"xiaoping"})
    删除数据:db.people.deleteMany({age:18})
            deleteMany删除多条数据
    查看数据库中有多少集合:db.getCollectionNames()
    创建集合:db.a 
    插入数据:db.a.save({name:"xiaohu",age:18})
    删除表(集合):db.a.drop()



nodejs 中使用mongdb  
    + 需要先 npm init -y
    + npm i mongdb -D
    


+ 地址：http://localhost/h5-1920/day25/student/php/register.php
+ method ： post
+ 数据的传输
    - usern=名称&userp=密码
+ 返回的数据
{
    success
}






    {
        success : [
            {"status" : 1, "info" : "注册成功"},
            {"status" : 0, "info" : "注册失败"}
        ]
        data : {
            name : "xiaohu",
            age : 20
        }
        error : {
            errorCode : 错误码 "27018",
            message : "用户名错误"
        }
    }



+ 地址：http://localhost/h5-1920/day25/student/php/register.php
+ method ： post
+ 数据的传输
    - usern=名称&userp=密码
+ 返回的数据
    - {'state':0,'info':'用户名被占用'}
    - {'state':1,'info':'注册成功'}
    - {'state':2,'info':'注册失败'}
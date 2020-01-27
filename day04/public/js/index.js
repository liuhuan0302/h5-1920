let 
    $loginBtn = $(".login-btn"),
    flag = false;

function getUsers(){
    //获取输入的信息(传到后端的信息)
    let $username = $(".username").val();
    let $password = $(".password").val();
    console.log($username);
    console.log($password);
    //调用
    console.log(1);
    $.ajax({
        //做判断
        url:!flag ? "/login" : "/register",
        data : {
            username : $username,
            password : $password
        },
        method : "post",
        //对返回结果的处理
        success :(res)=>{
            console.log(typeof res);//返回的是一个对象
            console.log(res.success);//{"success":0,"error":{"errCode":27081,"message":"用户名不存在"}}
            if(res.success){
                //跳转到同一个域名下面
                location.href = "/auto"
            }else{
                alert(res.error.message)
            }
        }
    })
    
}

$loginBtn.on("click",getUsers);

$(".register-tips").click(function(){
    //
    if(!flag){
        $loginBtn.text("注册");
        $(this).text("登录一下");
    }else{
        $loginBtn.text("登录");
        $(this).text("注册一下");
    }
    flag = !flag;
})
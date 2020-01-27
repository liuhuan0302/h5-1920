onload = function(){
    setRem(750);
}

//浏览器发生变化,重新调整
onresize = function(){
    setRem(750);
}

function setRem(Px){
    //获取html标签
    const html = document.getElementsByTagName("html")[0];
    //获取屏幕宽度
    const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
    //设置默认的字体大小(px为ui给的图片大小)
    html.style.fontSize = clientWidth /Px * 200 + "px";
}
//引入gulp
let gulp = require('gulp');

//引入文本webserver插件
let webserver = require('gulp-webserver');
gulp.task('webserver',function(){
    gulp.src('./')
        .pipe(webserver({
            port:8080,//端口
            host:'0.0.0.0',//域名
            //实时刷新代码,不用f5 实现
            directoryListing:{
                path:'./',
                enable :true
            }
        }))
})
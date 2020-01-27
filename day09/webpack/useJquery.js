//模块开发 引入jquery
const $ = require("jquery");
function use(){
    $("#app").html("模块化开发");
}

//暴露模块
module.exports = use;
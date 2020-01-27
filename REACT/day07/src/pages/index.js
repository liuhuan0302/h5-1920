// import List from "./article/List";
// import Edit from "./article/Edit";
// import Login from "./login/index";
// import NotFound from "./NotFound/NotFound"
// import DashBorad from "./dashBorad/index"
// import Setting from "./setting/index"


// export {
//     List,
//     Edit,
//     Login,
//     NotFound,
//     DashBorad,
//     Setting,
// }


import Loadable from "react-loadable";
import Loading from "../component/loading/index"

const List = Loadable({
    loader:()=>import("./article/List"),
    loading:Loading
})
const Edit = Loadable({
    loader:()=>import("./article/Edit"),
    loading:Loading
})
const Login = Loadable({
    loader:()=>import("./login/index"),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=>import("./NotFound/NotFound"),
    loading:Loading
})
const DashBorad = Loadable({
    loader:()=>import("./dashBorad/index"),
    loading:Loading
})
const Setting = Loadable({
    loader:()=>import("./setting/index"),
    loading:Loading
})

export {
    List,
    Edit,
    Login,
    NotFound,
    DashBorad,
    Setting,
}
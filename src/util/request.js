import axios from 'axios'
import qs from 'qs'

//拦截器
axios.interceptors.response.use(res=>{
    console.log('--------请求路径'+res.config.url)
    console.log(res)
    return res
})

//菜单添加
const baurl = '/api'
export const reqMenuAdd=(data)=>{
    return axios({
        url:baurl+'/api/menuadd',
        method:'post',
        data:data
    })
}

//菜单请求

export const reqMenuList=(data)=>{
    return axios({
        url:baurl+'/api/menulist',
        method:'get',
        params:data
    })
}

//获取一条数据

export const reqMenuListOne=(data)=>{
    return axios({
        url:baurl+'/api/menuinfo',
        method:'get',
        params:data
    })
}

//删除菜单数据
export const reqMenuDel=(data)=>{
    return axios({
        url:baurl+'/api/menudelete',
        method:'post',
        data:data
    })
}


//修改菜单数据 菜单编辑
export const reqMenuDit=(data)=>{
    return axios({
        url:baurl+'/api/menuedit',
        method:'post',
        data:data
    })
}

//////////////////////角色添加//////////////////////

//角色添加
export const reqRoleAdd=(data)=>{
    return axios({
        url:baurl+'/api/roleadd',
        method:'post',
        data:data
    })
}


//角色列表
export const reqRoleList=()=>{
    return axios({
        url:baurl+'/api/rolelist',
        method:'get',
    })
}

//获取角色一条数据
export const reqMenuRoleOne=(data)=>{
    return axios({
        url:baurl+'/api/roleinfo',
        method:'get',
        params:data
    })
}

//修改角色数据 角色编辑
export const reqRoleDit=(data)=>{
    return axios({
        url:baurl+'/api/roleedit',
        method:'post',
        data:data
    })
}

//删除菜单数据
export const reqRoleDel=(data)=>{
    return axios({
        url:baurl+'/api/roledelete',
        method:'post',
        data:data
    })
}
//////////////////////管理员添加//////////////////////

//管理员添加
export const reqmangAdd=(data)=>{
    return axios({
        url:baurl+'/api/useradd',
        method:'post',
        data:data
    })
}


//管理员列表
export const reqmangList=(data)=>{
    return axios({
        url:baurl+'/api/userlist',
        method:'get',
        params:data
    })
}

//获取管理员一条数据
export const reqMenumangOne=(data)=>{
    return axios({
        url:baurl+'/api/userinfo',
        method:'get',
        params:data
    })
}

//修改管理员数据 管理员编辑
export const reqmangDit=(data)=>{
    return axios({
        url:baurl+'/api/useredit',
        method:'post',
        data:data
    })
}

// 管理员删除
export const reqmangDel=(id)=>{
    return axios({
        url:baurl+'/api/userdelete',
        method:'post',
        data:id
    })
}

// 获取管理员总数
export const reqmangOunt=()=>{
    return axios({
        url:baurl+'/api/usercount',
        method:'get',
    })
}
//////////////////////商品分类管理//////////////////////

//商品分类添加
export const reqclassAdd=(data)=>{
    //上传的是文件要用qs
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/cateadd',
        method:'post',
        data:form
    })
}


//商品分类列表
export const reqclassList=(params)=>{
    return axios({
        url:baurl+'/api/catelist',
        method:'get',
        params:params
    })
}

//获取商品分类一条数据
export const reqMenuclassOne=(data)=>{
    return axios({
        url:baurl+'/api/cateinfo',
        method:'get',
        params:data
    })
}

//修改商品分类数据 商品分类编辑
export const reqclassDit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/cateedit',
        method:'post',
        data:form
    })
}

// 商品分类删除
export const reqclassDel=(id)=>{
    return axios({
        url:baurl+'/api/catedelete',
        method:'post',
        data:id
    })
}
//////////////////////商品规格管理//////////////////////

//商品规格添加
export const reqspecAdd=(data)=>{
    //上传的是文件要用qs
    
    return axios({
        url:baurl+'/api/specsadd',
        method:'post',
        data:data
    })
}


//商品规格列表
export const reqspecList=(params)=>{
    return axios({
        url:baurl+'/api/specslist',
        method:'get',
        params:params
    })
}

//获取商品规格一条数据
export const reqMenuspecOne=(data)=>{
    return axios({
        url:baurl+'/api/specsinfo',
        method:'get',
        params:data
    })
}

//修改商品规格数据 商品规格编辑
export const reqspecDit=(data)=>{
    
    return axios({
        url:baurl+'/api/specsedit',
        method:'post',
        data:data
    })
}


// 商品规格删除
export const reqspecDel=(id)=>{
    return axios({
        url:baurl+'/api/specsdelete',
        method:'post',
        data:id
    })
}


// 获取管理员总数
export const reqspecOunt=()=>{
    return axios({
        url:baurl+'/api/specscount',
        method:'get',
    })
}


// 获取商品信息//////////////////
export const reqspxx=()=>{
    return axios({
        url:baurl+'/api/getindexgoods',
        method:'get',
    })
}

///////////////商品管理//////
//商品管理添加
export const reqgoodsAdd=(data)=>{
    //上传的是文件要用qs
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/goodsadd',
        method:'post',
        data:form
    })
}

//商品规格列表
export const reqgoodsList=(params)=>{
    return axios({
        url:baurl+'/api/goodslist',
        method:'get',
        params:params
    })
}

//获取商品规格一条数据
export const reqMenugoodsOne=(data)=>{
    return axios({
        url:baurl+'/api/goodsinfo',
        method:'get',
        params:data
    })
}


//修改商品规格数据 商品规格编辑
export const reqgoodsDit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/goodsedit',
        method:'post',
        data:form
    })
}

// 商品规格删除
export const reqgoodsDel=(id)=>{
    return axios({
        url:baurl+'/api/goodsdelete',
        method:'post',
        data:id
    })
}


// 获取管理员总数
export const reqgoodsOunt=()=>{
    return axios({
        url:baurl+'/api/goodscount',
        method:'get',
    })
}

// 管理员登录
export const requserLogin=(data)=>{
    return axios({
        url:baurl+'/api/userlogin',
        method:'post',
        data:data
    })
}

////////////////////会员数据
//获取会员列表
export const reqvipList=()=>{
    return axios({
        url:baurl+'/api/memberlist',
        method:'get',
    })
}

//获取vip一条数据
export const reqMenuvipOne=(id)=>{
    return axios({
        url:baurl+'/api/memberinfo',
        method:'get',
        params:id
    })
}

//修改vip数据 vip编辑
export const reqvipDit=(data)=>{
    
    return axios({
        url:baurl+'/api/memberedit',
        method:'post',
        data:data
    })
}



//////////////轮播图管理

//轮播图添加
export const reqlbtAdd=(data)=>{
    //上传的是文件要用qs
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/banneradd',
        method:'post',
        data:form
    })
}

//轮播图列表
export const reqlbtList=(params)=>{
    return axios({
        url:baurl+'/api/bannerlist',
        method:'get',
        params:params
    })
}

//获取轮播图一条数据
export const reqMenulbtOne=(data)=>{
    return axios({
        url:baurl+'/api/bannerinfo',
        method:'get',
        params:data
    })
}


//修改轮播图数据 轮播图编辑
export const reqlbtDit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baurl+'/api/banneredit',
        method:'post',
        data:form
    })
}

// 轮播图删除
export const reqlbtDel=(id)=>{
    return axios({
        url:baurl+'/api/bannerdelete',
        method:'post',
        data:id
    })
}
//////////////限时秒杀管理

//限时秒杀添加
export const reqsecAdd=(data)=>{
    //上传的是文件要用qs
    
    return axios({
        url:baurl+'/api/seckadd',
        method:'post',
        data:data
    })
}

//限时秒杀列表
export const reqsecList=(params)=>{
    return axios({
        url:baurl+'/api/secklist',
        method:'get',
        params:params
    })
}

//获取限时秒杀一条数据
export const reqMenusecOne=(data)=>{
    return axios({
        url:baurl+'/api/seckinfo',
        method:'get',
        params:data
    })
}


//修改限时秒杀数据 限时秒杀编辑
export const reqsecDit=(data)=>{
    
    return axios({
        url:baurl+'/api/seckedit',
        method:'post',
        data:data
    })
}

// 限时秒杀删除
export const reqsecDel=(id)=>{
    return axios({
        url:baurl+'/api/seckdelete',
        method:'post',
        data:id
    })
}

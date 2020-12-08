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


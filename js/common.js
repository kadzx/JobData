axios.defaults.baseURL='https://hmajax.itheima.net';

function showToast(msg){
    const toastDom=document.querySelector('.my-toast');
    const toast=new bootstrap.Toast(toastDom);
    document.querySelector('.toast-body').innerHTML=msg
    toast.show();
}
//点击显示密码
function showPassword(){
    const showPassword=document.querySelector('.bi-eye-fill');
    showPassword&& showPassword.addEventListener('click',()=>{
    const psdInput=document.querySelector('#input-password');
    psdInput.type= psdInput.type==='password'?'text':'password';
})

}
//根据token检验是否登录
function checkToken(){
    const loginObj=JSON.parse(localStorage.getItem('loginObj'))
    console.log(loginObj)
    if(!loginObj||!loginObj.token){
        showToast('请先登录在访问');
       setTimeout(()=>{
         location.href='./login.html'
       },2500)
    }
    return loginObj
}

function renderUsername(loginObj){
    document.querySelector('.username').innerHTML=loginObj.username;
}
//退出登录功能
function registerLogout(){
    document.querySelector('#logout').addEventListener('click',()=>{
    localStorage.removeItem('loginObj')
    showToast('退出登录成功');
    setTimeout(()=>{
        location.href='./login.html'
    },1500)
})
}

//请求拦截器统一更改请求头
axios.interceptors.request.use(config => {
// Do something before request is sent
const loginObj=JSON.parse(localStorage.getItem('loginObj'));
// console.log(token)
loginObj&& (config.headers['Authorization']=loginObj.token); //如果登录信息存在就把请求头带上
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

// 响应拦截器，统一处理浏览器响应
axios.interceptors.response.use(response => {
// Do something before response is sent
console.log(response)
return response.data;
},error => {
    console.dir(error)
    if(error.response.status===401){
    showToast('请重新登录')
    localStorage.removeItem('loginObj')
    setTimeout(()=>{
        location.href='./login.html'
    },1500)
}
// Do something with response error
return Promise.reject(error);
});
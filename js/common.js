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

function registerLogout(){
    document.querySelector('#logout').addEventListener('click',()=>{
    localStorage.removeItem('loginObj')
    showToast('退出登录成功');
    setTimeout(()=>{
        location.href='./login.html'
    },1500)
})
}
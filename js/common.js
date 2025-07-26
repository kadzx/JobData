axios.defaults.baseURL='https://hmajax.itheima.net';

function showToast(msg){
    const toastDom=document.querySelector('.my-toast');
    const toast=new bootstrap.Toast(toastDom);
    document.querySelector('.toast-body').innerHTML=msg
    toast.show();
}
//点击显示密码
const showPassword=document.querySelector('.bi-eye-fill');
showPassword&& showPassword.addEventListener('click',()=>{
    const psdInput=document.querySelector('#input-password');
    psdInput.type= psdInput.type==='password'?'text':'password';
})
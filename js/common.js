axios.defaults.baseURL='https://hmajax.itheima.net';

function showToast(msg){
    const toastDom=document.querySelector('.my-toast');
    const toast=new bootstrap.Toast(toastDom);
    document.querySelector('.toast-body').innerHTML=msg
    toast.show();
}

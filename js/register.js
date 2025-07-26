document.querySelector('.bi-eye-fill').addEventListener('click',()=>{
    const psdInput=document.querySelector('#input-password');
    psdInput.type= psdInput.type==='password'?'text':'password';
})

document.querySelector('#btn-register').addEventListener('click',async ()=>{
    const form=document.querySelector('.register-form');
    const data=serialize(form,{hash:true,empty:true})
    const{username,password}=data;
    if(username===''||password===''){
        showToast('用户名和密码不能为空')
        return
    }
    if(username.length<8||username.length>30){
        showToast('用户名只能在8-30个字符')
        return
    }
    if(password.length<6||password.length>30){
        showToast('密码请输入在6-30个字符')
        return
    }
    try{ 
        const res=await axios.post('/register',data)
        showToast(res.data.message)
    }catch(err){
        showToast(err.response.data.message)
    }

 
})
showPassword()

document.querySelector('#btn-login').addEventListener('click',async ()=>{
    const form=document.querySelector('.login-form');
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
        const res=await axios.post('/login',data)
        console.log(res)

        //保存登录信息到本地
        const obj={
            username: res.data.username,
            token: res.data.token
        }
        console.log(obj)
        localStorage.setItem('loginObj',JSON.stringify(obj))

        showToast(res.message)
        setTimeout(()=>{
            location.href='./index.html'
        },1500)
    }catch(err){
        // showToast(err.response.data.message)
        console.dir(err)
    }
})
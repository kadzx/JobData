const loginObj = checkToken();
renderUsername(loginObj);
//判断是否登录并且同步用户信息
registerLogout();

const token = loginObj.token;
//获取学生统计数据
async function getData() {
    try {
        const res = await axios({
            url: '/dashboard',
            headers: {
                Authorization: token
            }
        })
        console.log(res)
        const overview = res.data.data.overview;
        Object.keys(overview).forEach(key => {
            document.querySelector(`.${key}`).innerHTML = overview[key]
        })
    } catch (error) {
        console.dir(error);
        if(error.response.status===401){
            showToast('请重新登录')
            localStorage.removeItem('loginObj')
            setTimeout(()=>{
                location.href='./login.html'
            },1500)
        }
    }


}
getData()
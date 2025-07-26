const loginObj = checkToken();
renderUsername(loginObj);
//判断是否登录并且同步用户信息
registerLogout();

const token = loginObj.token;
//获取学生统计数据
async function getData() {
    
    const res = await axios({
        url: '/dashboard'
    })
    // console.log(res)
    const overview = res.data.data.overview;
    Object.keys(overview).forEach(key => {
        document.querySelector(`.${key}`).innerHTML = overview[key]
    })


    //没有拦截器时候的写法，try catch写请求头和处理token失效

    
    // try{
    //     const res = await axios({
    //         url: '/dashboard'
    //     })
    //     // console.log(res)
    //     const overview = res.data.data.overview;
    //     Object.keys(overview).forEach(key => {
    //         document.querySelector(`.${key}`).innerHTML = overview[key]
    //     })
    // } catch (error) {
    //     // console.dir(error);
 
    // }
}

getData()
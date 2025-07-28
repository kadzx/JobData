const loginObj = checkToken();
renderUsername(loginObj);
//判断是否登录并且同步用户信息
registerLogout();

const token = loginObj.token;

function renderOverview(res){
    const overview = res.data.overview;
    Object.keys(overview).forEach(key => {
    document.querySelector(`.${key}`).innerHTML = overview[key]
})
}
function renderSalaryTrend(res){
   const year=res.data.year;
   /** @type EChartsOption */
   const myChart = echarts.init(document.querySelector('#line'));
   const option={
    xAxis: {
        type: 'category',
        data: year.map(v=>{return v.month}),
    },
    yAxis: {
        type: 'value',
    },
    toolTipL:{

    }
    ,
    series: [
        {
            data: year.map(v=>{return v.salary}),
            type: 'line',
        },
    ],
   }
   myChart.setOption(option)

}

//获取学生统计数据
async function getData() {
    
    const res = await axios({
        url: '/dashboard'
    })
    console.log(res)
    //渲染 overview
    renderOverview(res);
    renderSalaryTrend(res);


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
getData();
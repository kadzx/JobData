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
    title:{
        text:'薪资走势',
        textStyle:{
            fontSize:16,
            lineHeight:28
        },
        left:'12'
    }
    ,
    xAxis: {
        type: 'category',
        data: year.map(v=>{return v.month}),
    },
    yAxis: {
        type: 'value',
        splitLine:{
            lineStyle:{
                type:'dashed'
            }
        }
    },
    tooltip:{
        trigger:'axis',
        
    }
    ,
    series: [
        {
            data: year.map(v=>{return v.salary}),
            type: 'line',
            name:'工资走向',
            symbolSize :10,
            lineStyle:{
                width:5
            },

            itemStyle:{
                color:'#499FEE'
            },
            areaStyle:{
                color:{
                    type: 'linear',
                    y: 0,
                    x:0,
                    x2:0,
                    y2: 1,
                    colorStops: [{
                        offset:0, color: '#499FEE' // 0% 处的颜色
                    }, {
                        offset: 0.8, color: 'rgba(255,255,255,0.2)' // 100% 处的颜色
                    },{offset: 1,color: 'rgba(255,255,255,0)',}],
                    global: false // 缺省为 false
                }
            },
            smooth:'true',
        },
    ],
    color:'skyblue',
    legend:{
        top:'5%',
        right:'10%',
        data: [{
            name: '工资走向',
            // 强制设置图形为圆。
            icon: 'rect',
            // 设置文本为红色
            textStyle: {
                color: '#499FEE'
            }
}]
    }
   }
   myChart.setOption(option)

}
function renderSalaryDistribution(res){
    const myChart=echarts.init(document.querySelector('#salary')) 
    const data=res.data.salaryData;
    /** @type EChartsOption */
    const option={
        title: {
            text: '班级薪资分布',
            left: '10',
            top:'15',
            textStyle:{
                fontSize:16
            }
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: '20',
        },
        series: [
            {
                name: '薪资范围',
                type: 'pie',
                radius: ['50%', '64%'],
                center:['50%','45%'],
                data: data.map(v=>{
                    return {
                        name:v.label,
                        value:v.b_count+v.g_count

                    }
                }),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                label:false,
                itemStyle:{
                    borderRadius :'10',
                    borderColor:'#fff',
                    borderWidth:'2'
                }
            },
        ],
        color:['#FDA224', '#5097FF', '#3ABCFA', '#34D39A']
    }
    myChart.setOption(option);
}
function renderExpectation(res){
    const data=res.data.groupData;
    const btns=document.querySelector('#btns');
    const myChart=echarts.init(document.querySelector('#lines'));
    btns.addEventListener('click',function(e){
        if(!e.target.type==='button'){return}
        document.querySelector('.btn-blue').classList.toggle('btn-blue');
        e.target.classList.toggle('btn-blue')
        const page=e.target.innerHTML;
        //点击事件获取第几页
        /** @type EChartsOption */
       option = {
                title: {
                    text: '每组期望薪资',
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                    type: 'category',
                    // prettier-ignore
                    data: data[page].map(v=>{
                        return v.name
                    })
                    }
                ],
                yAxis: [
                    {
                    type: 'value'
                    }
                ],
                series: [
                    {
                    name: '期望薪资',
                    type: 'bar',
                    data: data[page].map(v=>{
                        return v.hope_salary;
                    }),
                    },
                    {
                    name: '就业薪资',
                    type: 'bar',
                    data:data[page].map(v=>{
                        return v.salary;
                    }),
                    markPoint: {
                        data:[
                            {type:'max',name:'最高工资'},
                           {type:'min',name:'最低工资'},

                        ]
                    },
  
                    }
                ]
                };
        
        myChart.setOption(option)
    })
    document.querySelector('[type=button]').click()

}
function renderGenderPie(res){
    const data=res.data.salaryData;
    const myChart=echarts.init(document.querySelector('#gender'));
    
    option = {
        title: [{
            text: '男女薪资分布',
            left: 10,
            top: 10,
            textStyle: {
              fontSize: 16,
        }
        },{
             text: '男生',
            left: '50%',
            top: '45%',
            textAlign: 'center',
            textStyle: {
                fontSize: 12,
            }
        },{
              text: '女生',
            left: '50%',
            top: '85%',
            textAlign: 'center',
            textStyle: {
                fontSize: 12,
        }
        }],
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
            name: '男生薪资',
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['50%','30%'],
            itemStyle: {
                borderRadius:10,
                borderWidth:2,
                borderColor:'#fff'
            },
            label: {
                show: true
            },
            data: data.map(v=>{
                return {
                    value: v.b_count,
                    name: v.label
                }
            }),  
                emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },label: {
                show: false
                }
            }
            },
            {
            name: '女生薪资',
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['50%', '70%'],
            itemStyle: {
                borderRadius: 10,
                borderWidth:2,
                borderColor:'#fff'

            },
            data: data.map(v=>{
                return {
                    value: v.g_count,
                    name: v.label
                }
            }),
             label: {
                show: true
            },
          emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },label: {
                show: false
                }
            }
            }
        ],
         color:['#FDA224', '#5097FF', '#3ABCFA', '#34D39A']
};

    myChart.setOption(option)
}
//渲染籍贯

 function renderMap(res){
    const data=res.data.provinceData;
  const dom = document.querySelector('#map')
  const myEchart = echarts.init(dom)
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]
  dataList.forEach(item=>{
    // console.log(item.name)
    const res=data.find(v=>{
        return v.name.includes(item.name);
    })
    //console.log(res)
    if(res){
        item.value=res.value
    }

  })
  const option = {
    title: {
      text: '籍贯分布',
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myEchart.setOption(option)
}


//获取学生统计数据
async function getData() {
    
    const res = await axios({
        url: '/dashboard'
    })
    // console.log(res)
    //渲染 overview
    renderOverview(res);
    renderSalaryTrend(res);
    renderSalaryDistribution(res)
    renderExpectation(res)
    renderGenderPie(res)
    renderMap(res)


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
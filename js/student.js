const loginObj = checkToken();
renderUsername(loginObj);
//判断是否登录并且同步用户信息
registerLogout();

const token = loginObj.token;


async function renderStudentInfo(){

    const res=await axios.get('/students')
    // console.log(res.data)
    document.querySelector('.total').innerHTML=res.data.length
    document.querySelector('.list').innerHTML=res.data.map(v=>{
        const{id,name,age,gender,hope_salary,salary,group,province,city,area}=v;
        return `
                    <tr>
                      <td>${name}</td>
                      <td>${age}</td>
                      <td>${gender===0?'男':'女'}</td>
                      <td>第${group}组</td>
                      <td>${hope_salary}</td>
                      <td>${salary}</td>
                      <td>${province+city+area}</td>
                      <td data-id=${id}>
                        <a href="javascript:;" class="text-success mr-3"><i class="bi bi-pen"></i></a>
                        <a href="javascript:;" class="text-danger "><i class="bi bi-trash"></i></a>
                      </td>
                    </tr>
        `
    }).join('');
}
renderStudentInfo();
const modalDom=document.querySelector('#modal');
const modal=new bootstrap.Modal(modalDom);

async function initCity() {
    const province= await axios.get('/api/province')
    // console.log(province)
    document.querySelector('[name=province]').innerHTML=`<option value="">--省份--</option>`
    + province.list.map(v=>{return `<option value="${v}">${v}</option>`})
    //给省加点击事件
    document.querySelector('[name=province]').addEventListener('change',async function (){
        const pname= this.value;
        const city= await axios.get('/api/city',{params:{pname}})
        console.log(city)
        document.querySelector('[name=city]').innerHTML=`<option value="">--城市--</option>`
        + city.list.map(v=>{
            return `<option value="${v}">${v}</option>`
        })
        document.querySelector('[name=area]').innerHTML=`<option value="">--地区--</option>`
    })
    //给城市加点击事件
    document.querySelector('[name=city]').addEventListener('change',async function (){
        const cname= this.value;
        const area= await axios.get('/api/area',{params:{cname,pname:document.querySelector('[name=province]').value}})
        console.log(area)
        document.querySelector('[name=area]').innerHTML=`<option value="">--地区--</option>`
        + area.list.map(v=>{
            return `<option value="${v}">${v}</option>`
        })
    })
}
initCity();

document.querySelector('#openModal').addEventListener('click', ()=>{
    document.querySelector('.modal-title').innerHTML='添加学生'
    modal.show();
    document.querySelector('[name=city]').innerHTML = `<option value="">--市--</option>`
    document.querySelector('[name=area]').innerHTML = `<option value="">--区--</option>`
    modalDom.dataset.id = 'add'
})


    const form=document.querySelector('#form');
    const submit=document.querySelector('#submit');

submit.addEventListener('click',async ()=>{
    const data=serialize(form,{hash:true,empty:true})
    //把响应字符串转成number
    data.age= +data.age;
    data.gender= +data.gender;
    data.salary= +data.salary;
    data.hope_salary= +data.hope_salary;
    data.group= +data.group
    if(modalDom.dataset.id!=='add'){
        try {
            const res= await axios({
                method:'PUT',
                url: `/students/${modalDom.dataset.id}`,
                data
            })
            showToast('修改成功')
            renderStudentInfo();
            modal.hide()  
            form.reset();
        } catch (error) {
            showToast('修改失败')
        }

    }else{
        try{
            const res= await axios({
            method:'post',
            url: '/students',
            data})

            console.log(res)
            showToast(res.message);
            renderStudentInfo();
            modal.hide();
            form.reset();

        }catch(err){
            showToast(err.response.message)
        }
    }
})


document.querySelector('.list').addEventListener('click',async e=>{
    if(e.target.classList.contains('bi-pen')){
        //编辑逻辑
        const id=e.target.parentElement.parentElement.dataset.id
        // console.log(id)
        document.querySelector('.modal-title').innerHTML='编辑学生'
        modal.show();
        const res=await axios.get(`/students/${id}`)
        const data=res.data;
        const fields = document.querySelectorAll('form [name]')
        // console.log(fields)
        Array.from(fields).forEach(ele=>{
            if(ele.name==='gender'){
                if (+ele.value === +data[ele.name])  ele.checked = true
            }else{
                ele.value= data[ele.name]
            }
        })
        const { list: city } = await axios.get('/api/city', { params: { pname: data.province } })
        const chtml = city.map((item) => `<option value="${item}">${item}</option>`).join('')
        document.querySelector('[name=city]').innerHTML = `<option value="">--市--</option>${chtml}`
        document.querySelector('[name=city]').value = data.city
        const { list: area } = await axios.get('/api/area', { params: { pname: data.province, cname: data.city } })
        const ahtml = area.map((item) => `<option value="${item}">${item}</option>`).join('')
        document.querySelector('[name=area]').innerHTML = `<option value="">--区--</option>${ahtml}`
        document.querySelector('[name=area]').value = data.area
        modalDom.querySelector('.modal-title').innerHTML = '编辑学生'
        // 记录ID修改使用
        modalDom.dataset.id = data.id
    }else if(e.target.classList.contains('bi-trash')){
        //删除逻辑
        const id=e.target.parentElement.parentElement.dataset.id
        console.log(id)
        try {
            const res=await axios.delete(`/students/${id}`)
            showToast('删除成功')
            renderStudentInfo();

        } catch (error) {
            showToast('删除失败')
        }
    }
})
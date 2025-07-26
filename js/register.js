document.querySelector('#btn-register').addEventListener('click',()=>{
    axios({
        method:'post',
        url: '/register',
        data: {
            username: 'kadzxx002',
            password:'123456'
        }
    })
})
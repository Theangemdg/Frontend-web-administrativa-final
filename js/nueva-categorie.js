var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`

function nuevaCategoria(){
    let txtnombreCategoria = document.getElementById('nombre').value;
    let txtIcono = document.getElementById('descripcion').value;


    if(txtnombreCategoria && txtIcono){
        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php',
            method: 'get',
            responseType: 'json'
        }).then((res) =>{
            let categoria = {
                id: res.data.length+1,
                nombreCategoria: txtnombreCategoria,
                icono: txtIcono,
                empresas: []
            }

            axios({
                url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php',
                method: 'post',
                responseType: 'json',
                data:categoria
            }).then((res) =>{
                
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
            window.location  = "../html/adminCategories.html"
        }).catch(err=>{
            console.log(err);
        })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'debes rellenar todos los campos',
            confirmButtonColor: '#44bae6' 
        })
    }
}


var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`

var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));
document.getElementById('nombre').value = categoriaActiva.nombreCategoria;
document.getElementById('descripcion').value = categoriaActiva.icono;

axios({
    url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php?id='+(categoriaActiva.id-1),
    method: 'get',
    responseType: 'json'
}).then((res) =>{
    console.log(res)
    document.getElementById('empresa').innerHTML = "";
    for(let i=0; i<res.data.empresas.length; i++){
        document.getElementById('empresa').innerHTML +=
        `<option value="${i}">${res.data.empresas[i].nombreEmpresa}</option>
        `
    }
}).catch(err=>{
    console.log(err);
})


function editarCategoria(){ 
    let txtnombreCategoria = document.getElementById('nombre').value;
    let txticono = document.getElementById('descripcion').value;

    if(txtnombreCategoria && txticono){
        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(categoriaActiva.id-1),
            method: 'get',
            responseType: 'json'
        }).then((res) =>{
            let empresas = Array();
            for(let i=0; i<res.data.empresas.length; i++){
                empresas.push(
                    {
                        nombreEmpresa: res.data.empresas[i].nombreEmpresa,
                        imagen: res.data.empresas[i].imagen,
                        logo: res.data.empresas[i].logo,
                        descripcion: res.data.empresas[i].descripcion,
                        productos: res.data.empresas[i].productos
                    }
                )
            }
            let categoria = {
                id: res.data.id,
                nombreCategoria:  document.getElementById('nombre').value,
                icono: document.getElementById('descripcion').value,
                empresas: empresas
            }

            axios({
                url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php?id='+(categoriaActiva.id-1),
                method: 'put',
                responseType: 'json',
                data: categoria
            }).then((res) =>{
                console.log(res.data);
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

function vaciarSessionStorage(){
    sessionStorage.setItem('Categoria Seleccionada', "");
}
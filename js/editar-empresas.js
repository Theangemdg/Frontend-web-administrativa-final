var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`

var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));
var empresaActiva = JSON.parse(sessionStorage.getItem('empresa seleccionada'));
document.getElementById('nombre').value = empresaActiva.nombreEmpresa;
document.getElementById('logo').value = empresaActiva.logo;
document.getElementById('banner').value = empresaActiva.imagen;
document.getElementById('descripcion').value = empresaActiva.descripcion;

axios({
    url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1),
    method: 'get',
    responseType: 'json'
}).then((res) =>{
    console.log(res)
    document.getElementById('productos').innerHTML = "";
    for(let i=0; i<res.data.productos.length; i++){
        document.getElementById('productos').innerHTML +=
        `<option value="${i}">${res.data.productos[i].nombreProducto}</option>
        `
    }
}).catch(err=>{
    console.log(err);
})


function editarEmpresa(){ 
    let txtnombreEmpresa = document.getElementById('nombre').value;
    let txtLogo = document.getElementById('logo').value;
    let txtbanner = document.getElementById('banner').value;
    let txtdescripcion = document.getElementById('descripcion').value;

    if(txtnombreEmpresa && txtLogo && txtbanner && txtdescripcion){
        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1),
            method: 'get',
            responseType: 'json'
        }).then((res) =>{
            console.log(res)
            let productos = Array();
            for(let i=0; i<res.data.productos.length; i++){
                productos.push(
                    {
                        nombreProducto: res.data.productos[i].nombreProducto,
                        imagenProducto: res.data.productos[i].imagenProducto,
                        descripcion: res.data.productos[i].descripcion,
                        precio: res.data.productos[i].precio
                    }
                )
            }
            let empresa = {
                id: res.data.id,
                nombreEmpresa:  document.getElementById('nombre').value,
                imagen:  document.getElementById('banner').value,
                logo: document.getElementById('logo').value,
                descripcion: document.getElementById('descripcion').value,
                productos: productos
            }

            axios({
                url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1),
                method: 'put',
                responseType: 'json',
                data: empresa
            }).then((res) =>{
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
            Swal.fire({
                icon: 'success',
                title: 'Agregado!',
                text: 'se ha agregado el producto correctamente',
                showConfirmButton: false,
                timer: 1500 
            }).then(res =>{
                vaciarSessionStorage();
                window.location  = "../html/adminEmpresas.html"
            })
            
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
    sessionStorage.setItem('empresa seleccionada', "");
}
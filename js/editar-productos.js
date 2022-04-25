var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`

var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));
var empresaActiva = JSON.parse(sessionStorage.getItem('empresa seleccionada'));
var productoActivo = JSON.parse(sessionStorage.getItem('producto seleccionado'));
var idProductoActivo = JSON.parse(sessionStorage.getItem('idProducto'));

document.getElementById('nombre').value = productoActivo.nombreProducto;
document.getElementById('imagen').value = productoActivo.imgProducto;
document.getElementById('precio').value = productoActivo.precio;
document.getElementById('descripcion').value = productoActivo.descripcion;

function vaciarSessionStorage(){
    sessionStorage.setItem('producto seleccionado', "");
    sessionStorage.setItem('idProducto', "");
}


function editarProducto(){ 
    let txtnombreProducto = document.getElementById('nombre').value;
    let txtimagen = document.getElementById('imagen').value;
    let txtprecio = document.getElementById('precio').value;
    let txtdescripcion = document.getElementById('descripcion').value;
    

    if(txtnombreProducto && txtimagen && txtprecio && txtdescripcion){
        let producto = {
            nombreProducto:  txtnombreProducto,
            imgProducto: txtimagen,
            precio: parseInt(txtprecio),
            descripcion: txtdescripcion,
        }
        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1)+'&idP='+idProductoActivo,
            method: 'put',
            responseType: 'json',
            data: producto
        }).then((res) =>{
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Agregado!',
                text: 'se ha agregado el producto correctamente',
                showConfirmButton: false,
                timer: 1500 
            }).then(res =>{
                vaciarSessionStorage();
                window.location  = "../html/adminProductos.html"
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
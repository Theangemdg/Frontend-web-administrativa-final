var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`
var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));
var empresaActiva = JSON.parse(sessionStorage.getItem('empresa seleccionada'));

function llenarTablaEmpresas(){
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1),
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data);
        document.getElementById('bodyproductos').innerHTML = "";
        for(let i=0; i<res.data.productos.length; i++){
            document.getElementById('bodyproductos').innerHTML += 
            `
            <tr>
                <td>${i+1}</td>
                <td><img src="${res.data.productos[i].imgProducto}" alt="" height="30px"></td>
                <td>${res.data.productos[i].nombreProducto}</td>
                <td>$${res.data.productos[i].precio}</td>
                <td>
                    <a class="btn btn-info" href="../html/editarProducto.html" onclick="productoSeleccionado('${i}')">
                        <i class="fas fa-pen"></i>
                    </a>
                    <button class="btn btn-danger" onclick="eliminarProducto('${i}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
            `
        }
    }).catch(err=>{
        console.log(err);
    })
}
llenarTablaEmpresas();

function productoSeleccionado(idproducto){
    console.log(idproducto)
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1)+'&idP='+idproducto,
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res)
        sessionStorage.setItem('producto seleccionado', JSON.stringify(res.data));
        sessionStorage.setItem('idProducto', idproducto);
    }).catch(err=>{
        console.log(err);
    })
}

function eliminarProducto(idproducto){
    console.log(idproducto)
    

    Swal.fire({
        title: 'Estas Seguro?',
        text: "No podras revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#44bae6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios({
                url: 'http://localhost/Backend-Portal-Delivery/api/productos.php?id='+(categoriaActiva.id-1)+'&idE='+(empresaActiva.id-1)+'&idP='+idproducto,
                method: 'delete',
                responseType: 'json'
            }).then((res) =>{
                llenarTablaEmpresas();

               Swal.fire({
                icon: 'success',
                title: 'Eliminada!',
                text: 'El producto ha sido eliminada',
                confirmButtonColor: '#44bae6' 
                })
            }).catch(err=>{
                console.log(err);
            })
        }
    })
}
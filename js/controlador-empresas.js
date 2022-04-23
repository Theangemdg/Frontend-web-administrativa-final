var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`
var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));

function llenarTablaEmpresas(){
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(categoriaActiva.id-1),
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data);
        document.getElementById('bodyempresas').innerHTML = "";
        for(let i=0; i<res.data.empresas.length; i++){
            document.getElementById('bodyempresas').innerHTML += 
            `
            <tr>
                <td>${i+1}</td>
                <td><img src="${res.data.empresas[i].logo}" alt="" height="30px"></td>
                <td>${res.data.empresas[i].nombreEmpresa}</td>
                <td>
                    <a class="btn btn-info" href="../html/editarEmpresa.html" onclick="empresaSeleccionada('${res.data.id}', '${i}')">
                        <i class="fas fa-pen"></i>
                    </a>
                    <button class="btn btn-danger" onclick="eliminarEmpresa('${res.data.id}', '${i}')">
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

function empresaSeleccionada(idCategoria,idEmpresa){

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(idCategoria-1)+'&idE='+idEmpresa,
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res)
        sessionStorage.setItem('empresa seleccionada', JSON.stringify(res.data));
    }).catch(err=>{
        console.log(err);
    })
}

function eliminarEmpresa(idCategoria, idEmpresa){
    console.log(idCategoria);
    console.log(idEmpresa);
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
                url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(idCategoria-1)+'&idE='+idEmpresa,
                method: 'delete',
                responseType: 'json'
            }).then((res) =>{
               llenarTablaEmpresas();

               Swal.fire({
                icon: 'success',
                title: 'Eliminada!',
                text: 'La empresa ha sido eliminada',
                confirmButtonColor: '#44bae6' 
                })
            }).catch(err=>{
                console.log(err);
            })
        }
    })
}
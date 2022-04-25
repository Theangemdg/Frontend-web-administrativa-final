var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`
var categoriaActiva = JSON.parse(sessionStorage.getItem('Categoria Seleccionada'));

function guardarEmpresa(){
    let txtnombreEmpresa = document.getElementById('nombre').value;
    let txtLogo = document.getElementById('logo').value;
    let txtbanner = document.getElementById('banner').value;
    let txtdescripcion = document.getElementById('descripcion').value;


    if(txtnombreEmpresa && txtLogo && txtbanner && txtdescripcion){

        let empresa = {
            id: (categoriaActiva.empresas.length+1),
            nombreEmpresa:  txtnombreEmpresa,
            imagen:  txtbanner,
            logo: txtLogo,
            descripcion: txtdescripcion,
            productos: []
        }
        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php?id='+(categoriaActiva.id-1),
            method: 'post',
            responseType: 'json',
            data: empresa
        }).then((res) =>{
            Swal.fire({
                icon: 'success',
                title: 'Agregada!',
                text: 'se ha agregado la empresa correctamente',
                showConfirmButton: false,
                timer: 1500 
            })
            limpiarInputs()
            console.log(res)
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

function limpiarInputs(){
    document.getElementById('nombre').value = "";
    document.getElementById('logo').value = "";
    document.getElementById('banner').value = "";
    document.getElementById('descripcion').value = "";
}
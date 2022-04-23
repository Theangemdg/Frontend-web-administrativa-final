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
        url: 'http://localhost/Backend-Portal-Delivery/api/empresas.php'+categoriaActiva.id-1,
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data);
    }).catch(err=>{
        console.log(err);
    })
}
llenarTablaCategories();
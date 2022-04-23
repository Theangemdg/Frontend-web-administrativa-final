var clienteActivo = JSON.parse(sessionStorage.getItem('Usuario activo'));
document.getElementById('userDropdown').innerHTML = "";
document.getElementById('userDropdown').innerHTML = 
`
<span class="mr-2 d-none d-lg-inline text-gray-600 small">${clienteActivo.nombre}</span>
<img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
`

function llenarTablaCategories(){
    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php',
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        console.log(res.data);
        document.getElementById('bodycategories').innerHTML = "";
        for(let i=0; i<res.data.length; i++){
            document.getElementById('bodycategories').innerHTML += 
            `
            <tr>
                <td>${res.data[i].id}</td>
                <td><img src="${res.data[i].icono}" alt="" height="30px"></td>
                <td>${res.data[i].nombreCategoria}</td>
                <td>
                    <a class="btn btn-info" href="../html/adminEmpresas.html" onclick="categoriaSeleccionada(${i})">
                        <i class="fas fa-pen"></i>
                    </a>
                    <a class="btn btn-danger" href="#">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
            `
        }
    }).catch(err=>{
        console.log(err);
    })
}
llenarTablaCategories();

function categoriaSeleccionada(idCategoria){

    axios({
        url: 'http://localhost/Backend-Portal-Delivery/api/categorias.php?id='+idCategoria,
        method: 'get',
        responseType: 'json'
    }).then((res) =>{
        sessionStorage.setItem('Categoria Seleccionada', JSON.stringify(res.data));
    }).catch(err=>{
        console.log(err);
    })
}
function validarCampo(){
    let txtcorreo = document.getElementById('exampleInputEmail').value;
    let txtcontraseña = document.getElementById('exampleInputPassword').value;

    console.log(txtcorreo)
    console.log(txtcontraseña)
    var campos = {
        correo: false,
        contraseña: false
    }

    if(txtcorreo && txtcontraseña !== " "){
        campos.correo = true;
        campos.contraseña = true;
    }

    if(campos.correo && campos.contraseña === true){

        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/administradores.php',
            method: 'get',
            responseType: 'json'
        }).then((res) =>{
            console.log(res.data);
            for (let i = 0; i<res.data.length; i++) {
                if (res.data[i].correo==txtcorreo && res.data[i].password==txtcontraseña ) {
                    window.location  = "index.html"
                    sessionStorage.setItem('Usuario activo', JSON.stringify(res.data[i]));
                    break;
                }else{
                    alert("No se encuentra ningun administrador con esas credenciales")
                    break;
                }
            }
        }).catch(err=>{
            console.log(err);
        })
    }else{
        alert("es necesario rellenar todos los campos")
    }
}
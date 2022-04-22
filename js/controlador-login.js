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
        window.location  = "index.html"
    }else{
        alert("es necesario rellenar todos los campos")
    }
}
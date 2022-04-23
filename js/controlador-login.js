function validarCampo(){
    let txtcorreo = document.getElementById('exampleInputEmail').value;
    let txtcontrasena = document.getElementById('exampleInputPassword').value;

    if(txtcorreo && txtcontrasena){

        axios({
            url: 'http://localhost/Backend-Portal-Delivery/api/administradores.php',
            method: 'get',
            responseType: 'json'
        }).then((res) =>{
            console.log(res.data);
            for (let i = 0; i<res.data.length; i++) {
                if (res.data[i].correo==txtcorreo && res.data[i].password==txtcontrasena ) { 
                    sessionStorage.setItem('Usuario activo', JSON.stringify(res.data[i]));
                    window.location  = "../html/index.html"
                    break;
                }
            }
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
import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import '../../bootstrap-5.3.3-dist/js/bootstrap'
import { useRef } from 'react'
import Departamentos from './Departamentos'
import MensajeError from './MensajeError'

const Registro = () => {

    const usuario = useRef(null);
    const password = useRef(null);

    const registrar = () => {
        if(usuario.current.value != null && password.current.value != null && localStorage.getItem("departamento") != null && localStorage.getItem("ciudad") != null){
            fetch('https://babytracker.develotion.com/usuarios.php', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "usuario": usuario.current.value,
                    "password": password.current.value,
                    "idDepartamento": localStorage.getItem("departamento"),
                    "idCiudad": localStorage.getItem("ciudad")
                })
            })
            .then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (data) {
				console.log(data);

				if (data.codigo == 200) {
					localStorage.setItem("apiKey", data.apiKey);
                    MostrarToastSuccess();
				} else {
					MostrarToastError(data.mensaje);
                }
            })
        }
        else{
            MostrarToastError("Hubo un error, verifique sus datos e intente nuevamente.");
        }
    }

    const MostrarToastError = (mensaje) => {
        const toastBody = document.querySelector('#ToastError .toast-body');
        toastBody.innerHTML = mensaje;
        const toastError = document.getElementById('ToastError');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastError);
        toastBootstrap.show()
    }

    const MostrarToastSuccess = () => {
        const toastSuccess = document.getElementById('ToastSuccess');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastSuccess);
        toastBootstrap.show()
    }

  return (
    <>

    <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="ToastSuccess" className="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <strong className="me-auto">Babytracker</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                Exito!
            </div>
        </div>
    </div>

    <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="ToastError" className="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            <strong className="me-auto">Error!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
            </div>
        </div>
    </div>

    <div className='row row-cols-2'>
    <div className="col-md-4 sm-12 position-absolute top-50 start-50 translate-middle">
            <div className="registro">
                <div className="card">
                    <div className="card-header">
                    Registro
                    </div>
                    <div className="card-body">
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label" style={{marginTop:10}}>Usuario</label>
            <input type="email" className="form-control" ref={usuario} />
        </div>
        <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-labe"  style={{marginTop:10}}>Password</label>
            <input type="password" className="form-control" ref={password}/>
        </div>
        <div className="col-md-12">
            <Departamentos/>
        </div>
        <div className="col-12">
            <button type="submit" className="btn btn-info" style={{marginTop:10}} onClick={registrar}>Registrarse</button>
        </div>
        </div>
        </div>
        </div>
    </div>
    </div>
</>
  )
}

export default Registro

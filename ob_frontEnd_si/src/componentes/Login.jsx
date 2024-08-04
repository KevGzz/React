import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import { useRef } from 'react'

const Login = () => {

    const usuario = useRef(null);
    const password = useRef(null);

    const login = () => {
        fetch("https://babytracker.develotion.com/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario": usuario.current.value,
                "password": password.current.value
            }),
        })
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
    
                if (data.codigo == 200) {
                    localStorage.setItem("apiKey", data.apiKey);
                    localStorage.setItem("idUser", data.id);
                    MostrarToastSuccess();
    
                } else {
                    MostrarToastError(data.mensaje)
                }
            });   
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
        <div className="col-md-3 sm-12 position-absolute top-50 start-50 translate-middle">
            <div className="login">
                <div className="card">
                    <div className="card-header">
                    Login
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="usuario" className="control-label">Username</label>
                            <input id="usuario" ref={usuario} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" id="password" ref={password} className="form-control" />
                        </div>
                        <div className="form-group" style={{marginTop:10}}>
                            <input type="submit" value="Log in" className="btn btn-info" onClick={login} />
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Login

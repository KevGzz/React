import { useNavigate } from 'react-router-dom';
import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import { useRef } from 'react'
import { toast } from "react-toastify";

const Login = () => {

    const usuario = useRef(null);
    const password = useRef(null);
    const navigator = useNavigate();

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
                    toast.success("Exito!");
                    navigator("/Dashboard")
    
                } else {
                    toast.error(data.mensaje);
                }
            });   
    }

  return (
    <>

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

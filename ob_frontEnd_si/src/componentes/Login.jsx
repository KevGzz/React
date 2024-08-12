import { useNavigate } from 'react-router-dom';
import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import { useEffect, useRef, useState } from 'react'
import { toast } from "react-toastify";

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();
    const [habilitado, setHabilitado] = useState(true);

    useEffect(() => {
        if (usuario.trim() && password.trim()) {
            setHabilitado(false); // Enable the button
        } 
    }, [usuario, password])

    const login = () => {
        fetch("https://babytracker.develotion.com/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario": usuario,
                "password": password
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

    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
    };

    const cambiarPassword = (e) => {
        setPassword(e.target.value);
    };

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
                            <input id="usuario" className="form-control" onChange={cambiarUsuario} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="control-label">Password</label>
                            <input type="password" id="password" className="form-control" onChange={cambiarPassword} />
                        </div>
                        <div className="form-group" style={{marginTop:10}}>
                            <button type="submit" className="btn btn-info" disabled={habilitado} onClick={login}>Iniciar Sesión</button>
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

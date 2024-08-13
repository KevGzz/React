import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import '../../bootstrap-5.3.3-dist/js/bootstrap'
import { useEffect, useRef } from 'react'
import Departamentos from './Departamentos'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Registro = () => {

    const usuario = useRef(null);
    const password = useRef(null);
    const navigator = useNavigate();

    useEffect(() => {if(localStorage.getItem("apiKey") !== null) navigator("/Dashboard")},[])

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
				// console.log(response);
				return response.json();
			})
			.then(function (data) {
				if (data.codigo == 200) {
                    localStorage.setItem("idUser", data.id);
					localStorage.setItem("apiKey", data.apiKey);
                    toast.success("Bienvenido " + usuario.current.value + "!");
                    navigator("/Dashboard")
				} else {
                    toast.error(data.mensaje);
                }
            })
        }
        else{
            toast.error("Hubo un error! Verifique sus datos e intente nuevamente.");
        }
    }



  return (
    <>
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

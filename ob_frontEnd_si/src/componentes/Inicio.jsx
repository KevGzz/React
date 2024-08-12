import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Inicio = () => {

  const navigator = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("apiKey") != null) navigator("/Dashboard");
  },[])

  return ( 
    <>
        <h1 className='text-center'>Babytracker</h1>
        <div className="row">
            <div className="col-lg-4 p-3 position-absolute top-50 start-50 translate-middle">
                <div className="card">
                    <div className="card-body">
                        <p className="text-center" style={{marginTop:10}}>Usted no ha iniciado sesión, por favor
                        <button type="button" className="btn btn-info" style={{marginLeft:10, marginRight:10}}><Link className="nav-link" to="/Login">Inicie Sesión</Link></button>
                        o
                        <button type="button" className="btn btn-warning" style={{marginLeft:10, marginRight:10}}><Link className="nav-link" to="/Registro">Registrese</Link></button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Inicio

import { Link } from "react-router-dom"

const Inicio = () => {
  return (
    <>
        <h1 className='text-center'>Babytracker</h1>
        <div className="row">
            <div className="col-lg-4 p-3 position-absolute top-50 start-50 translate-middle">
                <div class="card">
                    <div class="card-body">
                        <p className="text-center" style={{marginTop:10}}>Usted no ha iniciado sesión, por favor
                        <button type="button" class="btn btn-info" style={{marginLeft:10, marginRight:10}}><a className="nav-link" href="/Login">Inicie Sesión</a></button>
                        o
                        <button type="button" class="btn btn-warning" style={{marginLeft:10, marginRight:10}}><a className="nav-link" href="/Registro">Registrese</a></button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Inicio

import { toast } from 'react-toastify'
import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import { Outlet, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigator = useNavigate()

  const logout = () => {
    localStorage.clear();
    toast.info("Bye bye");
    navigator("/Login");
  }

  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/Dashboard">Babytracker</a>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/Dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Registro">Registrarse</a>
              </li>
              <li className="nav-item position-absolute top-0 end-0">
                  <a className="nav-link text-dark">
                      <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Navbar

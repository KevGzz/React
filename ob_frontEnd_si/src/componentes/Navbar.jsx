import { toast } from 'react-toastify'
import '../../bootstrap-5.3.3-dist/css/bootstrap.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

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
          <NavLink className="navbar-brand" to="/Dashboard">Babytracker</NavLink>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {localStorage.getItem("apiKey") != null &&
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/Dashboard">Dashboard</NavLink>
              </li>
              }
              {localStorage.getItem("apiKey") == null &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">Login</NavLink>
                </li>
              }{localStorage.getItem("apiKey") == null &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Registro">Registrarse</NavLink>
                </li>
              }
              {localStorage.getItem("apiKey") != null &&
                <li className="nav-item position-absolute top-0 end-0">
                   <NavLink className="nav-link text-dark" to="/">
                      <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                  </NavLink>
                </li>
              }
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

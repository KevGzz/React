import '../../bootstrap-5.3.3-dist/css/bootstrap.css'

const Navbar = () => {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Babytracker</a>
    <div className="navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Registrarse</a>
        </li>
        <li className="nav-item position-absolute top-0 end-0">
            <a className="nav-link text-dark">
                <button type="button" className="btn btn-danger">Logout</button>
            </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar

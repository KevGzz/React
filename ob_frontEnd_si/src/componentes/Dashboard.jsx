import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("apiKey") === null) {
      navigator("/");
    } else {
      fetch(
        "https://babytracker.develotion.com/eventos.php?idUsuario=" +
          localStorage.getItem("idUsuario")
      )
        .then((r) => r.json())
        .then((data) => console.log(data));
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="col text-center">
        <div
          className="spinner-grow"
          style={{ width: 50, height: 50 }}
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="col text-center">
        <p className="text-center">Cargando</p>
      </div>
    </div>
  ) : (
    <div className="container" style={{ marginTop: 10 }}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-12">
              <div class="card">
                <h5 class="card-header">Featured</h5>
                <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-0">
            <div className="col-6 p-2 border border-light-subtle rounded"></div>
            <div className="col-6 p-2 border border-light-subtle rounded"></div>
          </div>

          <div className="row g-0">
            <div className="col-6 p-2 border border-light-subtle rounded"></div>
            <div className="col-6 p-2 border border-light-subtle rounded"></div>
          </div>

          <div className="row g-0">
            <div className="col-12 p-2 border border-light-subtle rounded"></div>
          </div>
        </div>

        <div className="col-4 border border-light-subtle rounded">
          <ol class="list-group list-group-numbered" style={{ marginTop: 10 }}>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
          </ol>
          <hr />
          <ol
            class="list-group list-group-numbered"
            style={{ marginTop: 10, marginBottom: 10 }}>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
            <li class="list-group-item">A list item</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

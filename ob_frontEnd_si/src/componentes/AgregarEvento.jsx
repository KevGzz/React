import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { agregarEvento } from "../features/eventoSlice";
import { toast } from "react-toastify";

const AgregarEvento = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.categorias);
  const detalles = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  const agregarEventos = () => {
    if (startDate != null && localStorage.getItem("categoria") != null) {
      fetch("https://babytracker.develotion.com/eventos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("apiKey"),
          iduser: localStorage.getItem("idUser"),
        },
        body: JSON.stringify({
          idCategoria: localStorage.getItem("categoria"),
          idUsuario: localStorage.getItem("idUser"),
          detalle: detalles.current.value,
          fecha: startDate,
        }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.codigo == 200) {
            console.log(data);
            dispatch(
              agregarEvento({
                id: data.idEvento,
                idCategoria: Number(localStorage.getItem("categoria")),
                idUsuario: Number(localStorage.getItem("idUser")),
                detalle: detalles.current.value,
                fecha: startDate.toJSON(),
              })
            );
            toast.success("Exito!");
          } else {
            toast.error(data.mensaje);
          }
        });
    } else {
      toast.error("Hubo un error! Verifique sus datos e intente nuevamente.");
    }
  };

  const cambiarCategoria = (e) => {
    localStorage.setItem("categoria", e.target.value);
  };

  return (
    <div className="card">
      <h5 className="card-header">Agregar Evento</h5>
      <div className="card-body">
        <div className="row mb-3 align-items-center">
          <label
            htmlFor="inputState"
            className="col-sm-2 col-form-label fs-6 fw-medium">
            Categoría
          </label>
          <div className="col-sm-10">
            <select
              id="inputState"
              className="form-select"
              onChange={cambiarCategoria}>
              <option defaultValue>Seleccione....</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.tipo}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label
            htmlFor="detallesText"
            className="col-sm-2 col-form-label fs-6 fw-medium">
            Detalles
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control my-2"
              ref={detalles}
              placeholder="Detalles..."
              id="detallesText"></textarea>
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label
            htmlFor="datePicker"
            className="col-sm-2 col-form-label fs-6 fw-medium">
            Fecha
          </label>
          <div className="col-sm-10">
            <DatePicker
              className="datePicker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className="container text-center">
          <div className="col align-self-center">
            <button
              type="submit"
              className="btn btn-info"
              onClick={agregarEventos}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarEvento;

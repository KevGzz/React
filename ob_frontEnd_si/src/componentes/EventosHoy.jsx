import { toast } from "react-toastify";
import { eliminarEvento } from "../features/eventoSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Iconos from "./Iconos";

const EventosHoy = (eventos) => {
  const dispatch = useDispatch();

  const eliminarEventos = (idEvento) => {
    fetch(
      "https://babytracker.develotion.com/eventos.php?idEvento=" + idEvento,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: localStorage.getItem("apiKey"),
          iduser: localStorage.getItem("idUser"),
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.codigo == 200) {
          dispatch(eliminarEvento(idEvento));
          toast.success("Exito!");
        } else toast.error(data.mensaje);
      });
  };

  return (
    <ol
      className="list-group list-group-numbered"
      style={{ marginTop: 10, marginBottom: 10 }}>
      {eventos.eventos.map((evento) => (
        <li key={evento.id} className="list-group-item">
          {<Iconos idCategoria={evento.idCategoria} />}
          {evento.fecha}
          <p className="text-wrap font-monospace ml-5 mt-2">{evento.detalle}</p>
          <button
            type="submit"
            className="btn btn-sm btn-outline-danger position-absolute top-50 end-0 translate-middle-y"
            style={{ marginRight: 10 }}
            onClick={() => eliminarEventos(evento.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ol>
  );
};

export default EventosHoy;

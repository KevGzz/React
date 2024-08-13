import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgregarEvento from "./AgregarEvento";
import { guardarBiberon, guardarEventos, guardarPanhal } from "../features/eventoSlice";
import { useDispatch, useSelector } from "react-redux";
import EventosHoy from "./EventosHoy";
import Eventos from "./Eventos";
import { guardarCategorias } from "../features/categoriasSlice";
import GraficaEventos from "./GraficaEventos";
import GraficaComidas from "./GraficaComidas";
import ProxBiberon from "./ProxBiberon";
import Biberones from "./Biberones";
import Panhales from "./Panhales";

const Dashboard = () => {
	const hoy = new Date();
	const navigator = useNavigate();
	const eventos = useSelector((state) => state.eventos.eventos);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("apiKey") === null) {
			navigator("/");
		} else {
			fetch("https://babytracker.develotion.com/categorias.php", {
				headers: {
					"Content-Type": "application/json",
					apikey: localStorage.getItem("apiKey"),
					iduser: localStorage.getItem("idUser"),
				},
			})
				.then((r) => r.json())
				.then((data) => {
					dispatch(guardarCategorias(data.categorias));
					fetch(
						"https://babytracker.develotion.com/eventos.php?idUsuario=" +
							localStorage.getItem("idUser"),
						{
							headers: {
								"Content-Type": "application/json",
								apikey: localStorage.getItem("apiKey"),
								iduser: localStorage.getItem("idUser"),
							},
						}
					)
						.then((r) => r.json())
						.then((data) => {
							if (data.codigo == 200) {
								// console.log(data);
								dispatch(guardarEventos(data.eventos));
								const ultimoBiberon = data.eventos
									.filter((evento) => evento.idCategoria == 35)
									.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
								// console.log(ultimoBiberon);
								if (ultimoBiberon != undefined) {
									const fechaEvento = new Date(ultimoBiberon.fecha);
									// console.log(fechaEvento);
									dispatch(guardarBiberon(fechaEvento.getHours()));
								}
                const ultimoPanhal = data.eventos
									.filter((evento) => evento.idCategoria == 33)
									.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
								// console.log(ultimoBiberon);
								if (ultimoPanhal != undefined) {
									const fechaEvento = new Date(ultimoPanhal.fecha);
									// console.log(fechaEvento);
									dispatch(guardarPanhal(fechaEvento.getHours()));
								}
								setLoading(false);
							} else {
								// console.log(data);
								navigator("/");
							}
						});
				});
		}
	}, []);

	return loading ? (
		<div className="position-absolute top-50 start-50 translate-middle">
			<div className="col text-center">
				<div
					className="spinner-grow"
					style={{ width: 50, height: 50 }}
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
			<div className="col text-center">
				<p className="text-center">Cargando</p>
			</div>
		</div>
	) : (
		<div className="container " style={{ marginTop: 10 }}>
			<div className="row">
				<div className="col-8">
					<div className="row">
						<div className="col-12">
							<AgregarEvento />
						</div>
					</div>

					<div className="row g-0">
						<div className="col-6 p-2 border border-light-subtle rounded text-center pt-4">
							<Biberones/>
						</div>
						<div className="col-6 p-2 border border-light-subtle rounded text-center pt-4">
							<Panhales/>
						</div>
					</div>

					<div className="row g-0">
						<div className="col-6 p-2 border border-light-subtle rounded text-center">
							<GraficaEventos />
						</div>
						<div className="col-6 p-2 border border-light-subtle rounded text-center">
							<GraficaComidas />
						</div>
					</div>

					<div className="row g-0">
						<div className="col-12 p-2 border border-light-subtle rounded text-center pt-4">
							<ProxBiberon />
						</div>
					</div>
				</div>

				<div className="col-4 border border-light-subtle rounded">
					<h4 style={{ marginTop: 20 }}>Hoy</h4>
					<EventosHoy
						eventos={eventos.filter((evento) => {
							const fechaEvento = new Date(evento.fecha);
							return (
								fechaEvento.getDate() === hoy.getDate() &&
								fechaEvento.getMonth() === hoy.getMonth() &&
								fechaEvento.getFullYear() === hoy.getFullYear()
							);
						})}
					/>
					<hr />
					<h4>Días Anteriores</h4>
					<Eventos
						eventos={eventos.filter((evento) => {
							const fechaEvento = new Date(evento.fecha);
							return !(
								fechaEvento.getDate() === hoy.getDate() &&
								fechaEvento.getMonth() === hoy.getMonth() &&
								fechaEvento.getFullYear() === hoy.getFullYear()
							);
						})}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

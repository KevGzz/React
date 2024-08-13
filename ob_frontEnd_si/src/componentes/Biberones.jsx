import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Biberones = () => {
	const eventos = useSelector((state) => state.eventos.eventos);
	const ultimoBiberon = useSelector((state) => state.eventos.ultimoBiberon);
	const [biberones, setBiberones] = useState([]);
	const [tiempo, setTime] = useState("");
	const hoy = new Date();
	useEffect(() => {
		setBiberones(
			eventos.filter((evento) => {
				const fechaEvento = new Date(evento.fecha);
				return (
					evento.idCategoria == 35 &&
					fechaEvento.getDate() === hoy.getDate() &&
					fechaEvento.getMonth() === hoy.getMonth() &&
					fechaEvento.getFullYear() === hoy.getFullYear()
				);
			})
		);
		const ultimoBiberon = eventos
			.filter((evento) => evento.idCategoria == 35)
			.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
		if (ultimoBiberon != undefined) {
			const fechaEvento = new Date(ultimoBiberon.fecha);

			const calcularTiempo = () => {
				const horaEvento = new Date(fechaEvento);
				const diferencia = hoy - horaEvento;

				const minutos = Math.floor((diferencia / 1000 / 60) % 60);
				const horas = Math.floor((diferencia / 1000 / 60 / 60) % 24);
				const dias = Math.floor(diferencia / 1000 / 60 / 60 / 24);

				setTime(`${dias}d ${horas}h ${minutos}m`);
			};

			calcularTiempo();

		}
	}, [eventos, ultimoBiberon]);

	return (
		<div className="row">
			<p className="col-12 fs-6">
				Total de biberones ingeridos en el dia: {biberones.length}
			</p>
			<p className="col-12 fs-6">Tiempo transcurrido desde el último:</p><p className="text-center text-info-emphasis">{tiempo}</p>
		</div>
	);
};

export default Biberones;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Panhales = () => {
	const eventos = useSelector((state) => state.eventos.eventos);
	const ultimoPanhal = useSelector((state) => state.eventos.ultimoPanhal);
	const [panhales, setPanhales] = useState([]);
	const [tiempo, setTime] = useState("");
	const hoy = new Date();
	useEffect(() => {
		setPanhales(
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
		const ultimoPanhal = eventos
			.filter((evento) => evento.idCategoria == 33)
			.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
		if (ultimoPanhal != undefined) {
			const fechaEvento = new Date(ultimoPanhal.fecha);

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
	}, [eventos, ultimoPanhal]);

	return (
		<div className="row">
			<p className="col-12 fs-6">
				Total de biberones ingeridos en el dia: {panhales.length}
			</p>
			<p className="col-12 fs-6">Tiempo transcurrido desde el último:</p><p className="text-center text-danger-emphasis">{tiempo}</p>
		</div>
	);
};

export default Panhales;
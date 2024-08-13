import { useDispatch, useSelector } from "react-redux";
import { guardarBiberon, restarBiberon, sumarBiberon } from "../features/eventoSlice";
import { useEffect, useState } from "react";

const ProxBiberon = () => {
	const dispatch = useDispatch();
	const biberon = useSelector((state) => state.eventos.proxBiberon);
	const ultimoBiberon = useSelector((state) => state.eventos.ultimoBiberon);
	const horaActual = new Date().getHours();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(restarBiberon(horaActual));
		// console.log(horaActual);
		// console.log(biberon);
		setLoading(false);
  	}, [ultimoBiberon]);
	return ( loading ? (
		<>
			<div className="spinner-border spinner-border-sm" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</>
	) : (
      biberon <= 0 ?
			<p className="text-danger fs-5">Tiempo restante para el proximo biberón: 0 horas</p>
      :
      <p className="text-success fs-5">Tiempo restante para el proximo biberón: {biberon} horas</p>
  )
)
};

export default ProxBiberon;

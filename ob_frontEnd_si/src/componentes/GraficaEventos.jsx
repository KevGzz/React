
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from "react";
import { guardarCantidad } from "../features/eventoSlice";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Cantidad de Eventos',
        },
    },
};


const GraficaEventos = () => {
    const categorias = useSelector(state => state.categorias.categorias);
    const eventos = useSelector(state => state.eventos.eventos)
    const eventosxCat = useSelector(state => state.eventos.eventosxCategoria)
    const dispatch = useDispatch();
    // console.log("Eventos:", eventosxCat);
    // console.log("Categorias:", categorias)

    useEffect(() => {
        const conteoEventos = {
            "Comida": eventos.filter(evento => evento.idCategoria === 31).length,
            "Paseo": eventos.filter(evento => evento.idCategoria === 32).length,
            "Pañal": eventos.filter(evento => evento.idCategoria === 33).length,
            "Sueño": eventos.filter(evento => evento.idCategoria === 34).length,
            "Biberón": eventos.filter(evento => evento.idCategoria === 35).length,
            "Juego": eventos.filter(evento => evento.idCategoria === 36).length,
        };

        dispatch(guardarCantidad(conteoEventos));
    }, [dispatch, eventos]);

  return (
    <div className="col">
                <Bar options={options} data={{
                    labels: categorias.filter(categoria => eventosxCat[categoria.idCategoria] > 0),
                    datasets: [
                        {
                            label: 'eventos',
                            data: eventosxCat,
                            backgroundColor: 'rgba(145, 231, 255, 0.6)'
                        }
                    ],
                }} />
    </div>
  )
}

export default GraficaEventos

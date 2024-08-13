
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
import { guardarComidas } from "../features/eventoSlice";
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
            text: 'Cantidad de Comidas',
        },
    },
};


const GraficaComidas = () => {
    const categorias = useSelector(state => state.categorias.categorias);
    const eventos = useSelector(state => state.eventos.eventos)
    const comidasxDia = useSelector(state => state.eventos.comidasxDia);
    const dispatch = useDispatch();
    // console.log("Categorias:", categorias)

    useEffect(() => {
        const diaActual = new Date();
        const diaSemana = diaActual.getDay(); 

        const inicioSemana = new Date(diaActual);
        const distanciaLunes = (diaSemana === 0 ? 6 : diaSemana - 1); 
        inicioSemana.setDate(diaActual.getDate() - distanciaLunes);
        inicioSemana.setHours(0, 0, 0, 0); 

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6);
        finSemana.setHours(23, 59, 59, 999); 

        const eventosSemana = eventos.filter(evento => {
            evento.idCategoria == 31;
            const fechaEvento = new Date(evento.fecha);
            return fechaEvento >= inicioSemana && fechaEvento <= finSemana;
        });

        const conteoComidas = {
            "Lunes": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 1 && evento.idCategoria == 31).length,
            "Martes": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 2 && evento.idCategoria == 31).length,
            "Miercoles": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 3 && evento.idCategoria == 31).length,
            "Jueves": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 4 && evento.idCategoria == 31).length,
            "Viernes":eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 5 && evento.idCategoria == 31).length,
            "Sabado": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 6 && evento.idCategoria == 31).length,
            "Domingo": eventosSemana.filter(evento => new Date(evento.fecha).getDay() === 0 && evento.idCategoria == 31).length,
        };
        dispatch(guardarComidas(conteoComidas));
        // console.log(comidasxDia);
    }, [dispatch, eventos]);

  return (
    <div className="col">
                <Bar options={options} data={{
                    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                    datasets: [
                        {
                            label: 'comidas',
                            data: comidasxDia,
                            backgroundColor: 'rgba(252, 164, 235, 0.6)'
                        }
                    ],
                }} />
    </div>
  )
}

export default GraficaComidas


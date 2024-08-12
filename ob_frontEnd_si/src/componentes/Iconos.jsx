import { useEffect, useState } from "react"

const Iconos = ({idCategoria}) => {

    const [categoria, setCategoria] = useState(null);
	const [loading, setLoading] = useState(true);
    useEffect(() => {
         fetch('https://babytracker.develotion.com/categorias.php',
        {
            headers: {
                "Content-Type": "application/json",
                apikey: localStorage.getItem("apiKey"),
                iduser: localStorage.getItem("idUser"),
            },
        }
    )
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        const categoriaEncontrada = data.categorias.find(categoria => categoria.id === idCategoria);
        setCategoria(categoriaEncontrada);
        setLoading(false);
        console.log(categoriaEncontrada)
    })
    }, [idCategoria]);

  return (loading ? (
    <div className="">
        <div className="col text-center">
            <div
                className="spinner-border"
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
) : 
    <>
    {console.log(categoria)}
    <img src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`} className="img-thumbnail" alt="..."></img>
    </>
  )
}

export default Iconos

// import React, { useState, useEffect } from 'react';

// const Iconos = ({ idCategoria }) => {
//     const [categoria, setCategoria] = useState(null);
//     const [cargando, setCargando] = useState(true); // Estado para manejar la carga

//     useEffect(() => {
//         if (idCategoria === null || idCategoria === undefined) {
//             console.error('ID de categoría no válido:', idCategoria);
//             setCategoria(null); // Restablece el estado de categoria
//             setCargando(false); // Finaliza el estado de carga
//             return;
//         }
//         setCargando(true);
//         fetch('https://babytracker.develotion.com/categorias.php', {
//             headers: {
//                 "Content-Type": "application/json",
//                 apikey: localStorage.getItem("apiKey"),
//                 iduser: localStorage.getItem("idUser"),
//             },
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Datos recibidos de la API:', data);
//             console.log(idCategoria)
//             const categoriaEncontrada = data.categorias.find(categoria => categoria.id === idCategoria);
//             console.log('Categoría encontrada:', categoriaEncontrada);

//             setCategoria(categoriaEncontrada || null);
//         })
//         .catch(error => console.error('Error fetching data:', error))
//         .finally(() => setCargando(false)); // Establece cargando en false después de la operación
//     }, [idCategoria]);

//     if (cargando) {
//         return <p>Cargando...</p>; // Muestra un mensaje o indicador mientras se carga
//     }

//     if (!categoria) {
//         return <p>Categoría no encontrada o error al cargar</p>;
//     }

//     // Asegúrate de que la propiedad 'imagen' existe en el objeto 'categoria'
//     if (!categoria.imagen) {
//         return <p>Imagen no disponible</p>;
//     }

//     return (
//         <img
//             src={`https://babytracker.develotion.com/imgs/${categoria.imagen}.png`}
//             className="img-thumbnail"
//             alt={categoria.nombre || 'Categoría'}
//         />
//     );
// };

// export default Iconos;
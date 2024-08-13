import React, { useState, useEffect } from 'react';

const Departamentos = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [selDepartamento, setSelDepartamento] = useState('');

    useEffect(() => {
        fetch('https://babytracker.develotion.com/departamentos.php')
            .then(r => r.json())
            .then(datos => setDepartamentos(datos.departamentos));
    }, []);

    useEffect(() => {
        if (selDepartamento) {
            fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${selDepartamento}`)
                .then(r => r.json())
                .then(datos => setCiudades(datos.ciudades))
                .catch(error => console.error('Error fetching ciudades:', error));
        } else {
            setCiudades([]);
        }
    }, [selDepartamento]);

    const cambiarDpto = (e) => {
        setSelDepartamento(e.target.value);
        localStorage.setItem("departamento", e.target.value);
    };
    const cambiarCiudad = (e) => {
        localStorage.setItem("ciudad", e.target.value);
    }

    return (
        <>
        <label htmlFor="inputState" className="form-label" style={{marginTop:10}}>Departamento</label>
        <select id="inputState" className="form-select" value={selDepartamento} onChange={cambiarDpto}>
            <option defaultValue>Seleccione...</option>
            {departamentos.map(departamento => <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>)}
        </select>
        <label htmlFor="inputState" className="form-label" style={{marginTop:10}}>Ciudad</label>
            <select id="inputState" className="form-select" onChange={cambiarCiudad}>
            <option defaultValue>Seleccione....</option>
            {ciudades.map(ciudad => (
                    <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                    </option>
                ))}
            </select>
        </>
        )

}

export default Departamentos

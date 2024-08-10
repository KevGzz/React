const Eventos = (eventos) => {
	return (
		<ol className="list-group list-group-numbered" style={{ marginTop: 10 }}>
            {eventos.eventos.map(evento => <li key={evento.id} className="list-group-item">{evento.detalle}</li>)}
		</ol>
	);
};

export default Eventos;

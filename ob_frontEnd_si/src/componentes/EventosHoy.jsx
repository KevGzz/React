
const EventosHoy = (eventos) => {
    console.log(eventos);
  return (
    <ol
    className="list-group list-group-numbered"
    style={{ marginTop: 10, marginBottom: 10 }}>
        {eventos.eventos.map(evento => <li key={evento.id} className="list-group-item">{evento.detalle}</li>)}
    </ol>
  )
}

export default EventosHoy

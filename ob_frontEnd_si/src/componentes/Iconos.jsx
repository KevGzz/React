import { useSelector } from "react-redux";

const Iconos = ({ idCategoria }) => {
  const categorias = useSelector((state) => state.categorias.categorias);

  return (
    <img
      src={`https://babytracker.develotion.com/imgs/${
        categorias.find((categoria) => categoria.id === idCategoria).imagen
      }.png`}
      className="img-thumbnail"
      style={{ marginRight: 10 }}
      alt="..."></img>
  );
};

export default Iconos;

import { configureStore } from "@reduxjs/toolkit";
import eventoReducer from "../features/eventoSlice";
import categoriaReducer from "../features/categoriasSlice";

export const store = configureStore({
  reducer: {
    eventos: eventoReducer,
    categorias: categoriaReducer,
  },
});

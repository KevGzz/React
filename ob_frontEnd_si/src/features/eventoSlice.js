import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    eventos: []
}

export const eventoSlice = createSlice({
    name: "eventos",
    initialState,
    reducers:{
        guardarEventos: (state, action) => {
            state.eventos = action.payload;
        },
        agregarEvento: (state, action) => {
            state.eventos.push(action.payload);
        }
    }
})

export const {guardarEventos, agregarEvento} = eventoSlice.actions;
export default eventoSlice.reducer;
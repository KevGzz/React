import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    eventos: [],
    eventosxCategoria: [],
    comidasxDia: [],
    proxBiberon: 0,
    ultimoBiberon: null,
    ultimoPanhal: null
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
        },
        eliminarEvento: (state, action) => {
            state.eventos = state.eventos.filter(evento => evento.id !== action.payload);
        },
        guardarCantidad: (state, action) => {
            state.eventosxCategoria = action.payload;
        },
        guardarComidas: (state, action) => {
            state.comidasxDia = action.payload;
        },
        sumarBiberon: (state) => {
            state.proxBiberon = 4;
        },
        restarBiberon: (state, action) => {
            if(state.ultimoBiberon - action.payload == 0) state.proxBiberon = 4;
            if(state.ultimoBiberon - action.payload == -1) state.proxBiberon = 3; 
            if(state.ultimoBiberon - action.payload == -2) state.proxBiberon = 2; 
            if(state.ultimoBiberon - action.payload == -3) state.proxBiberon = 1; 
            if(state.ultimoBiberon - action.payload < -4) state.proxBiberon = 0; 
        },
        guardarBiberon: (state, action) => {
            state.ultimoBiberon = action.payload;
        },
        guardarPanhal: (state, action) => {
            state.ultimoPanhal = action.payload;
        }
    }
})

export const {guardarEventos, agregarEvento, eliminarEvento, guardarCantidad, guardarComidas, sumarBiberon, restarBiberon, guardarBiberon, guardarPanhal} = eventoSlice.actions;
export default eventoSlice.reducer;
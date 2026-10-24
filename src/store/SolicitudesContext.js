import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { cargarSolicitudes } from '../services/solicitudesService';
import { crearSolicitud } from '../models/solicitud';

const initialState = { items: [], loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD': return { items: action.payload, loading: false };
    case 'LOADING': return { ...state, loading: true };
    case 'DONE': return { ...state, loading: false };
    case 'ADD': return { ...state, items: [action.payload, ...state.items] };
    case 'UPDATE': return { ...state, items: state.items.map((s) => (s.id === action.payload.id ? { ...s, ...action.payload } : s)) };
    case 'DELETE': return { ...state, items: state.items.filter((s) => s.id !== action.id) };
    default: return state;
  }
}

const Ctx = createContext(null);

export function SolicitudesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Simula un refresh (los datos ya viven en memoria).
  const refrescar = () => {
    dispatch({ type: 'LOADING' });
    setTimeout(() => dispatch({ type: 'DONE' }), 600);
  };

  useEffect(() => {
    cargarSolicitudes().then((data) => dispatch({ type: 'LOAD', payload: data }));
  }, []);

  const value = {
    ...state,
    refrescar,
    agregar: (datos) => dispatch({ type: 'ADD', payload: crearSolicitud(datos) }),
    actualizar: (cambios) => dispatch({ type: 'UPDATE', payload: cambios }),
    eliminar: (id) => dispatch({ type: 'DELETE', id }),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSolicitudes = () => useContext(Ctx);

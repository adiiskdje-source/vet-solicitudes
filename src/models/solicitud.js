/**
 * Solicitud {
 *  id: string, clienteNombre: string, telefono: string, mascotaNombre: string,
 *  tipoServicio: 'CONSULTA'|'VACUNACION'|'EMERGENCIA'|'GROOMING',
 *  prioridad: 'BAJA'|'MEDIA'|'ALTA', descripcion: string,
 *  estado: 'PENDIENTE'|'EN_ATENCION'|'FINALIZADO', fechaRegistro: string (ISO)
 * }
 */
export const crearSolicitud = (datos) => ({
  id: Date.now().toString() + Math.floor(Math.random() * 1000),
  ...datos,
  clienteNombre: datos.clienteNombre.trim(),
  telefono: datos.telefono.trim(),
  mascotaNombre: datos.mascotaNombre.trim(),
  descripcion: datos.descripcion.trim(),
  estado: 'PENDIENTE',
  fechaRegistro: new Date().toISOString(),
});

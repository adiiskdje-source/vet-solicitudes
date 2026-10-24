export function validarSolicitud(v) {
  const e = {};
  if (!v.clienteNombre.trim() || v.clienteNombre.trim().length < 3) e.clienteNombre = 'Ingrese el nombre del cliente (mín. 3 caracteres).';
  if (!/^9\d{8}$/.test(v.telefono.trim())) e.telefono = 'Teléfono inválido: 9 dígitos y empieza con 9.';
  if (!v.mascotaNombre.trim()) e.mascotaNombre = 'Ingrese el nombre de la mascota.';
  if (!v.tipoServicio) e.tipoServicio = 'Seleccione un tipo de servicio.';
  if (!v.prioridad) e.prioridad = 'Seleccione una prioridad.';
  if (v.descripcion.trim().length < 10) e.descripcion = 'La descripción debe tener al menos 10 caracteres.';
  return e;
}

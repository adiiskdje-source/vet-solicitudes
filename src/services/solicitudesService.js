// Servicio simulado: datos en memoria (sin base de datos).
const SEED = [
  { id: '1', clienteNombre: 'María Torres', telefono: '987654321', mascotaNombre: 'Luna', tipoServicio: 'VACUNACION', prioridad: 'MEDIA', descripcion: 'Vacuna antirrábica anual para perra labrador.', estado: 'PENDIENTE', fechaRegistro: new Date(Date.now() - 3600e3).toISOString() },
  { id: '2', clienteNombre: 'Carlos Ruiz', telefono: '976543210', mascotaNombre: 'Max', tipoServicio: 'EMERGENCIA', prioridad: 'ALTA', descripcion: 'Posible intoxicación, vómitos desde la mañana.', estado: 'EN_ATENCION', fechaRegistro: new Date(Date.now() - 7200e3).toISOString() },
  { id: '3', clienteNombre: 'Ana Quispe', telefono: '965432109', mascotaNombre: 'Michi', tipoServicio: 'GROOMING', prioridad: 'BAJA', descripcion: 'Baño y corte de uñas para gato persa.', estado: 'FINALIZADO', fechaRegistro: new Date(Date.now() - 86400e3).toISOString() },
];

export const cargarSolicitudes = () =>
  new Promise((resolve) => setTimeout(() => resolve(SEED), 700));

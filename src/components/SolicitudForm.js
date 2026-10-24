import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FormInput from './FormInput';
import Chip from './Chip';
import PrimaryButton from './PrimaryButton';
import { COLORS, PRIORIDADES, SERVICIOS } from '../utils/constants';
import { validarSolicitud } from '../utils/validations';

const VACIO = { clienteNombre: '', telefono: '', mascotaNombre: '', tipoServicio: '', prioridad: '', descripcion: '' };
const lbl = { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 6 };
const err = { color: COLORS.danger, fontSize: 12, marginBottom: 8 };

export default function SolicitudForm({ onSubmit, submitLabel }) {
  const [form, setForm] = useState(VACIO);
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const enviar = () => {
    const e = validarSolicitud(form);
    setErrors(e);
    if (Object.keys(e).length === 0) onSubmit(form);
  };

  return (
    <View>
      <FormInput label="Nombre del cliente" value={form.clienteNombre} onChangeText={(t) => set('clienteNombre', t)} placeholder="Ej. María Torres" error={errors.clienteNombre} />
      <FormInput label="Teléfono" value={form.telefono} onChangeText={(t) => set('telefono', t.replace(/\D/g, '').slice(0, 9))} keyboardType="phone-pad" placeholder="9XXXXXXXX" error={errors.telefono} />
      <FormInput label="Nombre de la mascota" value={form.mascotaNombre} onChangeText={(t) => set('mascotaNombre', t)} placeholder="Ej. Luna" error={errors.mascotaNombre} />

      <Text style={lbl}>Tipo de servicio</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.entries(SERVICIOS).map(([k, s]) => (
          <Chip key={k} label={s.label} color={COLORS.primary} bg="#CCFBF1" selected={form.tipoServicio === k} onPress={() => set('tipoServicio', k)} />
        ))}
      </View>
      {!!errors.tipoServicio && <Text style={err}>{errors.tipoServicio}</Text>}

      <Text style={[lbl, { marginTop: 6 }]}>Prioridad</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.entries(PRIORIDADES).map(([k, p]) => (
          <Chip key={k} label={p.label} color={p.color} bg={p.bg} selected={form.prioridad === k} onPress={() => set('prioridad', k)} />
        ))}
      </View>
      {!!errors.prioridad && <Text style={err}>{errors.prioridad}</Text>}

      <View style={{ height: 8 }} />
      <FormInput label="Descripción" multiline value={form.descripcion} onChangeText={(t) => set('descripcion', t)} placeholder="Describa el motivo de la atención" error={errors.descripcion} />
      <PrimaryButton title={submitLabel} onPress={enviar} />
    </View>
  );
}

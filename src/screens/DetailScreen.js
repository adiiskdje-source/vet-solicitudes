import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSolicitudes } from '../store/SolicitudesContext';
import Chip from '../components/Chip';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, ESTADOS, PRIORIDADES, SERVICIOS } from '../utils/constants';
import { confirmar, formatearFecha, toast } from '../utils/feedback';

export default function DetailScreen({ route, navigation }) {
  const { items, actualizar, eliminar } = useSolicitudes();
  const item = items.find((s) => s.id === route.params.id);
  const [estado, setEstado] = useState(item?.estado);
  const [prioridad, setPrioridad] = useState(item?.prioridad);
  const [descripcion, setDescripcion] = useState(item?.descripcion ?? '');
  const [error, setError] = useState('');

  if (!item) return null;
  const srv = SERVICIOS[item.tipoServicio];

  const guardar = () => {
    if (descripcion.trim().length < 10) return setError('La descripción debe tener al menos 10 caracteres.');
    setError('');
    actualizar({ id: item.id, estado, prioridad, descripcion: descripcion.trim() });
    toast('Solicitud actualizada');
    navigation.goBack();
  };

  const borrar = () =>
    confirmar('Eliminar solicitud', `¿Eliminar la solicitud de ${item.mascotaNombre}? Esta acción no se puede deshacer.`, () => {
      eliminar(item.id); toast('Solicitud eliminada'); navigation.goBack();
    });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View style={styles.iconBox}><Ionicons name={srv.icon} size={32} color={COLORS.primary} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.mascotaNombre}</Text>
          <Text style={styles.sub}>{srv.label}</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Row icon="person" text={item.clienteNombre} />
        <Row icon="call" text={item.telefono} />
        <Row icon="time" text={formatearFecha(item.fechaRegistro)} />
      </View>

      <Text style={styles.label}>Estado</Text>
      <View style={styles.row}>
        {Object.entries(ESTADOS).map(([k, e]) => <Chip key={k} label={e.label} color={e.color} bg={e.bg} selected={estado === k} onPress={() => setEstado(k)} />)}
      </View>
      <Text style={styles.label}>Prioridad</Text>
      <View style={styles.row}>
        {Object.entries(PRIORIDADES).map(([k, p]) => <Chip key={k} label={p.label} color={p.color} bg={p.bg} selected={prioridad === k} onPress={() => setPrioridad(k)} />)}
      </View>
      <View style={{ height: 8 }} />
      <FormInput label="Descripción" multiline value={descripcion} onChangeText={setDescripcion} error={error} />

      <PrimaryButton title="Guardar cambios" onPress={guardar} />
      <PrimaryButton title="Eliminar solicitud" variant="danger" onPress={borrar} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}

const Row = ({ icon, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
    <Ionicons name={icon} size={18} color={COLORS.muted} />
    <Text style={{ marginLeft: 8, fontSize: 15, color: COLORS.text }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  sub: { fontSize: 14, color: COLORS.muted },
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
});

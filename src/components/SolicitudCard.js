import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Chip from './Chip';
import { COLORS, ESTADOS, PRIORIDADES, SERVICIOS } from '../utils/constants';
import { formatearFecha } from '../utils/feedback';

export default function SolicitudCard({ item, onPress }) {
  const est = ESTADOS[item.estado];
  const pri = PRIORIDADES[item.prioridad];
  const srv = SERVICIOS[item.tipoServicio];
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={srv.icon} size={26} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.mascotaNombre} · {srv.label}</Text>
        <Text style={styles.sub}>{item.clienteNombre} · {item.telefono}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.descripcion}</Text>
        <View style={styles.chips}>
          <Chip small label={est.label} color={est.color} bg={est.bg} />
          <Chip small label={`Prioridad ${pri.label}`} color={pri.color} bg={pri.bg} />
        </View>
        <Text style={styles.date}>{formatearFecha(item.fechaRegistro)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 14, padding: 14, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  sub: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  desc: { fontSize: 13, color: COLORS.text, marginTop: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  date: { fontSize: 11, color: COLORS.muted },
});

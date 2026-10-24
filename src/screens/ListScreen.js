import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSolicitudes } from '../store/SolicitudesContext';
import SolicitudCard from '../components/SolicitudCard';
import Chip from '../components/Chip';
import { COLORS, ESTADOS } from '../utils/constants';

export default function ListScreen({ navigation }) {
  const { items, loading, refrescar } = useSolicitudes();
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('TODOS');

  const datos = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return items.filter((s) =>
      (filtro === 'TODOS' || s.estado === filtro) &&
      (!q || s.clienteNombre.toLowerCase().includes(q) || s.mascotaNombre.toLowerCase().includes(q) || s.telefono.includes(q)));
  }, [items, busqueda, filtro]);

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput style={styles.searchInput} placeholder="Buscar cliente, mascota o teléfono" placeholderTextColor={COLORS.muted} value={busqueda} onChangeText={setBusqueda} />
      </View>
      <View style={{ flexGrow: 0 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          <Chip label="Todos" color={COLORS.primary} bg="#CCFBF1" selected={filtro === 'TODOS'} onPress={() => setFiltro('TODOS')} />
          {Object.entries(ESTADOS).map(([k, e]) => (
            <Chip key={k} label={e.label} color={e.color} bg={e.bg} selected={filtro === k} onPress={() => setFiltro(k)} />
          ))}
        </ScrollView>
      </View>
      {loading && items.length === 0 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={datos}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 96 }}
          refreshing={loading}
          onRefresh={refrescar}
          renderItem={({ item }) => <SolicitudCard item={item} onPress={() => navigation.navigate('Detail', { id: item.id })} />}
          ListEmptyComponent={<Text style={styles.empty}>No hay solicitudes que coincidan.</Text>}
        />
      )}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('Create')}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, marginBottom: 10, borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, paddingVertical: 11, paddingHorizontal: 8, fontSize: 15, color: COLORS.text },
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
  fab: { position: 'absolute', right: 20, bottom: 24, width: 58, height: 58, borderRadius: 29, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', elevation: 6 },
});

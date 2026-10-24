import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../utils/constants';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}><Ionicons name="paw" size={64} color={COLORS.primary} /></View>
      <Text style={styles.title}>Clínica Veterinaria</Text>
      <Text style={styles.sub}>Gestiona las solicitudes de atención de forma ordenada: consultas, vacunación, emergencias y grooming.</Text>
      <PrimaryButton title="Ingresar" onPress={() => navigation.replace('List')} style={{ alignSelf: 'stretch', backgroundColor: '#fff' }} variant="outline" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', padding: 28 },
  logo: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 15, color: '#CCFBF1', textAlign: 'center', marginVertical: 16, lineHeight: 22 },
});

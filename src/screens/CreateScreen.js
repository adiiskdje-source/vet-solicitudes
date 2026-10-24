import React from 'react';
import { ScrollView } from 'react-native';
import SolicitudForm from '../components/SolicitudForm';
import { useSolicitudes } from '../store/SolicitudesContext';
import { toast } from '../utils/feedback';
import { COLORS } from '../utils/constants';

export default function CreateScreen({ navigation }) {
  const { agregar } = useSolicitudes();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <SolicitudForm submitLabel="Registrar solicitud" onSubmit={(data) => { agregar(data); toast('Solicitud registrada'); navigation.goBack(); }} />
    </ScrollView>
  );
}

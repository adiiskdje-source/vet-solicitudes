import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Chip({ label, color, bg, selected, onPress, small }) {
  if (!onPress)
    return <Text style={[styles.chip, { backgroundColor: bg, color }, small && { fontSize: 11 }]}>{label}</Text>;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.chip, { backgroundColor: selected ? color : bg }]}>
      <Text style={[styles.text, { color: selected ? '#fff' : color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, fontSize: 12, fontWeight: '700', overflow: 'hidden', marginRight: 8, marginBottom: 6 },
  text: { fontSize: 13, fontWeight: '700' },
});

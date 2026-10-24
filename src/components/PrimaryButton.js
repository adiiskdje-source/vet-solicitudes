import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function PrimaryButton({ title, onPress, variant = 'primary', style }) {
  const bg = variant === 'danger' ? COLORS.danger : variant === 'outline' ? 'transparent' : COLORS.primary;
  const fg = variant === 'outline' ? COLORS.primary : '#fff';
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}
      style={[styles.btn, { backgroundColor: bg }, variant === 'outline' && { borderWidth: 1.5, borderColor: COLORS.primary }, style]}>
      <Text style={[styles.text, { color: fg }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  text: { fontSize: 16, fontWeight: '700' },
});

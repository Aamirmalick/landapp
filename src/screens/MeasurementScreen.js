import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { UNITS, convert, fmt } from '../units';

export default function MeasurementScreen() {
  const [value, setValue] = useState('1000');
  const [from, setFrom] = useState('sqft');

  const results = useMemo(() => {
    const n = parseFloat(value) || 0;
    return convert(n, from);
  }, [value, from]);

  return (
    <LinearGradient colors={[colors.bgDark, colors.bgMid]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>ENTER VALUE</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="decimal-pad"
            placeholder="0"
            placeholderTextColor={colors.textDim}
          />

          <Text style={styles.label}>CONVERT FROM</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 22 }}>
            {UNITS.map((u) => {
              const active = u.key === from;
              return (
                <TouchableOpacity
                  key={u.key}
                  onPress={() => setFrom(u.key)}
                  style={[styles.chip, active && styles.chipActive]}
                >
                  <Text style={[styles.chipText, active && { color: colors.bgDark }]}>
                    {u.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.label}>RESULTS</Text>
          {results.map((r) => (
            <View key={r.key} style={[styles.row, r.key === from && styles.rowActive]}>
              <Text style={styles.rowLabel}>{r.label}</Text>
              <Text style={styles.rowValue}>
                {fmt(r.result)} <Text style={styles.rowUnit}>{r.short}</Text>
              </Text>
            </View>
          ))}

          <Text style={styles.note}>
            1 cent = 435.6 sq ft • 1 acre = 100 cents • 1 ground = 2,400 sq ft
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 60 },
  label: { color: colors.gold, fontSize: 12, letterSpacing: 3, fontWeight: '700', marginBottom: 10 },
  input: {
    borderWidth: 2, borderColor: colors.border, borderRadius: 18, backgroundColor: colors.card,
    color: colors.white, fontSize: 34, fontWeight: '700', paddingHorizontal: 20, paddingVertical: 14,
    marginBottom: 24,
  },
  chip: {
    borderWidth: 1.5, borderColor: colors.border, borderRadius: 30,
    paddingHorizontal: 16, paddingVertical: 9, marginRight: 10,
  },
  chipActive: { backgroundColor: colors.gold },
  chipText: { color: colors.white, fontWeight: '600' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)',
  },
  rowActive: { borderColor: colors.gold, borderWidth: 1.5 },
  rowLabel: { color: colors.textDim, fontSize: 15 },
  rowValue: { color: colors.white, fontSize: 18, fontWeight: '700' },
  rowUnit: { color: colors.gold, fontSize: 13, fontWeight: '600' },
  note: { color: colors.textDim, textAlign: 'center', marginTop: 16, fontSize: 12 },
});

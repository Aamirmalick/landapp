import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(rise, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={[colors.bgDark, colors.bgMid, colors.bgLight]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="map" size={34} color={colors.bgDark} />
        </View>
        <View>
          <Text style={styles.hello}>Welcome to</Text>
          <Text style={styles.appName}>Land App</Text>
        </View>
      </View>

      <Animated.View style={{ opacity: fade, transform: [{ translateY: rise }] }}>
        <Text style={styles.section}>TOOLS</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.borderBtn}
          onPress={() => navigation.navigate('Measurement')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="resize" size={28} color={colors.gold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.btnTitle}>Land Measurement</Text>
            <Text style={styles.btnSub}>Sq feet to cents etc</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={32} color={colors.gold} />
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.footer}>Land App v1.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 70 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 40 },
  logo: {
    width: 62, height: 62, borderRadius: 20, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', elevation: 10,
  },
  hello: { color: colors.textDim, fontSize: 14 },
  appName: { color: colors.white, fontSize: 30, fontWeight: '800' },
  section: { color: colors.gold, fontSize: 13, letterSpacing: 3, marginBottom: 14, fontWeight: '700' },
  borderBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderWidth: 2, borderColor: colors.border, borderRadius: 22,
    backgroundColor: colors.card, padding: 18,
    elevation: 8, shadowColor: colors.gold, shadowOpacity: 0.3, shadowRadius: 12,
  },
  iconBox: {
    width: 52, height: 52, borderRadius: 16, borderWidth: 1.5, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  btnTitle: { color: colors.white, fontSize: 19, fontWeight: '700' },
  btnSub: { color: colors.textDim, fontSize: 14, marginTop: 3 },
  footer: { position: 'absolute', bottom: 30, alignSelf: 'center', color: colors.textDim, fontSize: 12 },
});

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function SplashScreen({ onFinish }) {
  const scale = useRef(new Animated.Value(0.3)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slide, {
        toValue: 0, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true,
      }),
      Animated.timing(spin, { toValue: 1, duration: 1200, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(onFinish, 2600);
    return () => clearTimeout(t);
  }, []);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['-180deg', '0deg'] });

  return (
    <LinearGradient colors={[colors.bgDark, colors.bgMid, colors.bgLight]} style={styles.container}>
      <Animated.View style={[styles.logoWrap, { transform: [{ scale }, { rotate }] }]}>
        <Ionicons name="map" size={70} color={colors.bgDark} />
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: fade, transform: [{ translateY: slide }] }]}>
        Land App
      </Animated.Text>
      <Animated.Text style={[styles.tag, { opacity: fade }]}>
        Measure • Convert • Simplify
      </Animated.Text>

      <Animated.View style={[styles.dots, { opacity: fade }]}>
        <View style={[styles.dot, { backgroundColor: colors.gold }]} />
        <View style={[styles.dot, { opacity: 0.6 }]} />
        <View style={[styles.dot, { opacity: 0.3 }]} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: {
    width: 140, height: 140, borderRadius: 40, backgroundColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', elevation: 20,
    shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 20,
  },
  title: { marginTop: 30, fontSize: 44, fontWeight: '800', color: colors.white, letterSpacing: 2 },
  tag: { marginTop: 8, fontSize: 15, color: colors.textDim, letterSpacing: 3 },
  dots: { position: 'absolute', bottom: 70, flexDirection: 'row', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.white },
});

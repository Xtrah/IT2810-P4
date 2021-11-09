import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ReactElement } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  children: ReactElement;
  colors: string[];
}

export default function Gradient({ children, colors }: Props) {
  return (
    <LinearGradient colors={colors} style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 5,
    margin: 5,
  },
});

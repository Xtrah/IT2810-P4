import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

interface Props {
  children: React.ReactElement;
  colors: string[];
}

// Creates linear gradient-wrapper based on passed colors
function Gradient({ children, colors }: Props) {
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

export default Gradient;

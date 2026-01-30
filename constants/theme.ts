// Binger Premium Theme - Netflix meets Spotify aesthetics

export const colors = {
  // Primary palette
  primary: '#2D0909',
  primaryLight: '#4A1515',
  primaryDark: '#1A0505',

  // Accent
  accent: '#C5A059',
  accentLight: '#D4B77A',
  accentDark: '#A88A48',

  // Text
  text: '#FFF5E1',
  textSecondary: 'rgba(255, 245, 225, 0.7)',
  textMuted: 'rgba(255, 245, 225, 0.5)',

  // Backgrounds
  background: '#0D0303',
  glass: 'rgba(45, 9, 9, 0.7)',
  card: 'rgba(45, 9, 9, 0.85)',
  cardBorder: 'rgba(197, 160, 89, 0.2)',

  // Utility
  success: '#4CAF50',
  error: '#FF5252',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  fontFamily: {
    header: 'Poppins_600SemiBold',
    headerBold: 'Poppins_700Bold',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
};

export type Theme = typeof theme;

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}

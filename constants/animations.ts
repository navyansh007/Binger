import { Easing } from 'react-native-reanimated';

export const timingConfig = {
  fast: { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
  normal: { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
  slow: { duration: 500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) },
  bounce: { duration: 400, easing: Easing.bezier(0.34, 1.56, 0.64, 1) },
};

export const springConfig = {
  gentle: { damping: 15, stiffness: 100, mass: 1 },
  bouncy: { damping: 10, stiffness: 180, mass: 1 },
  stiff: { damping: 20, stiffness: 300, mass: 1 },
  wobbly: { damping: 8, stiffness: 180, mass: 1 },
};

export const motiPresets = {
  fadeIn: {
    from: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { type: 'timing' as const, duration: 300 },
  },
  fadeInUp: {
    from: { opacity: 0, translateY: 20 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing' as const, duration: 400 },
  },
  fadeInDown: {
    from: { opacity: 0, translateY: -20 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing' as const, duration: 400 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring' as const, damping: 15, stiffness: 150 },
  },
  slideInRight: {
    from: { opacity: 0, translateX: 50 },
    animate: { opacity: 1, translateX: 0 },
    transition: { type: 'timing' as const, duration: 350 },
  },
  slideInLeft: {
    from: { opacity: 0, translateX: -50 },
    animate: { opacity: 1, translateX: 0 },
    transition: { type: 'timing' as const, duration: 350 },
  },
};

export const staggerDelay = (index: number, baseDelay = 50) => index * baseDelay;

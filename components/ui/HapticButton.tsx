import React from 'react';
import { Pressable, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useHaptics } from '../../hooks/useHaptics';
import { colors, borderRadius, typography, spacing } from '../../constants/theme';
import { springConfig } from '../../constants/animations';

interface HapticButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticType?: 'light' | 'medium' | 'heavy' | 'selection';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonText = styled.Text<{ variant: string; size: string }>`
  color: ${(props) =>
    props.variant === 'primary' ? colors.primary : colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${(props) =>
    props.size === 'sm'
      ? typography.fontSize.sm
      : props.size === 'lg'
      ? typography.fontSize.lg
      : typography.fontSize.md}px;
  text-align: center;
`;

export const HapticButton: React.FC<HapticButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  hapticType = 'light',
}) => {
  const scale = useSharedValue(1);
  const { lightImpact, mediumImpact, heavyImpact, selection } = useHaptics();

  const hapticFeedback = () => {
    switch (hapticType) {
      case 'medium':
        mediumImpact();
        break;
      case 'heavy':
        heavyImpact();
        break;
      case 'selection':
        selection();
        break;
      default:
        lightImpact();
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95, springConfig.bouncy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig.bouncy);
  };

  const handlePress = () => {
    hapticFeedback();
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getBackgroundColor = () => {
    if (disabled) return colors.textMuted;
    switch (variant) {
      case 'primary':
        return colors.accent;
      case 'secondary':
        return colors.glass;
      case 'ghost':
        return 'transparent';
      default:
        return colors.accent;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md };
      case 'lg':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.lg };
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        animatedStyle,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: borderRadius.full,
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: colors.accent,
          opacity: disabled ? 0.5 : 1,
          ...getPadding(),
        },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <ButtonText variant={variant} size={size} style={textStyle}>
          {children}
        </ButtonText>
      ) : (
        children
      )}
    </AnimatedPressable>
  );
};

import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { colors, borderRadius } from '../../constants/theme';

interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const Container = styled.View<{ width: number | string; height: number; radius: number }>`
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.radius}px;
  overflow: hidden;
  background-color: ${colors.primary};
`;

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
  borderRadius: radius = borderRadius.md,
  style,
}) => {
  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [-1, 1],
            [-200, 200]
          ),
        },
      ],
    };
  });

  return (
    <Container width={width} height={height} radius={radius} style={style}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <LinearGradient
          colors={[
            colors.primary,
            colors.primaryLight,
            colors.accent + '40',
            colors.primaryLight,
            colors.primary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: 400 }}
        />
      </Animated.View>
    </Container>
  );
};

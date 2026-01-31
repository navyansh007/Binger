import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { colors } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GestureOverlayProps {
  onTap: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  onSwipeRight?: () => void;
  onDoubleTapLeft?: () => void;
  onDoubleTapRight?: () => void;
}

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const PlayPauseIcon = styled(Animated.View)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -36px;
  margin-left: -36px;
  z-index: 10;
  opacity: 0;
`;

export const GestureOverlay: React.FC<GestureOverlayProps> = ({
  onTap,
  onSwipeUp,
  onSwipeDown,
  onSwipeRight,
}) => {
  const { lightImpact } = useHaptics();
  const iconOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.5);

  const showIcon = () => {
    iconOpacity.value = 1;
    iconScale.value = 0.5;
    iconScale.value = withSpring(1.2);
    iconOpacity.value = withSequence(
      withTiming(1, { duration: 200 }),
      withTiming(0, { duration: 800 })
    );
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      runOnJS(lightImpact)();
      runOnJS(onTap)();
    });

  const pan = Gesture.Pan()
    // .activeOffsetY([-20, 20]) // Removed to allow horizontal detection
    .onEnd((e) => {
      // Determine direction based on largest translation
      if (Math.abs(e.translationY) > Math.abs(e.translationX)) {
        // Vertical Swipe
        if (e.translationY < -50) {
          runOnJS(onSwipeUp)();
        } else if (e.translationY > 50) {
          runOnJS(onSwipeDown)();
        }
      } else {
        // Horizontal Swipe
        if (e.translationX > 50 && onSwipeRight) {
          runOnJS(onSwipeRight)();
        }
      }
    });

  const composed = Gesture.Simultaneous(singleTap, pan);

  const animatedIconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Container>
      <GestureDetector gesture={composed}>
        <Animated.View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <PlayPauseIcon style={animatedIconStyle}>
            <Ionicons name="play" size={72} color={colors.glass} />
          </PlayPauseIcon>
        </Animated.View>
      </GestureDetector>
    </Container>
  );
};

import React, { useRef } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useHaptics } from '../../hooks/useHaptics';
import { colors, typography } from '../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GestureOverlayProps {
  onTap: () => void;
  onDoubleTapLeft: () => void;
  onDoubleTapRight: () => void;
}

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
`;

const TouchZone = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SkipIndicator = styled(MotiView)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${colors.glass};
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const SkipText = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
  margin-top: 4px;
`;

export const GestureOverlay: React.FC<GestureOverlayProps> = ({
  onTap,
  onDoubleTapLeft,
  onDoubleTapRight,
}) => {
  const { mediumImpact } = useHaptics();
  const lastTapTimeRef = useRef<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const [showLeftIndicator, setShowLeftIndicator] = React.useState(false);
  const [showRightIndicator, setShowRightIndicator] = React.useState(false);

  const handleLeftPress = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTimeRef.current.left;

    if (timeSinceLastTap < 300) {
      // Double tap
      mediumImpact();
      onDoubleTapLeft();
      setShowLeftIndicator(true);
      setTimeout(() => setShowLeftIndicator(false), 500);
      lastTapTimeRef.current.left = 0;
    } else {
      // Single tap (wait to see if another tap comes)
      lastTapTimeRef.current.left = now;
      setTimeout(() => {
        if (lastTapTimeRef.current.left === now) {
          onTap();
        }
      }, 300);
    }
  };

  const handleRightPress = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTimeRef.current.right;

    if (timeSinceLastTap < 300) {
      // Double tap
      mediumImpact();
      onDoubleTapRight();
      setShowRightIndicator(true);
      setTimeout(() => setShowRightIndicator(false), 500);
      lastTapTimeRef.current.right = 0;
    } else {
      // Single tap (wait to see if another tap comes)
      lastTapTimeRef.current.right = now;
      setTimeout(() => {
        if (lastTapTimeRef.current.right === now) {
          onTap();
        }
      }, 300);
    }
  };

  return (
    <Container>
      <TouchZone onPress={handleLeftPress}>
        {showLeftIndicator && (
          <SkipIndicator
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Ionicons name="play-back" size={32} color={colors.text} />
            <SkipText>10s</SkipText>
          </SkipIndicator>
        )}
      </TouchZone>

      <TouchZone onPress={handleRightPress}>
        {showRightIndicator && (
          <SkipIndicator
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Ionicons name="play-forward" size={32} color={colors.text} />
            <SkipText>10s</SkipText>
          </SkipIndicator>
        )}
      </TouchZone>
    </Container>
  );
};

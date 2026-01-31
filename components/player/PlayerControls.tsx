import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants/theme';

interface PlayerControlsProps {
  visible: boolean;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  title: string;
  episodeTitle: string;
  onPlayPause: () => void;
  onSeek: (progress: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
}

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: box-none;
`;

const BottomGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
`;

const ContentWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md}px;
  padding-bottom: ${spacing.xl}px;
`;

const InfoContainer = styled.View`
  margin-bottom: ${spacing.xs}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.md}px;
  font-weight: 600;
  margin-bottom: 2px;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.5);
`;

const Subtitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.5);
`;

const SliderContainer = styled.View`
  width: 100%;
  height: 20px;
  justify-content: center;
`;

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  visible,
  currentTime,
  duration,
  title,
  episodeTitle,
  onSeek,
  onSlidingStart,
}) => {
  const insets = useSafeAreaInsets();
  const progress = duration > 0 ? currentTime / duration : 0;
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Overlay style={animatedStyle} pointerEvents={visible ? 'box-none' : 'none'}>
      <BottomGradient colors={['transparent', 'rgba(0,0,0,0.6)']} />

      <ContentWrapper style={{ paddingBottom: insets.bottom + spacing.xs }}>
        <InfoContainer>
          <Title>{title}</Title>
          <Subtitle>{episodeTitle}</Subtitle>
        </InfoContainer>

        <SliderContainer>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onSlidingStart={onSlidingStart} // Handle start
            onSlidingComplete={onSeek}
            minimumTrackTintColor={colors.accent}
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbTintColor="transparent" // Hidden thumb for minimal look
          />
        </SliderContainer>
      </ContentWrapper>
    </Overlay>
  );
};

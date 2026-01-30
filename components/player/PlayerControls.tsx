import React from 'react';
import { ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';
import { colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { formatDuration } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  onClose: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Overlay = styled(MotiView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TopGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
`;

const BottomGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
`;

interface TopControlsProps {
  insetTop: number;
}

const TopControls = styled.View<TopControlsProps>`
  position: absolute;
  top: ${(props: TopControlsProps) => props.insetTop}px;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${spacing.md}px;
  padding-top: ${spacing.md}px;
`;

const TitleContainer = styled.View`
  flex: 1;
  margin-horizontal: ${spacing.md}px;
`;

const SeriesTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.lg}px;
`;

const EpisodeTitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs / 2}px;
`;

const CenterControls = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${spacing.xl}px;
`;

const ControlButton = styled(Pressable)`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled(Pressable)`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.glass};
  border-radius: 35px;
`;

interface BottomControlsProps {
  insetBottom: number;
}

const BottomControls = styled.View<BottomControlsProps>`
  position: absolute;
  bottom: ${(props: BottomControlsProps) => props.insetBottom + spacing.md}px;
  left: 0;
  right: 0;
  padding-horizontal: ${spacing.md}px;
`;

const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

const TimeText = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

const SliderContainer = styled.View`
  width: 100%;
`;

const IconButton = styled(Pressable)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  visible,
  isPlaying,
  isBuffering,
  currentTime,
  duration,
  title,
  episodeTitle,
  onPlayPause,
  onSeek,
  onClose,
  onSkipForward,
  onSkipBackward,
  onNext,
  onPrevious,
}) => {
  const insets = useSafeAreaInsets();
  const { lightImpact } = useHaptics();

  const handlePlayPause = () => {
    lightImpact();
    onPlayPause();
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <Overlay
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ type: 'timing', duration: 200 }}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <TopGradient colors={[colors.black, 'transparent']} />
      <BottomGradient colors={['transparent', colors.black]} />

      <TopControls insetTop={insets.top}>
        <IconButton onPress={onClose}>
          <Ionicons name="chevron-down" size={28} color={colors.text} />
        </IconButton>

        <TitleContainer>
          <SeriesTitle numberOfLines={1}>{title}</SeriesTitle>
          <EpisodeTitle numberOfLines={1}>{episodeTitle}</EpisodeTitle>
        </TitleContainer>

        <IconButton>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </IconButton>
      </TopControls>

      <CenterControls>
        {onPrevious && (
          <ControlButton onPress={onPrevious}>
            <Ionicons name="play-skip-back" size={30} color={colors.text} />
          </ControlButton>
        )}

        <ControlButton onPress={onSkipBackward}>
          <Ionicons name="play-back" size={30} color={colors.text} />
        </ControlButton>

        <PlayButton onPress={handlePlayPause}>
          {isBuffering ? (
            <ActivityIndicator color={colors.text} size="large" />
          ) : (
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={36}
              color={colors.text}
            />
          )}
        </PlayButton>

        <ControlButton onPress={onSkipForward}>
          <Ionicons name="play-forward" size={30} color={colors.text} />
        </ControlButton>

        {onNext && (
          <ControlButton onPress={onNext}>
            <Ionicons name="play-skip-forward" size={30} color={colors.text} />
          </ControlButton>
        )}
      </CenterControls>

      <BottomControls insetBottom={insets.bottom}>
        <SliderContainer>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            onSlidingComplete={onSeek}
            minimumTrackTintColor={colors.accent}
            maximumTrackTintColor={colors.textMuted}
            thumbTintColor={colors.accent}
          />
        </SliderContainer>

        <TimeRow>
          <TimeText>{formatDuration(Math.floor(currentTime))}</TimeText>
          <TimeText>{formatDuration(Math.floor(duration))}</TimeText>
        </TimeRow>
      </BottomControls>
    </Overlay>
  );
};

import React, { useEffect, useRef } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { colors, borderRadius, typography, spacing, shadows } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { Series } from '../../data/mockData';
import { formatEpisodeCount } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - spacing.md * 2;
const CARD_HEIGHT = CARD_WIDTH * (9 / 16);

interface VideoPreviewCardProps {
  series: Series;
  isVisible: boolean;
  index: number;
}

const CardContainer = styled(Pressable)`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  margin-bottom: ${spacing.md}px;
  background-color: ${colors.card};
`;

const ThumbnailImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const VideoPreview = styled(Video)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
`;

const ContentContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
  margin-bottom: ${spacing.xs}px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.xs}px;
`;

const Tag = styled.View`
  background-color: ${colors.glass};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${borderRadius.sm}px;
`;

const TagText = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs}px;
`;

const EpisodeCount = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
`;

const ProgressBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${colors.primaryLight};
`;

const ProgressFill = styled.View<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${colors.accent};
`;

export const VideoPreviewCard: React.FC<VideoPreviewCardProps> = ({
  series,
  isVisible,
  index,
}) => {
  const router = useRouter();
  const videoRef = useRef<Video>(null);
  const { lightImpact } = useHaptics();

  const currentProgress = series.episodes.find(
    (ep) => ep.progress > 0 && ep.progress < 100
  )?.progress || 0;

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.playAsync();
      } else {
        videoRef.current.pauseAsync();
        videoRef.current.setPositionAsync(0);
      }
    }
  }, [isVisible]);

  const handlePress = () => {
    lightImpact();
    router.push(`/series/${series.id}`);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 400,
        delay: index * 100,
      }}
      style={shadows.md}
    >
      <CardContainer onPress={handlePress}>
        <ThumbnailImage
          source={{ uri: series.thumbnail }}
          contentFit="cover"
          transition={300}
        />

        {isVisible && (
          <VideoPreview
            ref={videoRef}
            source={{ uri: series.previewVideo }}
            resizeMode={ResizeMode.COVER}
            isLooping
            isMuted
            shouldPlay={isVisible}
          />
        )}

        <GradientOverlay
          colors={['transparent', colors.primary + 'CC', colors.primary]}
          locations={[0, 0.5, 1]}
        />

        <ContentContainer>
          <Title numberOfLines={1}>{series.title}</Title>
          <MetaRow>
            <EpisodeCount>{formatEpisodeCount(series.episodeCount)}</EpisodeCount>
            <TagsContainer>
              {series.tags.slice(0, 2).map((tag) => (
                <Tag key={tag}>
                  <TagText>{tag}</TagText>
                </Tag>
              ))}
            </TagsContainer>
          </MetaRow>
        </ContentContainer>

        {currentProgress > 0 && (
          <ProgressBar>
            <ProgressFill progress={currentProgress} />
          </ProgressBar>
        )}
      </CardContainer>
    </MotiView>
  );
};

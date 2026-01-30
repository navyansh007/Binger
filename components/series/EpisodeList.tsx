import React from 'react';
import { FlatList, Pressable, ListRenderItem } from 'react-native';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { Episode } from '../../data/mockData';
import { formatDuration } from '../../utils/formatters';

const EPISODE_CARD_WIDTH = 160;
const EPISODE_CARD_HEIGHT = 90;

interface EpisodeListProps {
  episodes: Episode[];
  seriesId: string;
  currentEpisodeId?: string;
}

const Container = styled.View`
  margin-top: ${spacing.lg}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
`;

const SeeAllText = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
`;

interface EpisodeCardProps {
  isActive: boolean;
}

const EpisodeCard = styled(Pressable)<EpisodeCardProps>`
  width: ${EPISODE_CARD_WIDTH}px;
  margin-left: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  overflow: hidden;
  border-width: ${(props: EpisodeCardProps) => (props.isActive ? 2 : 0)}px;
  border-color: ${colors.accent};
`;

const ThumbnailContainer = styled.View`
  width: ${EPISODE_CARD_WIDTH}px;
  height: ${EPISODE_CARD_HEIGHT}px;
  position: relative;
`;

const Thumbnail = styled(Image)`
  width: 100%;
  height: 100%;
`;

const DurationBadge = styled.View`
  position: absolute;
  bottom: ${spacing.xs}px;
  right: ${spacing.xs}px;
  background-color: ${colors.overlay};
  padding: ${spacing.xs / 2}px ${spacing.xs}px;
  border-radius: ${borderRadius.sm}px;
`;

const DurationText = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs}px;
`;

const PlayOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: ${colors.overlay};
`;

const ProgressBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: ${colors.primaryLight};
`;

interface ProgressFillProps {
  progress: number;
}

const ProgressFill = styled.View<ProgressFillProps>`
  height: 100%;
  width: ${(props: ProgressFillProps) => props.progress}%;
  background-color: ${colors.accent};
`;

const InfoContainer = styled.View`
  padding: ${spacing.sm}px;
  background-color: ${colors.card};
`;

const EpisodeNumber = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs}px;
`;

const EpisodeTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs / 2}px;
`;

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  seriesId,
  currentEpisodeId,
}) => {
  const router = useRouter();
  const { lightImpact } = useHaptics();

  const handleEpisodePress = (episode: Episode) => {
    lightImpact();
    router.push(`/player/${episode.id}?seriesId=${seriesId}`);
  };

  const renderEpisode: ListRenderItem<Episode> = ({ item, index }) => {
    const isActive = item.id === currentEpisodeId;
    const episodeNumber = index + 1;

    return (
      <MotiView
        from={{ opacity: 0, translateX: 20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: 'timing', duration: 300, delay: index * 50 }}
        style={shadows.sm}
      >
        <EpisodeCard
          isActive={isActive}
          onPress={() => handleEpisodePress(item)}
        >
          <ThumbnailContainer>
            <Thumbnail
              source={{ uri: item.thumbnail }}
              contentFit="cover"
              transition={200}
            />

            {item.progress === 0 && (
              <PlayOverlay>
                <Ionicons name="play-circle" size={32} color={colors.text} />
              </PlayOverlay>
            )}

            <DurationBadge>
              <DurationText>{formatDuration(item.duration)}</DurationText>
            </DurationBadge>

            {item.progress > 0 && (
              <ProgressBar>
                <ProgressFill progress={item.progress} />
              </ProgressBar>
            )}
          </ThumbnailContainer>

          <InfoContainer>
            <EpisodeNumber>Episode {episodeNumber}</EpisodeNumber>
            <EpisodeTitle numberOfLines={1}>{item.title}</EpisodeTitle>
          </InfoContainer>
        </EpisodeCard>
      </MotiView>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Episodes</Title>
        <Pressable>
          <SeeAllText>See All</SeeAllText>
        </Pressable>
      </Header>

      <FlatList
        data={episodes}
        renderItem={renderEpisode}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: spacing.md }}
      />
    </Container>
  );
};

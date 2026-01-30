import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { VideoPlayer } from '../../components/player';
import { QuickClipButton } from '../../components/player/QuickClipButton';
import { getSeriesById, getEpisodeById } from '../../data/mockData';
import { colors } from '../../constants/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

const NotFoundContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
`;

const NotFoundText = styled.Text`
  color: ${colors.textMuted};
  font-size: 18px;
`;

export default function PlayerScreen() {
  const { episodeId, seriesId } = useLocalSearchParams<{
    episodeId: string;
    seriesId: string;
  }>();
  const router = useRouter();

  const series = getSeriesById(seriesId || '');
  const episode = series?.episodes.find((ep) => ep.id === episodeId);

  if (!series || !episode) {
    return (
      <NotFoundContainer>
        <NotFoundText>Episode not found</NotFoundText>
      </NotFoundContainer>
    );
  }

  const currentIndex = series.episodes.findIndex((ep) => ep.id === episodeId);
  const hasNext = currentIndex < series.episodes.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    if (hasNext) {
      const nextEpisode = series.episodes[currentIndex + 1];
      router.replace(`/player/${nextEpisode.id}?seriesId=${series.id}`);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      const prevEpisode = series.episodes[currentIndex - 1];
      router.replace(`/player/${prevEpisode.id}?seriesId=${series.id}`);
    }
  };

  const initialPosition = (episode.progress / 100) * episode.duration;

  return (
    <Container>
      <VideoPlayer
        videoUrl={episode.videoUrl}
        title={series.title}
        episodeTitle={episode.title}
        onClose={handleClose}
        onNext={hasNext ? handleNext : undefined}
        onPrevious={hasPrevious ? handlePrevious : undefined}
        initialPosition={initialPosition}
      />
      <QuickClipButton
        currentTime={initialPosition}
        seriesTitle={series.title}
        episodeTitle={episode.title}
      />
    </Container>
  );
}

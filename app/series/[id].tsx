import React from 'react';
import { Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { HeroSection, HERO_HEIGHT, EpisodeList, StoryThreads } from '../../components/series';
import { useParallax } from '../../hooks/useParallax';
import { useHaptics } from '../../hooks/useHaptics';
import { getSeriesById } from '../../data/mockData';
import { colors, spacing } from '../../constants/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const BackButton = styled(Pressable)`
  position: absolute;
  top: ${spacing.md}px;
  left: ${spacing.md}px;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.glass};
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Content = styled.View`
  padding-bottom: ${spacing.xxl}px;
`;

const NotFoundContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NotFoundText = styled.Text`
  color: ${colors.textMuted};
  font-size: 18px;
`;

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lightImpact, success } = useHaptics();

  const series = getSeriesById(id || '');

  const { scrollHandler, parallaxStyle } = useParallax({
    imageHeight: HERO_HEIGHT,
  });

  if (!series) {
    return (
      <Container>
        <BackButton
          style={{ top: insets.top + spacing.sm }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </BackButton>
        <NotFoundContainer>
          <NotFoundText>Series not found</NotFoundText>
        </NotFoundContainer>
      </Container>
    );
  }

  const handlePlay = () => {
    lightImpact();
    const firstUnwatched = series.episodes.find((ep) => ep.progress < 100);
    const episodeToPlay = firstUnwatched || series.episodes[0];
    router.push(`/player/${episodeToPlay.id}?seriesId=${series.id}`);
  };

  const handleAddToList = () => {
    success();
  };

  const currentEpisode = series.episodes.find(
    (ep) => ep.progress > 0 && ep.progress < 100
  );

  return (
    <Container>
      <BackButton
        style={{ top: insets.top + spacing.sm }}
        onPress={() => {
          lightImpact();
          router.back();
        }}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </BackButton>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection
          series={series}
          parallaxStyle={parallaxStyle}
          onPlay={handlePlay}
          onAddToList={handleAddToList}
        />

        <Content>
          <EpisodeList
            episodes={series.episodes}
            seriesId={series.id}
            currentEpisodeId={currentEpisode?.id}
          />

          {series.relatedUniverses.length > 0 && (
            <StoryThreads relatedUniverseIds={series.relatedUniverses} />
          )}
        </Content>
      </Animated.ScrollView>
    </Container>
  );
}

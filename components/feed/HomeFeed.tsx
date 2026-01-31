import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../constants/theme';
import { getContinueWatching, getTrending, mockSeries } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';
import { FeedRow } from '../series/FeedRow';
import { HeroSection } from '../series/HeroSection';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Spacer = styled.View`
  height: 80px; 
`;

export const HomeFeed: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { lightImpact } = useHaptics();

  const continueWatching = getContinueWatching();
  const trending = getTrending();
  const allSeries = mockSeries;

  // Create mock categories
  const newReleases = [...mockSeries].reverse();
  const scifi = mockSeries.filter(s => s.tags.includes('Sci-Fi') || s.tags.includes('Action'));
  const drama = mockSeries.filter(s => s.tags.includes('Drama') || s.tags.includes('Thriller'));

  // Hero Item (Featured) - Just pick first trending for now
  const heroItem = trending.length > 0 ? trending[0] : mockSeries[0];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleHeroPlay = () => {
    lightImpact();
    // Play first episode of hero series
    if (heroItem.episodes.length > 0) {
      router.push({
        pathname: '/player/[episodeId]',
        params: { episodeId: heroItem.episodes[0].id, seriesId: heroItem.id }
      });
    }
  };

  const handleHeroAddToList = () => {
    lightImpact();
    // Dummy action
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]} // For Android
            progressViewOffset={40}
          />
        }
      >
        <HeroSection
          series={heroItem}
          parallaxStyle={{}} // Standard view for now
          onPlay={handleHeroPlay}
          onAddToList={handleHeroAddToList}
        />

        {continueWatching.length > 0 && (
          <FeedRow title="Continue Watching" data={continueWatching} />
        )}

        <FeedRow title="Trending Now" data={trending} />
        <FeedRow title="New Releases" data={newReleases} />
        <FeedRow title="Sci-Fi & Action" data={scifi} />
        <FeedRow title="Drama Movies" data={drama} />
        <FeedRow title="My List" data={allSeries.slice(0, 5)} />

        <Spacer />
      </ScrollView>
    </Container>
  );
};

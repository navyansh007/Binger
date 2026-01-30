import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import { VideoPreviewCard } from './VideoPreviewCard';
import { FeedSkeleton } from './FeedSkeleton';
import { useAutoplay } from '../../hooks/useAutoplay';
import { mockSeries, Series, getContinueWatching, getTrending } from '../../data/mockData';
import { colors, spacing, typography } from '../../constants/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const SectionHeader = styled.View`
  padding: ${spacing.md}px;
  padding-bottom: ${spacing.sm}px;
`;

const SectionTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
`;

const SectionSubtitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs}px;
`;

const CardWrapper = styled.View`
  padding-horizontal: ${spacing.md}px;
`;

interface FeedItem {
  id: string;
  type: 'header' | 'series';
  title?: string;
  subtitle?: string;
  series?: Series;
}

export const HomeFeed: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    visibleItems,
    viewabilityConfig,
    onViewableItemsChanged,
    isItemVisible,
  } = useAutoplay({ viewabilityThreshold: 60 });

  const continueWatching = getContinueWatching();
  const trending = getTrending();

  const feedData: FeedItem[] = [
    ...(continueWatching.length > 0
      ? [
          { id: 'header-continue', type: 'header' as const, title: 'Continue Watching', subtitle: 'Pick up where you left off' },
          ...continueWatching.map((s) => ({ id: `continue-${s.id}`, type: 'series' as const, series: s })),
        ]
      : []),
    { id: 'header-trending', type: 'header' as const, title: 'Trending Now', subtitle: 'What everyone is watching' },
    ...trending.map((s) => ({ id: `trending-${s.id}`, type: 'series' as const, series: s })),
    { id: 'header-all', type: 'header' as const, title: 'All Series', subtitle: 'Explore our collection' },
    ...mockSeries.map((s) => ({ id: `all-${s.id}`, type: 'series' as const, series: s })),
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const renderItem: ListRenderItem<FeedItem> = useCallback(
    ({ item, index }) => {
      if (item.type === 'header') {
        return (
          <SectionHeader>
            <SectionTitle>{item.title}</SectionTitle>
            {item.subtitle && <SectionSubtitle>{item.subtitle}</SectionSubtitle>}
          </SectionHeader>
        );
      }

      if (item.type === 'series' && item.series) {
        return (
          <CardWrapper>
            <VideoPreviewCard
              series={item.series}
              isVisible={isItemVisible(item.id)}
              index={index}
            />
          </CardWrapper>
        );
      }

      return null;
    },
    [isItemVisible]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  if (isLoading) {
    return (
      <Container>
        <FeedSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <FlatList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      />
    </Container>
  );
};

import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { PaywallModal } from '../../components/common/PaywallModal';
import { VideoPlayer } from '../../components/player';
import { colors } from '../../constants/theme';
import { useSubscription } from '../../context/SubscriptionContext';
import { getSeriesById } from '../../data/mockData';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const insets = useSafeAreaInsets();

  const { isPremium, subscribe } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);

  const series = getSeriesById(seriesId || '');
  const [activeEpisodeId, setActiveEpisodeId] = useState(episodeId || '');

  // If initial episodeId changes (deep link), update state
  useEffect(() => {
    if (episodeId && activeEpisodeId !== episodeId) {
      // This might need handling if user scrolls then deep links
    }
  }, [episodeId]);

  if (!series) {
    return (
      <NotFoundContainer>
        <NotFoundText>Series not found</NotFoundText>
      </NotFoundContainer>
    );
  }

  const episodes = series.episodes;
  const initialIndex = episodes.findIndex((ep) => ep.id === episodeId);
  const flatListRef = useRef<FlatList>(null);

  // Viewability config to track which video is visible
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0];
      if (visibleItem.item && visibleItem.isViewable) {
        const index = visibleItem.index ?? 0;

        // PAYWALL LOGIC: Index >= 2 (3rd video) and not premium
        if (index >= 2 && !isPremium) {
          setShowPaywall(true);
          // We keep the active ID so styling is correct, but play state will be false
        } else {
          setShowPaywall(false);
        }

        setActiveEpisodeId(visibleItem.item.id);
      }
    }
  }, [isPremium]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80, // Video must be 80% visible to assume focus
  }).current;

  // Handle Paywall Actions
  const handlePaywallClose = () => {
    // Go back to home if they decline
    router.replace('/(tabs)');
  };

  const handleSubscribe = async () => {
    await subscribe();
    setShowPaywall(false);
  };

  const renderItem = useCallback(({ item, index }: { item: typeof episodes[0]; index: number }) => {
    const isActive = item.id === activeEpisodeId;
    // Don't play if Paywall is showing for this item (or generally if paywall is up)
    const shouldPlay = isActive && !showPaywall;

    const initialPos = (item.progress / 100) * item.duration;

    return (
      <React.Fragment>
        <VideoPlayer
          videoUrl={item.videoUrl}
          title={series.title}
          episodeTitle={item.title}
          onClose={() => router.back()}
          initialPosition={initialPos}
          shouldPlay={shouldPlay}
          onNext={() => {
            if (index < episodes.length - 1) {
              flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
            }
          }}
          onPrevious={() => {
            if (index > 0) {
              flatListRef.current?.scrollToIndex({ index: index - 1, animated: true });
            }
          }}
        />
      </React.Fragment>
    );
  }, [activeEpisodeId, series.title, router, episodes.length, showPaywall]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: SCREEN_HEIGHT,
      offset: SCREEN_HEIGHT * index,
      index,
    }),
    []
  );

  const onLayout = useCallback(() => {
    if (initialIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
    }
  }, [initialIndex]);

  return (
    <Container>
      <StatusBar hidden style="light" />
      <FlatList
        ref={flatListRef}
        data={episodes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={initialIndex !== -1 ? initialIndex : 0}
        onLayout={onLayout}
        removeClippedSubviews={Platform.OS === 'android'}
        windowSize={3}
        maxToRenderPerBatch={2}
        scrollEnabled={!showPaywall} // Prevent scrolling while locked? Optional. User might want to scroll back up.
      // If we disable scrolling, they can't go back to free videos. Better allow scrolling but lock the premium ones. 
      // But the requirement says "Closing... modal will result in going back to home". Implies strict lock.
      // Let's keep scrolling enabled so they can go back to prev videos if they want, but the modal pops up if they stay on premium.
      />

      <PaywallModal
        visible={showPaywall}
        onClose={handlePaywallClose}
        onSubscribe={handleSubscribe}
      />
    </Container>
  );
}

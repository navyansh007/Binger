import { useCallback, useRef, useState } from 'react';
import { ViewToken } from 'react-native';

interface UseAutoplayOptions {
  viewabilityThreshold?: number;
}

export const useAutoplay = (options: UseAutoplayOptions = {}) => {
  const { viewabilityThreshold = 50 } = options;
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const viewabilityConfigRef = useRef({
    itemVisiblePercentThreshold: viewabilityThreshold,
    minimumViewTime: 300,
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visibleIds = viewableItems
        .filter((item) => item.isViewable)
        .map((item) => item.item?.id || item.key || '');
      setVisibleItems(visibleIds);
    },
    []
  );

  const isItemVisible = useCallback(
    (itemId: string) => visibleItems.includes(itemId),
    [visibleItems]
  );

  const getFirstVisibleItem = useCallback(() => {
    return visibleItems[0] || null;
  }, [visibleItems]);

  return {
    visibleItems,
    viewabilityConfig: viewabilityConfigRef.current,
    onViewableItemsChanged,
    isItemVisible,
    getFirstVisibleItem,
  };
};

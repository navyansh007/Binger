import { useAnimatedScrollHandler, useSharedValue, interpolate, useAnimatedStyle, Extrapolation } from 'react-native-reanimated';

interface UseParallaxOptions {
  imageHeight: number;
  parallaxFactor?: number;
}

export const useParallax = ({ imageHeight, parallaxFactor = 0.5 }: UseParallaxOptions) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const parallaxStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-imageHeight, 0, imageHeight],
      [-imageHeight * parallaxFactor, 0, imageHeight * parallaxFactor],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [-imageHeight, 0],
      [1.5, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, imageHeight * 0.5],
      [0, 0.8],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [imageHeight * 0.3, imageHeight * 0.6],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  return {
    scrollY,
    scrollHandler,
    parallaxStyle,
    overlayStyle,
    headerOpacity,
  };
};

import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { colors, typography } from '../../constants/theme';

const Container = styled(LinearGradient).attrs({
    colors: [colors.background, colors.primary],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled(Animated.Text)`
  font-family: ${typography.fontFamily.headerBold};
  font-size: 56px;
  color: ${colors.accent};
  letter-spacing: 4px;
`;

const Subtitle = styled(Animated.Text)`
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
  color: ${colors.textSecondary};
  margin-top: 10px;
  letter-spacing: 2px;
`;

export default function SplashScreen() {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);
    const subtitleOpacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 1000 });
        scale.value = withSpring(1);
        subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    const subtitleStyle = useAnimatedStyle(() => {
        return {
            opacity: subtitleOpacity.value,
        };
    });

    return (
        <Container>
            <View>
                <LogoText style={animatedStyle}>
                    BINGER
                </LogoText>
                <Subtitle style={subtitleStyle}>
                    UNLIMITED ENTERTAINMENT
                </Subtitle>
            </View>
        </Container>
    );
}

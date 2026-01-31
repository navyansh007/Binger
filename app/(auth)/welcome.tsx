import { LinearGradient } from 'expo-linear-gradient';
import { Href, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { colors, spacing, typography } from '../../constants/theme';

const BackgroundImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

const ContentContainer = styled(LinearGradient).attrs({
    colors: ['transparent', colors.background, colors.background],
    locations: [0, 0.6, 1],
})`
  padding: ${spacing.xl}px;
  padding-bottom: ${spacing.xxl}px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${typography.fontFamily.headerBold};
  font-size: 42px;
  color: ${colors.text};
  text-align: center;
  margin-bottom: ${spacing.sm}px;
`;

const Subtitle = styled.Text`
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.lg}px;
  color: ${colors.textSecondary};
  text-align: center;
  margin-bottom: ${spacing.xl}px;
  line-height: 24px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: ${spacing.md}px;
`;

// Mock Hero Image URL - in real app use local asset or optimize
const HERO_IMAGE = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <BackgroundImage source={{ uri: HERO_IMAGE }} resizeMode="cover">
            <ContentContainer>
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 1000 }}
                >
                    <Title>BINGER</Title>
                    <Subtitle>
                        Stream unlimited movies, series, and originals anytime, anywhere.
                    </Subtitle>
                </MotiView>

                <ButtonContainer>
                    <PremiumButton
                        title="Get Started"
                        onPress={() => router.push('/(auth)/signup' as Href)}
                        variant="primary"
                    />

                    <PremiumButton
                        title="I have an account"
                        onPress={() => router.push('/(auth)/login' as Href)}
                        variant="outline"
                    />
                </ButtonContainer>
            </ContentContainer>
        </BackgroundImage>
    );
}

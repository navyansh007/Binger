import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { HapticButton } from '../ui/HapticButton';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Series } from '../../data/mockData';
import { formatRating } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const HERO_HEIGHT = SCREEN_WIDTH * 1.2;

interface HeroSectionProps {
  series: Series;
  parallaxStyle: any;
  onPlay: () => void;
  onAddToList: () => void;
}

const Container = styled.View`
  height: ${HERO_HEIGHT}px;
  overflow: hidden;
`;

const HeroImage = styled(Animated.createAnimatedComponent(Image))`
  width: ${SCREEN_WIDTH}px;
  height: ${HERO_HEIGHT}px;
`;

const GradientOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
`;

const ContentContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.lg}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxxl}px;
  margin-bottom: ${spacing.sm}px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  margin-bottom: ${spacing.md}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

const RatingText = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.md}px;
`;

const Duration = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${spacing.sm}px;
  margin-bottom: ${spacing.md}px;
`;

const Tag = styled.View`
  background-color: ${colors.glass};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${borderRadius.sm}px;
`;

const TagText = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

const Description = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  line-height: ${typography.fontSize.md * typography.lineHeight.relaxed}px;
  margin-bottom: ${spacing.lg}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

const PlayButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const PlayButtonText = styled.Text`
  color: ${colors.primary};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.lg}px;
`;

const ListButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const ListButtonText = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.md}px;
`;

export const HeroSection: React.FC<HeroSectionProps> = ({
  series,
  parallaxStyle,
  onPlay,
  onAddToList,
}) => {
  return (
    <Container>
      <HeroImage
        source={{ uri: series.thumbnail }}
        contentFit="cover"
        style={[parallaxStyle, StyleSheet.absoluteFill]}
      />

      <GradientOverlay
        colors={['transparent', colors.primary + 'AA', colors.background]}
        locations={[0, 0.4, 1]}
      />

      <ContentContainer>
        <Title>{series.title}</Title>

        <MetaRow>
          <RatingContainer>
            <Ionicons name="star" size={16} color={colors.accent} />
            <RatingText>{formatRating(series.rating)}</RatingText>
          </RatingContainer>
          <Duration>{series.totalDuration}</Duration>
          <Duration>{series.episodeCount} Episodes</Duration>
        </MetaRow>

        <TagsContainer>
          {series.tags.map((tag) => (
            <Tag key={tag}>
              <TagText>{tag}</TagText>
            </Tag>
          ))}
        </TagsContainer>

        <Description numberOfLines={3}>{series.description}</Description>

        <ButtonRow>
          <HapticButton onPress={onPlay} variant="primary" hapticType="medium">
            <PlayButtonContent>
              <Ionicons name="play" size={20} color={colors.primary} />
              <PlayButtonText>Play</PlayButtonText>
            </PlayButtonContent>
          </HapticButton>

          <HapticButton onPress={onAddToList} variant="ghost" hapticType="light">
            <ListButtonContent>
              <Ionicons name="add" size={20} color={colors.text} />
              <ListButtonText>My List</ListButtonText>
            </ListButtonContent>
          </HapticButton>
        </ButtonRow>
      </ContentContainer>
    </Container>
  );
};

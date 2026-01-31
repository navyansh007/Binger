import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { Series } from '../../data/mockData';
import { useHaptics } from '../../hooks/useHaptics';

interface ThumbnailCardProps {
    series: Series;
    isLarge?: boolean; // For "Trending" or "Originals" which might be larger
}

// Portrait Aspect Ratio (2:3 approx)
const CARD_WIDTH = 110;
const CARD_HEIGHT = 160;

const Container = styled(Pressable)`
  margin-right: ${spacing.sm}px;
  width: ${CARD_WIDTH}px;
`;

const CardImage = styled(Image) <{ isLarge?: boolean }>`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${borderRadius.sm}px;
  background-color: ${colors.card};
`;

const TagsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${spacing.xs}px;
`;

const TagText = styled.Text`
  color: ${colors.textMuted};
  font-size: 10px;
  font-family: ${typography.fontFamily.body};
`;

const NewBadge = styled.View`
  position: absolute;
  top: 4px;
  left: 0;
  background-color: ${colors.primary};
  padding-horizontal: 6px;
  padding-vertical: 2px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const NewText = styled.Text`
  color: ${colors.background};
  font-size: 8px;
  font-weight: bold;
`;

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ series, isLarge }) => {
    const router = useRouter();
    const { lightImpact } = useHaptics();

    const handlePress = () => {
        lightImpact();
        router.push({
            pathname: '/series/[id]',
            params: { id: series.id },
        });
    };

    const isNew = Math.random() < 0.3; // Mock "New" label

    return (
        <Container onPress={handlePress}>
            <CardImage
                source={{ uri: series.thumbnail }}
                contentFit="cover"
                transition={200}
            />
            {isNew && (
                <NewBadge>
                    <NewText>NEW EPISODE</NewText>
                </NewBadge>
            )}
        </Container>
    );
};

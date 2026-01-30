import React from 'react';
import { Dimensions, View } from 'react-native';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { SkeletonLoader } from '../ui/SkeletonLoader';
import { spacing, borderRadius } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - spacing.md * 2;
const CARD_HEIGHT = CARD_WIDTH * (9 / 16);

const Container = styled.View`
  padding: ${spacing.md}px;
`;

const CardSkeleton = styled.View`
  margin-bottom: ${spacing.md}px;
`;

const ContentArea = styled.View`
  position: absolute;
  bottom: ${spacing.md}px;
  left: ${spacing.md}px;
  right: ${spacing.md}px;
`;

const MetaRow = styled.View`
  flex-direction: row;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.sm}px;
`;

export const FeedSkeleton: React.FC = () => {
  return (
    <Container>
      {[0, 1, 2].map((index) => (
        <MotiView
          key={index}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 300, delay: index * 100 }}
        >
          <CardSkeleton>
            <SkeletonLoader
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              borderRadius={borderRadius.lg}
            />
            <ContentArea>
              <SkeletonLoader width={180} height={24} borderRadius={borderRadius.sm} />
              <MetaRow>
                <SkeletonLoader width={80} height={16} borderRadius={borderRadius.sm} />
                <SkeletonLoader width={60} height={16} borderRadius={borderRadius.sm} />
                <SkeletonLoader width={60} height={16} borderRadius={borderRadius.sm} />
              </MetaRow>
            </ContentArea>
          </CardSkeleton>
        </MotiView>
      ))}
    </Container>
  );
};

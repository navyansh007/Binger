import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../../constants/theme';
import { Series } from '../../data/mockData';
import { ThumbnailCard } from './ThumbnailCard';

interface FeedRowProps {
    title: string;
    data: Series[];
}

const Container = styled.View`
  margin-bottom: ${spacing.lg}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.lg}px;
  font-weight: 700;
  margin-left: ${spacing.md}px;
  margin-bottom: ${spacing.sm}px;
  letter-spacing: 0.5px;
`;

export const FeedRow: React.FC<FeedRowProps> = ({ title, data }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <FlatList
                horizontal
                data={data}
                renderItem={({ item }) => <ThumbnailCard series={item} />}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.md }}
            />
        </Container>
    );
};

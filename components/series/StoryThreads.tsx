import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { getSeriesById, Series } from '../../data/mockData';

interface StoryThreadsProps {
  relatedUniverseIds: string[];
}

const Container = styled.View`
  margin-top: ${spacing.xl}px;
  padding-horizontal: ${spacing.lg}px;
`;

const Header = styled.View`
  margin-bottom: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
`;

const Subtitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs}px;
`;

const ThreadsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${spacing.lg}px;
`;

const ThreadNode = styled(Pressable)`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.full}px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${colors.cardBorder};
`;

const NodeImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ConnectionLine = styled.View`
  height: 2px;
  width: 40px;
  background-color: ${colors.cardBorder};
`;

const GlowEffect = styled(MotiView)`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: ${borderRadius.full}px;
  top: -5px;
  left: -5px;
`;

const NodeContainer = styled.View`
  align-items: center;
`;

const NodeTitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs}px;
  margin-top: ${spacing.sm}px;
  text-align: center;
  max-width: 80px;
`;

export const StoryThreads: React.FC<StoryThreadsProps> = ({
  relatedUniverseIds,
}) => {
  const router = useRouter();
  const { lightImpact } = useHaptics();

  const relatedSeries = relatedUniverseIds
    .map((id) => getSeriesById(id))
    .filter((s): s is Series => s !== undefined);

  if (relatedSeries.length === 0) return null;

  const handleNodePress = (series: Series) => {
    lightImpact();
    router.push(`/series/${series.id}`);
  };

  return (
    <Container>
      <Header>
        <Title>Connected Universe</Title>
        <Subtitle>Explore related stories</Subtitle>
      </Header>

      <ThreadsContainer>
        {relatedSeries.map((series, index) => (
          <React.Fragment key={series.id}>
            {index > 0 && <ConnectionLine />}
            <NodeContainer>
              <View style={{ position: 'relative' }}>
                <GlowEffect
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 0.7 }}
                  transition={{
                    type: 'timing',
                    duration: 2000,
                    loop: true,
                  }}
                  style={{
                    backgroundColor: colors.accent,
                    ...shadows.glow,
                  }}
                />
                <MotiView
                  from={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    delay: index * 150,
                    damping: 15,
                  }}
                >
                  <ThreadNode onPress={() => handleNodePress(series)}>
                    <NodeImage
                      source={{ uri: series.thumbnail }}
                      contentFit="cover"
                      transition={200}
                    />
                  </ThreadNode>
                </MotiView>
              </View>
              <NodeTitle numberOfLines={2}>{series.title}</NodeTitle>
            </NodeContainer>
          </React.Fragment>
        ))}
      </ThreadsContainer>
    </Container>
  );
};

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { ThumbnailCard } from '../../components/series/ThumbnailCard';
import { HapticButton } from '../../components/ui/HapticButton';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { mockSeries } from '../../data/mockData';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: ${spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xl}px;
`;

const Subtitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

const StatsGrid = styled.View`
  flex-direction: row;
  padding: ${spacing.md}px;
  gap: ${spacing.md}px;
`;

const StatCard = styled.View`
  flex: 1;
  background-color: ${colors.card};
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
  align-items: center;
`;

const StatValue = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xl}px;
  margin-bottom: 4px;
`;

const StatLabel = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: 12px;
`;

const SectionTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.lg}px;
  margin: ${spacing.md}px;
  margin-bottom: ${spacing.sm}px;
`;

const UploadFAB = styled.TouchableOpacity`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${colors.accent};
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(229, 9, 20, 0.4);
`;

const VideoGrid = styled.View`
  padding-horizontal: ${spacing.md}px;
`;

export default function CreatorDashboard() {
    const router = useRouter();
    const { user } = useAuth();

    // Mock uploaded videos (using existing mock data for demo)
    const myVideos = mockSeries.slice(0, 4);

    return (
        <Container edges={['top']}>
            <Header>
                <View>
                    <Title>Creator Studio</Title>
                    <Subtitle>Welcome back, {user?.name}</Subtitle>
                </View>
                <HapticButton onPress={() => router.back()} variant="ghost" size="sm">
                    <Ionicons name="close" size={24} color={colors.text} />
                </HapticButton>
            </Header>

            <FlatList
                data={myVideos}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ListHeaderComponent={
                    <>
                        <StatsGrid>
                            <StatCard>
                                <StatValue>12.5K</StatValue>
                                <StatLabel>Total Views</StatLabel>
                            </StatCard>
                            <StatCard>
                                <StatValue>854</StatValue>
                                <StatLabel>Subscribers</StatLabel>
                            </StatCard>
                            <StatCard>
                                <StatValue>{myVideos.length}</StatValue>
                                <StatLabel>Videos</StatLabel>
                            </StatCard>
                        </StatsGrid>
                        <SectionTitle>Your Content</SectionTitle>
                    </>
                }
                renderItem={({ item }) => (
                    <View style={{ flex: 1, aspectRatio: 2 / 3, padding: 4, maxWidth: '33%' }}>
                        <ThumbnailCard series={item} />
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <UploadFAB onPress={() => router.push('/(creator)/upload')}>
                <Ionicons name="add" size={30} color={colors.background} />
            </UploadFAB>
        </Container>
    );
}

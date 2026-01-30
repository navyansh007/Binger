import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { VideoPreviewCard } from '../../components/feed';
import { getContinueWatching } from '../../data/mockData';
import { colors, spacing, typography } from '../../constants/theme';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxl}px;
`;

const Subtitle = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  margin-top: ${spacing.xs}px;
`;

const Content = styled.View`
  flex: 1;
  padding-horizontal: ${spacing.md}px;
`;

const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${colors.card};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

const EmptyTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
  margin-bottom: ${spacing.sm}px;
`;

const EmptyText = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  text-align: center;
  max-width: 280px;
`;

export default function MyListScreen() {
  const myList = getContinueWatching();

  return (
    <Container edges={['top']}>
      <Header>
        <Title>My List</Title>
        <Subtitle>{myList.length} series in your list</Subtitle>
      </Header>

      <Content>
        {myList.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Ionicons name="bookmark-outline" size={36} color={colors.textMuted} />
            </EmptyIcon>
            <EmptyTitle>Your list is empty</EmptyTitle>
            <EmptyText>
              Add series to your list to keep track of what you want to watch
            </EmptyText>
          </EmptyState>
        ) : (
          <FlatList
            data={myList}
            renderItem={({ item, index }) => (
              <VideoPreviewCard series={item} isVisible={false} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </Content>
    </Container>
  );
}

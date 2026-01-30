import React, { useState } from 'react';
import { FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { VideoPreviewCard } from '../../components/feed';
import { mockSeries, Series } from '../../data/mockData';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

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
  margin-bottom: ${spacing.md}px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.card};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  margin-left: ${spacing.sm}px;
  padding-vertical: ${spacing.xs}px;
`;

const ResultsContainer = styled.View`
  flex: 1;
  padding-horizontal: ${spacing.md}px;
`;

const NoResults = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoResultsText = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.lg}px;
`;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSeries = searchQuery.length > 0
    ? mockSeries.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <Container edges={['top']}>
      <Header>
        <Title>Search</Title>
        <SearchContainer>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <SearchInput
            placeholder="Search series, genres..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textMuted}
              onPress={() => setSearchQuery('')}
            />
          )}
        </SearchContainer>
      </Header>

      <ResultsContainer>
        {searchQuery.length === 0 ? (
          <NoResults>
            <Ionicons name="search" size={48} color={colors.textMuted} />
            <NoResultsText>Search for your favorite series</NoResultsText>
          </NoResults>
        ) : filteredSeries.length === 0 ? (
          <NoResults>
            <Ionicons name="film-outline" size={48} color={colors.textMuted} />
            <NoResultsText>No results found</NoResultsText>
          </NoResults>
        ) : (
          <FlatList
            data={filteredSeries}
            renderItem={({ item, index }) => (
              <VideoPreviewCard series={item} isVisible={false} index={index} />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </ResultsContainer>
    </Container>
  );
}

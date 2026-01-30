import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { HomeFeed } from '../../components/feed';
import { colors, spacing, typography } from '../../constants/theme';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: ${spacing.md}px;
  padding-top: ${spacing.sm}px;
`;

const Logo = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxl}px;
  letter-spacing: 2px;
`;

export default function HomeScreen() {
  return (
    <Container edges={['top']}>
      <Header>
        <Logo>BINGER</Logo>
      </Header>
      <HomeFeed />
    </Container>
  );
}

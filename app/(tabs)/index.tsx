import React from 'react';
import styled from 'styled-components/native';
import { HomeFeed } from '../../components/feed';
import { colors, spacing, typography } from '../../constants/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: ${spacing.md}px;
  padding-top: ${spacing.xl}px; /* Add padding for status bar */
`;

const Logo = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxl}px;
  letter-spacing: 2px;
  text-shadow: 0px 2px 4px rgba(0,0,0,0.5);
`;

export default function HomeScreen() {
  return (
    <Container>
      <Header>
        <Logo>BINGER</Logo>
      </Header>
      <HomeFeed />
    </Container>
  );
}

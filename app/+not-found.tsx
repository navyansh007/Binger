import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { colors, spacing, typography } from '../constants/theme';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${spacing.lg}px;
  background-color: ${colors.background};
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
  margin-top: ${spacing.md}px;
`;

const LinkText = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.md}px;
  margin-top: ${spacing.lg}px;
`;

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found', headerShown: false }} />
      <Container>
        <Ionicons name="alert-circle-outline" size={64} color={colors.textMuted} />
        <Title>Screen not found</Title>
        <Link href="/">
          <LinkText>Go to home</LinkText>
        </Link>
      </Container>
    </>
  );
}

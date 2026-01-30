import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import styled from 'styled-components/native';
import { colors, borderRadius } from '../../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  intensity?: number;
  style?: ViewStyle;
  tint?: 'light' | 'dark' | 'default';
}

const CardContainer = styled.View<{ style?: ViewStyle }>`
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.cardBorder};
`;

const ContentWrapper = styled.View`
  padding: 16px;
`;

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 50,
  style,
  tint = 'dark',
}) => {
  return (
    <CardContainer style={style}>
      <BlurView intensity={intensity} tint={tint} style={styles.blur}>
        <ContentWrapper>{children}</ContentWrapper>
      </BlurView>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    backgroundColor: colors.glass,
  },
});

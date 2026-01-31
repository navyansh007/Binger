import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { HapticButton } from './HapticButton';

interface PremiumButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    style?: ViewStyle;
}

const ButtonContainer = styled.View<{ variant: string }>`
  height: 50px;
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: ${(props: { variant: string }) => props.variant === 'outline' ? '1px' : '0px'};
  border-color: ${colors.accent};
  background-color: ${(props: { variant: string }) => props.variant === 'ghost' ? 'transparent' : 'transparent'};
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const SolidBackground = styled.View<{ variant: string }>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props: { variant: string }) => props.variant === 'outline' ? 'rgba(0,0,0,0.3)' : 'transparent'};
  gap: ${spacing.sm}px;
`;

const ButtonText = styled.Text<{ variant: string }>`
  color: ${(props: { variant: string }) => props.variant === 'primary' ? colors.background : colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.md}px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const PremiumButton: React.FC<PremiumButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
    style,
}) => {
    const isPrimary = variant === 'primary';

    const content = (
        <>
            {loading ? (
                <ActivityIndicator color={isPrimary ? colors.background : colors.accent} />
            ) : (
                <>
                    {icon && (
                        <Ionicons
                            name={icon}
                            size={20}
                            color={isPrimary ? colors.background : colors.text}
                        />
                    )}
                    <ButtonText variant={variant}>{title}</ButtonText>
                </>
            )}
        </>
    );

    return (
        <HapticButton
            onPress={onPress}
            disabled={disabled || loading}
            style={style}
            hapticType="medium"
            variant="ghost" // We handle visual styling internally
        >
            <ButtonContainer variant={variant}>
                {isPrimary ? (
                    <GradientBackground
                        colors={[colors.accent, '#FFD700', colors.accent]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.5, 1]}
                    >
                        {content}
                    </GradientBackground>
                ) : (
                    <SolidBackground variant={variant}>
                        {content}
                    </SolidBackground>
                )}
            </ButtonContainer>
        </HapticButton>
    );
};

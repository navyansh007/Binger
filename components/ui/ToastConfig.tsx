import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { ToastConfig } from 'react-native-toast-message';
import styled from 'styled-components/native';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';

// Styled Components for Custom Toasts
const ToastContainer = styled.View`
  width: 90%;
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
`;

const GlassBackground = styled(BlurView)`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.md}px;
  background-color: rgba(20, 20, 20, 0.8); 
`;

const IconContainer = styled.View<{ color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${(props: { color: string }) => props.color}20; /* 20% opacity */
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.md}px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Message = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  line-height: 18px;
`;

interface CustomToastProps {
    text1?: string;
    text2?: string;
    type: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<CustomToastProps> = ({ text1, text2, type }) => {
    let iconName: keyof typeof Ionicons.glyphMap = 'information';
    let color = colors.accent;

    if (type === 'success') {
        iconName = 'checkmark';
        color = '#4ADE80'; // Green
    } else if (type === 'error') {
        iconName = 'alert';
        color = '#F87171'; // Red
    }

    return (
        <ToastContainer>
            <GlassBackground intensity={30} tint="dark">
                <IconContainer color={color}>
                    <Ionicons name={iconName} size={20} color={color} />
                </IconContainer>
                <TextContainer>
                    {text1 && <Title>{text1}</Title>}
                    {text2 && <Message>{text2}</Message>}
                </TextContainer>
            </GlassBackground>
        </ToastContainer>
    );
};

export const toastConfig: ToastConfig = {
    success: (props) => <CustomToast {...props} type="success" />,
    error: (props) => <CustomToast {...props} type="error" />,
    info: (props) => <CustomToast {...props} type="info" />,
};

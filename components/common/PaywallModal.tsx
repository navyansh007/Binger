import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import styled from 'styled-components/native';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface PaywallModalProps {
    visible: boolean;
    onClose: () => void;
    onSubscribe: () => Promise<void>;
}

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContainer = styled.View`
  width: 85%;
  background-color: ${colors.card};
  border-radius: ${borderRadius.lg}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.accent};
  padding: ${spacing.xl}px;
  align-items: center;
`;

const IconContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgba(255, 215, 0, 0.1); /* Gold tint */
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xl}px;
  text-align: center;
  margin-bottom: ${spacing.sm}px;
`;

const Description = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  text-align: center;
  margin-bottom: ${spacing.xl}px;
  line-height: 22px;
`;

const SubscribeButton = styled.Pressable`
  width: 100%;
  height: 50px;
  background-color: ${colors.accent};
  border-radius: ${borderRadius.md}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: ${colors.background};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.md}px;
  font-weight: 600;
`;

const CloseButton = styled.Pressable`
  margin-top: ${spacing.md}px;
  padding: ${spacing.sm}px;
`;

const CloseText = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

export const PaywallModal: React.FC<PaywallModalProps> = ({ visible, onClose, onSubscribe }) => {
    const [loading, setLoading] = useState(false);
    const { success, error: hapticError } = useHaptics();

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            await onSubscribe();
            success();
            // Modal should close locally or via parent updating 'visible'
        } catch (e) {
            hapticError();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Overlay>
                <ModalContainer>
                    <IconContainer>
                        <Ionicons name="diamond" size={40} color={colors.accent} />
                    </IconContainer>

                    <Title>Unlock Full Access</Title>
                    <Description>
                        You've watched your free episodes. Subscribe now to continue the story and unlock unlimited content.
                    </Description>

                    <SubscribeButton onPress={handleSubscribe} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color={colors.background} />
                        ) : (
                            <>
                                <ButtonText>Subscribe for $4.99</ButtonText>
                            </>
                        )}
                    </SubscribeButton>

                    {!loading && (
                        <CloseButton onPress={onClose}>
                            <CloseText>Maybe Later</CloseText>
                        </CloseButton>
                    )}

                </ModalContainer>
            </Overlay>
        </Modal>
    );
};

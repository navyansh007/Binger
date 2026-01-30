import React, { useState } from 'react';
import { Modal, Pressable, Share, View } from 'react-native';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { HapticButton } from '../ui/HapticButton';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { formatDuration } from '../../utils/formatters';

interface QuickClipButtonProps {
  currentTime: number;
  seriesTitle: string;
  episodeTitle: string;
}

const FloatingButton = styled(Pressable)`
  position: absolute;
  right: ${spacing.md}px;
  bottom: 120px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.accent};
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.overlay};
`;

const ModalContent = styled(MotiView)`
  width: 90%;
  max-width: 340px;
  border-radius: ${borderRadius.xl}px;
  overflow: hidden;
`;

const BlurContainer = styled(BlurView)`
  padding: ${spacing.lg}px;
`;

const ModalTitle = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.header};
  font-size: ${typography.fontSize.xl}px;
  text-align: center;
  margin-bottom: ${spacing.md}px;
`;

const ClipInfo = styled.View`
  background-color: ${colors.glass};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
`;

const ClipRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

const ClipLabel = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

const ClipValue = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

const ShareOption = styled(Pressable)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  background-color: ${colors.glass};
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
`;

const ShareText = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
`;

const CloseButton = styled(Pressable)`
  position: absolute;
  top: ${spacing.md}px;
  right: ${spacing.md}px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const QuickClipButton: React.FC<QuickClipButtonProps> = ({
  currentTime,
  seriesTitle,
  episodeTitle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { success, lightImpact } = useHaptics();

  const clipStart = Math.max(0, currentTime - 30);
  const clipEnd = currentTime + 30;

  const handlePress = () => {
    lightImpact();
    setIsModalVisible(true);
  };

  const handleShare = async () => {
    success();
    try {
      await Share.share({
        message: `Check out this clip from "${seriesTitle}" - ${episodeTitle} (${formatDuration(Math.floor(clipStart))} - ${formatDuration(Math.floor(clipEnd))})`,
        title: `${seriesTitle} Clip`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
    setIsModalVisible(false);
  };

  const handleCopyLink = () => {
    success();
    setIsModalVisible(false);
  };

  return (
    <>
      <FloatingButton onPress={handlePress}>
        <Ionicons name="cut" size={24} color={colors.primary} />
      </FloatingButton>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <ModalOverlay>
          <ModalContent
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <BlurContainer intensity={80} tint="dark">
              <CloseButton onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </CloseButton>

              <ModalTitle>Share Clip</ModalTitle>

              <ClipInfo>
                <ClipRow>
                  <ClipLabel>Series</ClipLabel>
                  <ClipValue numberOfLines={1}>{seriesTitle}</ClipValue>
                </ClipRow>
                <ClipRow>
                  <ClipLabel>Episode</ClipLabel>
                  <ClipValue numberOfLines={1}>{episodeTitle}</ClipValue>
                </ClipRow>
                <ClipRow>
                  <ClipLabel>Duration</ClipLabel>
                  <ClipValue>60 seconds</ClipValue>
                </ClipRow>
                <ClipRow style={{ marginBottom: 0 }}>
                  <ClipLabel>Time Range</ClipLabel>
                  <ClipValue>
                    {formatDuration(Math.floor(clipStart))} - {formatDuration(Math.floor(clipEnd))}
                  </ClipValue>
                </ClipRow>
              </ClipInfo>

              <ButtonRow>
                <ShareOption onPress={handleCopyLink}>
                  <Ionicons name="link" size={20} color={colors.text} />
                  <ShareText>Copy Link</ShareText>
                </ShareOption>

                <ShareOption onPress={handleShare}>
                  <Ionicons name="share-social" size={20} color={colors.text} />
                  <ShareText>Share</ShareText>
                </ShareOption>
              </ButtonRow>
            </BlurContainer>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

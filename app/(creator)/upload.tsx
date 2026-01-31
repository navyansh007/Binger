import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.cardBorder};
`;

const BackButton = styled.TouchableOpacity`
  padding: ${spacing.sm}px;
  margin-right: ${spacing.sm}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xl}px;
`;

const Content = styled.ScrollView`
  padding: ${spacing.lg}px;
`;

const Section = styled.View`
  margin-bottom: ${spacing.xl}px;
`;

const Label = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.sm}px;
  margin-bottom: ${spacing.xs}px;
`;

const InputWrapper = styled.View`
  background-color: ${colors.card};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
`;

const StyledInput = styled(TextInput)`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
`;

const UploadBox = styled.TouchableOpacity`
  height: 200px;
  background-color: ${colors.card};
  border-radius: ${borderRadius.lg}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
  border-style: dashed;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md}px;
`;

const MockProgressBar = styled.View<{ progress: number }>`
  height: 6px;
  width: ${props => props.progress}%;
  background-color: ${colors.accent};
  border-radius: 3px;
`;

const ProgressContainer = styled.View`
  height: 6px;
  width: 100%;
  background-color: ${colors.cardBorder};
  border-radius: 3px;
  overflow: hidden;
  margin-top: ${spacing.md}px;
`;

export default function UploadVideoScreen() {
    const router = useRouter();
    const { success, error: hapticError, selection } = useHaptics();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePickVideo = () => {
        setVideoFile('my_awesome_video.mp4');
        selection();
    };

    const handleUpload = async () => {
        if (!title || !videoFile) {
            hapticError();
            Toast.show({
                type: 'error',
                text1: 'Incomplete',
                text2: 'Please add title and select a video.',
            });
            return;
        }

        setUploading(true);
        let currentProgress = 0;

        // Simulate upload
        const interval = setInterval(() => {
            currentProgress += Math.random() * 10;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);

                success();
                Toast.show({
                    type: 'success',
                    text1: 'Upload Complete',
                    text2: 'Your video is now live!',
                });
                router.back();
            }
            setProgress(currentProgress);
        }, 300);
    };

    return (
        <Container edges={['top']}>
            <Header>
                <BackButton onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </BackButton>
                <Title>Upload Video</Title>
            </Header>

            <Content>
                <Section>
                    <Label>Video File</Label>
                    <UploadBox onPress={handlePickVideo}>
                        <Ionicons
                            name={videoFile ? "videocam" : "cloud-upload"}
                            size={48}
                            color={videoFile ? colors.accent : colors.textMuted}
                        />
                        <Label>{videoFile || "Tap to select video"}</Label>
                    </UploadBox>
                </Section>

                <Section>
                    <Label>Title</Label>
                    <InputWrapper>
                        <StyledInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Video Title"
                            placeholderTextColor={colors.textMuted}
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Description</Label>
                    <InputWrapper>
                        <StyledInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="What's this video about?"
                            placeholderTextColor={colors.textMuted}
                            multiline
                            numberOfLines={3}
                        />
                    </InputWrapper>
                </Section>

                {uploading && (
                    <Section>
                        <Label>Uploading... {Math.round(progress)}%</Label>
                        <ProgressContainer>
                            <MockProgressBar progress={progress} />
                        </ProgressContainer>
                    </Section>
                )}

                <PremiumButton
                    title={uploading ? "Uploading..." : "Publish Video"}
                    onPress={handleUpload}
                    loading={uploading}
                    icon="cloud-upload-outline"
                />
            </Content>
        </Container>
    );
}

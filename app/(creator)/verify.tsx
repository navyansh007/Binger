import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
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

const FilePicker = styled.TouchableOpacity`
  background-color: ${colors.card};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.lg}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
  border-style: dashed;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
`;

const FileText = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
`;

const InfoBox = styled.View`
  background-color: ${colors.accent}20;
  padding: ${spacing.md}px;
  border-radius: ${borderRadius.md}px;
  border-left-width: 4px;
  border-left-color: ${colors.accent};
  margin-bottom: ${spacing.lg}px;
`;

const InfoText = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
`;

export default function VerifyCreatorScreen() {
    const router = useRouter();
    const { upgradeToCreator, user } = useAuth();
    const { success, error: hapticError } = useHaptics();

    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState('');
    const [idProof, setIdProof] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePickFile = () => {
        // Mock file pick
        setIdProof('id_proof_doc.pdf');
        Toast.show({
            type: 'success',
            text1: 'File Selected',
            text2: 'id_proof_doc.pdf attached successfully.',
        });
    };

    const handleSubmit = async () => {
        if (!name || !bio || !idProof) {
            hapticError();
            Toast.show({
                type: 'error',
                text1: 'Incomplete Form',
                text2: 'Please fill name, bio and upload ID proof.',
            });
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            await upgradeToCreator({ name, bio });
            success();
            Toast.show({
                type: 'success',
                text1: 'Verification Successful',
                text2: 'Welcome to the Binger Creator Program!',
            });

            router.replace('/(creator)/dashboard');
        } catch (e) {
            hapticError();
            Toast.show({
                type: 'error',
                text1: 'Verification Failed',
                text2: 'Something went wrong. Try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container edges={['top']}>
            <Header>
                <BackButton onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </BackButton>
                <Title>Become a Creator</Title>
            </Header>

            <Content showsVerticalScrollIndicator={false}>
                <InfoBox>
                    <InfoText>
                        Start your journey as a Binger Creator. Upload your ID to get verified instantly and start sharing your stories with the world.
                    </InfoText>
                </InfoBox>

                <Section>
                    <Label>Creator Name</Label>
                    <InputWrapper>
                        <StyledInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Display Name"
                            placeholderTextColor={colors.textMuted}
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Bio / About</Label>
                    <InputWrapper>
                        <StyledInput
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Tell us about yourself..."
                            placeholderTextColor={colors.textMuted}
                            multiline
                            numberOfLines={4}
                            style={{ height: 80, textAlignVertical: 'top' }}
                        />
                    </InputWrapper>
                </Section>

                <Section>
                    <Label>Identity Proof (Govt ID)</Label>
                    <FilePicker onPress={handlePickFile}>
                        <Ionicons
                            name={idProof ? "document-text" : "cloud-upload-outline"}
                            size={32}
                            color={colors.accent}
                        />
                        <FileText>{idProof || "Tap to upload (PDF/JPG)"}</FileText>
                    </FilePicker>
                </Section>

                <View style={{ height: 40 }} />

                <PremiumButton
                    title={loading ? "Verifying..." : "Submit for Verification"}
                    onPress={handleSubmit}
                    loading={loading}
                    disabled={loading}
                />
            </Content>
        </Container>
    );
}

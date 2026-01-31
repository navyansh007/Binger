import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';
import { PremiumButton } from '../../components/ui/PremiumButton';
import { colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
  padding: ${spacing.lg}px;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.card};
  border-radius: 20px;
  margin-bottom: ${spacing.xl}px;
`;

const HeaderText = styled.Text`
  font-family: ${typography.fontFamily.headerBold};
  font-size: 32px;
  color: ${colors.text};
  margin-bottom: ${spacing.sm}px;
`;

const SubText = styled.Text`
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.xxl}px;
`;

const InputContainer = styled.View`
  gap: ${spacing.lg}px;
  margin-bottom: ${spacing.xl}px;
`;

const InputWrapper = styled.View`
  background-color: ${colors.card};
  border-radius: 12px;
  padding: ${spacing.md}px;
  border-width: 1px;
  border-color: ${colors.cardBorder};
`;

const StyledInput = styled(TextInput)`
  color: ${colors.text};
  font-family: ${typography.fontFamily.body};
  font-size: 16px;
`;

const Label = styled.Text`
  color: ${colors.textMuted};
  font-size: 12px;
  margin-bottom: 4px;
  font-family: ${typography.fontFamily.body};
`;

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { success, error: hapticError } = useHaptics();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ...

  const handleSignup = async () => {
    if (!name || !email || !password) {
      hapticError();
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields.',
      });
      return;
    }

    setLoading(true);
    try {
      await signUp();
      success();
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Welcome to Binger! Enjoy your stream.',
      });
      // Immediate navigation
      router.replace('/(tabs)');
    } catch (e) {
      hapticError();
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Could not create account. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </BackButton>

      <HeaderText>Create Account</HeaderText>
      <SubText>Start your journey with Binger.</SubText>

      <InputContainer>
        <InputWrapper>
          <Label>Full Name</Label>
          <StyledInput
            placeholder="John Doe"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Email</Label>
          <StyledInput
            placeholder="Enter your email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Password</Label>
          <StyledInput
            placeholder="Enter your password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </InputWrapper>
      </InputContainer>

      <PremiumButton
        title={loading ? 'Creating Account...' : 'Sign Up'}
        onPress={handleSignup}
        loading={loading}
        icon="person-add-outline"
        style={{ marginTop: spacing.md }}
      />
    </Container>
  );
}

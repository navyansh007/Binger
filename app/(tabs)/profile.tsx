import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Alert, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { borderRadius, colors, spacing, typography } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useHaptics } from '../../hooks/useHaptics';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  padding: ${spacing.md}px;
  align-items: center;
`;

const AvatarContainer = styled(MotiView)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${colors.card};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.md}px;
  border-width: 2px;
  border-color: ${colors.accent};
`;

const UserName = styled.Text`
  color: ${colors.text};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxl}px;
`;

const UserEmail = styled.Text`
  color: ${colors.textSecondary};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.md}px;
  margin-top: ${spacing.xs}px;
`;

const StatsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: ${spacing.xl}px;
  margin-top: ${spacing.lg}px;
  padding-bottom: ${spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.cardBorder};
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  color: ${colors.accent};
  font-family: ${typography.fontFamily.headerBold};
  font-size: ${typography.fontSize.xxl}px;
`;

const StatLabel = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs}px;
`;

const MenuSection = styled.View`
  padding: ${spacing.md}px;
`;

const MenuItem = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.md}px;
  background-color: ${colors.card};
  border-radius: ${borderRadius.md}px;
  margin-bottom: ${spacing.sm}px;
`;

const MenuIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.glass};
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

const MenuContent = styled.View`
  flex: 1;
`;

const MenuTitle = styled.Text<{ isDestructive?: boolean }>`
  color: ${props => props.isDestructive ? colors.error : colors.text};
  font-family: ${typography.fontFamily.bodyMedium};
  font-size: ${typography.fontSize.md}px;
`;

const MenuSubtitle = styled.Text`
  color: ${colors.textMuted};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs / 2}px;
`;

interface MenuItemConfig {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  isDestructive?: boolean;
  action?: () => void;
}

import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { PremiumButton } from '../../components/ui/PremiumButton';

export default function ProfileScreen() {
  const router = useRouter(); // Add router
  const { lightImpact } = useHaptics();
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/welcome'); // Immediate Navigation
          }
        }
      ]
    );
  };

  const menuItems: MenuItemConfig[] = [
    { icon: 'download-outline', title: 'Downloads', subtitle: 'Manage offline content' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage alerts' },
    { icon: 'settings-outline', title: 'Settings', subtitle: 'App preferences' },
    { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
    { icon: 'log-out-outline', title: 'Log Out', subtitle: 'Sign out of your account', isDestructive: true, action: handleLogout },
  ];

  // ... inside ProfileScreen

  const handleCreatorAction = () => {
    lightImpact();
    if (user?.isCreator) {
      router.push('/(creator)/dashboard');
    } else {
      router.push('/(creator)/verify');
    }
  };

  const handleMenuPress = (item: MenuItemConfig) => {
    lightImpact();
    if (item.action) {
      item.action();
    } else {
      console.log(`Pressed: ${item.title}`);
    }
  };

  return (
    <Container edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Header>
          <AvatarContainer
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Ionicons name="person" size={48} color={user?.isCreator ? colors.accent : colors.textMuted} />
          </AvatarContainer>
          <UserName>{user?.name || 'Guest User'}</UserName>
          <UserEmail>{user?.email || 'Sign in for full experience'}</UserEmail>
          {user?.isCreator && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, backgroundColor: colors.accent + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 }}>
              <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
              <StatLabel style={{ color: colors.accent, marginLeft: 4, marginTop: 0, fontSize: 10, fontWeight: 'bold' }}>VERIFIED CREATOR</StatLabel>
            </View>
          )}

          <StatsRow>
            {/* ... existing stats ... */}
            <StatItem>
              <StatValue>12</StatValue>
              <StatLabel>Watched</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>4</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>8</StatValue>
              <StatLabel>My List</StatLabel>
            </StatItem>
          </StatsRow>
        </Header>

        <MenuSection>
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100 }}
          >
            <PremiumButton
              title={user?.isCreator ? "Creator Studio" : "Become a Creator"}
              icon={user?.isCreator ? "stats-chart" : "star"}
              onPress={handleCreatorAction}
              variant={user?.isCreator ? "outline" : "primary"}
              style={{ marginBottom: spacing.lg }}
            />
          </MotiView>
        </MenuSection>

        <MenuSection>
          {menuItems.map((item, index) => (
            <MotiView
              key={item.title}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 300, delay: index * 50 }}
            >
              <MenuItem onPress={() => handleMenuPress(item)}>
                <MenuIcon>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={item.isDestructive ? colors.error : colors.accent}
                  />
                </MenuIcon>
                <MenuContent>
                  <MenuTitle isDestructive={item.isDestructive}>{item.title}</MenuTitle>
                  <MenuSubtitle>{item.subtitle}</MenuSubtitle>
                </MenuContent>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </MenuItem>
            </MotiView>
          ))}
        </MenuSection>
      </ScrollView>
    </Container>
  );
}

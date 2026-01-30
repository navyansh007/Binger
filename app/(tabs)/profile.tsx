import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import styled from 'styled-components/native';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
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

const MenuTitle = styled.Text`
  color: ${colors.text};
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
}

const menuItems: MenuItemConfig[] = [
  { icon: 'download-outline', title: 'Downloads', subtitle: 'Manage offline content' },
  { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Manage alerts' },
  { icon: 'settings-outline', title: 'Settings', subtitle: 'App preferences' },
  { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get assistance' },
  { icon: 'information-circle-outline', title: 'About', subtitle: 'App version 1.0.0' },
];

export default function ProfileScreen() {
  const { lightImpact } = useHaptics();

  const handleMenuPress = (title: string) => {
    lightImpact();
    console.log(`Pressed: ${title}`);
  };

  return (
    <Container edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <AvatarContainer
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Ionicons name="person" size={48} color={colors.accent} />
          </AvatarContainer>
          <UserName>Guest User</UserName>
          <UserEmail>Sign in for full experience</UserEmail>

          <StatsRow>
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
          {menuItems.map((item, index) => (
            <MotiView
              key={item.title}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 300, delay: index * 50 }}
            >
              <MenuItem onPress={() => handleMenuPress(item.title)}>
                <MenuIcon>
                  <Ionicons name={item.icon} size={22} color={colors.accent} />
                </MenuIcon>
                <MenuContent>
                  <MenuTitle>{item.title}</MenuTitle>
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

import React from 'react';
import { Pressable, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useHaptics } from '../../hooks/useHaptics';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_WIDTH = SCREEN_WIDTH - spacing.lg * 2;

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

interface TabConfig {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
}

const tabConfig: Record<string, TabConfig> = {
  index: { name: 'Home', icon: 'home-outline', iconFocused: 'home' },
  search: { name: 'Search', icon: 'search-outline', iconFocused: 'search' },
  mylist: { name: 'My List', icon: 'bookmark-outline', iconFocused: 'bookmark' },
  profile: { name: 'Profile', icon: 'person-outline', iconFocused: 'person' },
};

const Container = styled(MotiView)`
  position: absolute;
  bottom: 0;
  left: ${spacing.lg}px;
  right: ${spacing.lg}px;
  border-radius: ${borderRadius.xl}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${colors.cardBorder};
`;

const BlurContainer = styled(BlurView)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.glass};
`;

const TabButton = styled(Pressable)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: ${spacing.sm}px;
`;

const TabIconContainer = styled(MotiView)`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 22px;
`;

const TabLabel = styled.Text<{ focused: boolean }>`
  color: ${(props) => (props.focused ? colors.accent : colors.textMuted)};
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.xs}px;
  margin-top: ${spacing.xs / 2}px;
`;

export const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { selection } = useHaptics();

  return (
    <Container
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, delay: 300 }}
      style={{ marginBottom: insets.bottom + spacing.sm }}
    >
      <BlurContainer intensity={60} tint="dark">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const config = tabConfig[route.name] || {
            name: route.name,
            icon: 'ellipse-outline',
            iconFocused: 'ellipse',
          };

          const onPress = () => {
            selection();
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
            >
              <TabIconContainer
                animate={{
                  scale: isFocused ? 1.1 : 1,
                  backgroundColor: isFocused ? colors.accent + '20' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <Ionicons
                  name={isFocused ? config.iconFocused : config.icon}
                  size={24}
                  color={isFocused ? colors.accent : colors.textMuted}
                />
              </TabIconContainer>
              <TabLabel focused={isFocused}>{config.name}</TabLabel>
            </TabButton>
          );
        })}
      </BlurContainer>
    </Container>
  );
};

import React from 'react';
import { Text, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

interface GradientTextProps {
  children: string;
  style?: TextStyle;
  colors?: string[];
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  style,
  colors: gradientColors = [colors.accent, colors.accentLight, colors.accent],
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: 'transparent' }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

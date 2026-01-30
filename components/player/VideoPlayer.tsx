import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import styled from 'styled-components/native';
import { PlayerControls } from './PlayerControls';
import { GestureOverlay } from './GestureOverlay';
import { colors } from '../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  episodeTitle: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  initialPosition?: number;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

const VideoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledVideo = styled(Video)`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
`;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  episodeTitle,
  onClose,
  onNext,
  onPrevious,
  initialPosition = 0,
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialPosition);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  useEffect(() => {
    if (showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 4000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsPlaying(status.isPlaying);
      setIsBuffering(status.isBuffering);
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
    }
  }, [isPlaying]);

  const seekTo = useCallback(async (seconds: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(seconds * 1000);
    }
  }, []);

  const skipForward = useCallback(async () => {
    const newTime = Math.min(currentTime + 10, duration);
    await seekTo(newTime);
  }, [currentTime, duration, seekTo]);

  const skipBackward = useCallback(async () => {
    const newTime = Math.max(currentTime - 10, 0);
    await seekTo(newTime);
  }, [currentTime, seekTo]);

  const handleTap = useCallback(() => {
    setShowControls((prev) => !prev);
  }, []);

  const handleDoubleTapLeft = useCallback(() => {
    skipBackward();
  }, [skipBackward]);

  const handleDoubleTapRight = useCallback(() => {
    skipForward();
  }, [skipForward]);

  const handleSeek = useCallback((progress: number) => {
    const newTime = progress * duration;
    seekTo(newTime);
  }, [duration, seekTo]);

  return (
    <Container>
      <VideoContainer>
        <StyledVideo
          ref={videoRef}
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </VideoContainer>

      <GestureOverlay
        onTap={handleTap}
        onDoubleTapLeft={handleDoubleTapLeft}
        onDoubleTapRight={handleDoubleTapRight}
      />

      <PlayerControls
        visible={showControls}
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        currentTime={currentTime}
        duration={duration}
        title={title}
        episodeTitle={episodeTitle}
        onPlayPause={togglePlayPause}
        onSeek={handleSeek}
        onClose={onClose}
        onSkipForward={skipForward}
        onSkipBackward={skipBackward}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </Container>
  );
};

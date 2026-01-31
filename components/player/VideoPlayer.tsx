import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../constants/theme';
import { GestureOverlay } from './GestureOverlay';
import { PlayerControls } from './PlayerControls';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  episodeTitle: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  initialPosition?: number;
  shouldPlay?: boolean;
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
  shouldPlay = true,
}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(shouldPlay);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialPosition);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync internal playing state with prop
  useEffect(() => {
    setIsPlaying(shouldPlay);
    if (!shouldPlay) {
      setShowControls(true); // Show controls if paused externally
    }
  }, [shouldPlay]);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
    return () => {
      StatusBar.setHidden(false, 'fade');
    };
  }, []);

  // Auto-hide controls logic
  useEffect(() => {
    if (showControls) {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3500);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [showControls, isPlaying]);

  const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setHasLoaded(true);
      setCurrentTime(status.positionMillis / 1000);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
      setIsBuffering(status.isBuffering);

      // If video finishes, show controls?
      if (status.didJustFinish) {
        setShowControls(true);
        setIsPlaying(false);
      }
    }
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
        setShowControls(true); // Keep controls visible when paused
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  }, [isPlaying]);

  const seekTo = useCallback(async (seconds: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(seconds * 1000);
    }
  }, []);

  const handleTap = useCallback(() => {
    // Logic:
    // 1. If controls hidden -> Show controls (Keep playing)
    // 2. If controls visible & playing -> Pause (Show controls)
    // 3. If controls visible & paused -> Play (Hide controls eventually)

    if (!showControls) {
      setShowControls(true);
    } else {
      togglePlayPause();
    }
  }, [showControls, togglePlayPause]);

  const handleSeekStart = useCallback(() => {
    // Clear timeout to prevent auto-hide while dragging
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    setShowControls(true);
  }, []);

  const handleSeek = useCallback((progress: number) => {
    setShowControls(true); // Dragging shows controls
    const newTime = progress * duration;
    seekTo(newTime);
  }, [duration, seekTo]);

  return (
    <Container>
      <VideoContainer>
        <StyledVideo
          ref={videoRef}
          source={{ uri: videoUrl }}
          resizeMode={ResizeMode.COVER}
          shouldPlay={shouldPlay && isPlaying}
          isLooping={true}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </VideoContainer>

      <GestureOverlay
        onTap={handleTap}
        onSwipeUp={onNext || (() => { })}
        onSwipeDown={onPrevious || (() => { })}
        onSwipeRight={onClose} // Swipe Right to Go Back
      />

      <PlayerControls
        visible={showControls} // Fade in/out
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        currentTime={currentTime}
        duration={duration}
        title={title}
        episodeTitle={episodeTitle}
        onPlayPause={togglePlayPause}
        onSeek={handleSeek}
        onSlidingStart={handleSeekStart}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </Container>
  );
};

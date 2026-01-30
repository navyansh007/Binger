export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDurationLong = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) {
    return `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatEpisodeCount = (count: number): string => {
  return count === 1 ? '1 Episode' : `${count} Episodes`;
};

export const formatProgress = (progress: number): string => {
  return `${Math.round(progress)}%`;
};

export const getTimeRemaining = (duration: number, progress: number): string => {
  const watched = (duration * progress) / 100;
  const remaining = duration - watched;
  return formatDuration(Math.round(remaining));
};

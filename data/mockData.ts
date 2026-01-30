export interface Episode {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // in seconds
  progress: number; // 0-100
}

export interface Series {
  id: string;
  title: string;
  thumbnail: string;
  previewVideo: string;
  rating: number;
  tags: string[];
  episodeCount: number;
  totalDuration: string;
  description: string;
  episodes: Episode[];
  relatedUniverses: string[];
}

// Sample video URLs (public domain / test videos)
const SAMPLE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const SAMPLE_PREVIEW = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const mockSeries: Series[] = [
  {
    id: '1',
    title: 'Midnight Chronicles',
    thumbnail: 'https://picsum.photos/seed/midnight/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.8,
    tags: ['Thriller', 'Mystery', 'Drama'],
    episodeCount: 8,
    totalDuration: '56 min',
    description: 'A detective uncovers a web of secrets in a small town where nothing is as it seems.',
    episodes: [
      { id: '1-1', title: 'The Arrival', thumbnail: 'https://picsum.photos/seed/ep1/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 100 },
      { id: '1-2', title: 'First Clues', thumbnail: 'https://picsum.photos/seed/ep2/400/225', videoUrl: SAMPLE_VIDEO, duration: 380, progress: 65 },
      { id: '1-3', title: 'Hidden Paths', thumbnail: 'https://picsum.photos/seed/ep3/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
      { id: '1-4', title: 'The Witness', thumbnail: 'https://picsum.photos/seed/ep4/400/225', videoUrl: SAMPLE_VIDEO, duration: 410, progress: 0 },
      { id: '1-5', title: 'Breaking Point', thumbnail: 'https://picsum.photos/seed/ep5/400/225', videoUrl: SAMPLE_VIDEO, duration: 390, progress: 0 },
      { id: '1-6', title: 'Revelations', thumbnail: 'https://picsum.photos/seed/ep6/400/225', videoUrl: SAMPLE_VIDEO, duration: 440, progress: 0 },
      { id: '1-7', title: 'The Chase', thumbnail: 'https://picsum.photos/seed/ep7/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 0 },
      { id: '1-8', title: 'Midnight Truth', thumbnail: 'https://picsum.photos/seed/ep8/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 0 },
    ],
    relatedUniverses: ['2', '5'],
  },
  {
    id: '2',
    title: 'Neon Dreams',
    thumbnail: 'https://picsum.photos/seed/neon/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.6,
    tags: ['Sci-Fi', 'Action', 'Cyberpunk'],
    episodeCount: 6,
    totalDuration: '42 min',
    description: 'In a dystopian future, a hacker fights against corporate overlords to free humanity.',
    episodes: [
      { id: '2-1', title: 'Boot Sequence', thumbnail: 'https://picsum.photos/seed/neon1/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 100 },
      { id: '2-2', title: 'Firewall', thumbnail: 'https://picsum.photos/seed/neon2/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 100 },
      { id: '2-3', title: 'Ghost Protocol', thumbnail: 'https://picsum.photos/seed/neon3/400/225', videoUrl: SAMPLE_VIDEO, duration: 430, progress: 30 },
      { id: '2-4', title: 'System Crash', thumbnail: 'https://picsum.photos/seed/neon4/400/225', videoUrl: SAMPLE_VIDEO, duration: 410, progress: 0 },
      { id: '2-5', title: 'Reboot', thumbnail: 'https://picsum.photos/seed/neon5/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
      { id: '2-6', title: 'Liberation', thumbnail: 'https://picsum.photos/seed/neon6/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 0 },
    ],
    relatedUniverses: ['1', '4'],
  },
  {
    id: '3',
    title: 'Love in Paris',
    thumbnail: 'https://picsum.photos/seed/paris/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.4,
    tags: ['Romance', 'Drama', 'Comedy'],
    episodeCount: 10,
    totalDuration: '70 min',
    description: 'Two strangers meet in the City of Light and discover that love knows no boundaries.',
    episodes: [
      { id: '3-1', title: 'First Glance', thumbnail: 'https://picsum.photos/seed/paris1/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 0 },
      { id: '3-2', title: 'Coffee & Croissants', thumbnail: 'https://picsum.photos/seed/paris2/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 0 },
      { id: '3-3', title: 'Eiffel Encounters', thumbnail: 'https://picsum.photos/seed/paris3/400/225', videoUrl: SAMPLE_VIDEO, duration: 430, progress: 0 },
      { id: '3-4', title: 'Rainy Days', thumbnail: 'https://picsum.photos/seed/paris4/400/225', videoUrl: SAMPLE_VIDEO, duration: 410, progress: 0 },
      { id: '3-5', title: 'Montmartre Nights', thumbnail: 'https://picsum.photos/seed/paris5/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
      { id: '3-6', title: 'Misunderstandings', thumbnail: 'https://picsum.photos/seed/paris6/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 0 },
      { id: '3-7', title: 'Second Chances', thumbnail: 'https://picsum.photos/seed/paris7/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 0 },
      { id: '3-8', title: 'The Letter', thumbnail: 'https://picsum.photos/seed/paris8/400/225', videoUrl: SAMPLE_VIDEO, duration: 390, progress: 0 },
      { id: '3-9', title: 'Seine Sunset', thumbnail: 'https://picsum.photos/seed/paris9/400/225', videoUrl: SAMPLE_VIDEO, duration: 440, progress: 0 },
      { id: '3-10', title: 'Forever Paris', thumbnail: 'https://picsum.photos/seed/paris10/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 0 },
    ],
    relatedUniverses: ['6'],
  },
  {
    id: '4',
    title: 'The Last Kingdom',
    thumbnail: 'https://picsum.photos/seed/kingdom/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.9,
    tags: ['Fantasy', 'Adventure', 'Epic'],
    episodeCount: 12,
    totalDuration: '84 min',
    description: 'An epic tale of warriors, magic, and the fight for a realm on the brink of destruction.',
    episodes: [
      { id: '4-1', title: 'The Prophecy', thumbnail: 'https://picsum.photos/seed/king1/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 100 },
      { id: '4-2', title: 'Rise of Darkness', thumbnail: 'https://picsum.photos/seed/king2/400/225', videoUrl: SAMPLE_VIDEO, duration: 430, progress: 100 },
      { id: '4-3', title: 'The Gathering', thumbnail: 'https://picsum.photos/seed/king3/400/225', videoUrl: SAMPLE_VIDEO, duration: 410, progress: 100 },
      { id: '4-4', title: 'Ancient Powers', thumbnail: 'https://picsum.photos/seed/king4/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 45 },
      { id: '4-5', title: 'Betrayal', thumbnail: 'https://picsum.photos/seed/king5/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 0 },
      { id: '4-6', title: 'The Siege', thumbnail: 'https://picsum.photos/seed/king6/400/225', videoUrl: SAMPLE_VIDEO, duration: 440, progress: 0 },
      { id: '4-7', title: 'Lost Hope', thumbnail: 'https://picsum.photos/seed/king7/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 0 },
      { id: '4-8', title: 'Alliance', thumbnail: 'https://picsum.photos/seed/king8/400/225', videoUrl: SAMPLE_VIDEO, duration: 430, progress: 0 },
      { id: '4-9', title: 'The Battle', thumbnail: 'https://picsum.photos/seed/king9/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 0 },
      { id: '4-10', title: 'Sacrifice', thumbnail: 'https://picsum.photos/seed/king10/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 0 },
      { id: '4-11', title: 'Dawn Rising', thumbnail: 'https://picsum.photos/seed/king11/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
      { id: '4-12', title: 'The Last Stand', thumbnail: 'https://picsum.photos/seed/king12/400/225', videoUrl: SAMPLE_VIDEO, duration: 520, progress: 0 },
    ],
    relatedUniverses: ['2', '5'],
  },
  {
    id: '5',
    title: 'Urban Legends',
    thumbnail: 'https://picsum.photos/seed/urban/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.5,
    tags: ['Horror', 'Anthology', 'Suspense'],
    episodeCount: 5,
    totalDuration: '35 min',
    description: 'Each episode brings a different terrifying tale inspired by real urban legends.',
    episodes: [
      { id: '5-1', title: 'The Vanishing Hitchhiker', thumbnail: 'https://picsum.photos/seed/urban1/400/225', videoUrl: SAMPLE_VIDEO, duration: 420, progress: 0 },
      { id: '5-2', title: 'Bloody Mary', thumbnail: 'https://picsum.photos/seed/urban2/400/225', videoUrl: SAMPLE_VIDEO, duration: 400, progress: 0 },
      { id: '5-3', title: 'The Hook', thumbnail: 'https://picsum.photos/seed/urban3/400/225', videoUrl: SAMPLE_VIDEO, duration: 430, progress: 0 },
      { id: '5-4', title: 'Killer in the Backseat', thumbnail: 'https://picsum.photos/seed/urban4/400/225', videoUrl: SAMPLE_VIDEO, duration: 410, progress: 0 },
      { id: '5-5', title: 'The Babysitter', thumbnail: 'https://picsum.photos/seed/urban5/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
    ],
    relatedUniverses: ['1'],
  },
  {
    id: '6',
    title: 'Chef\'s Table: Streets',
    thumbnail: 'https://picsum.photos/seed/chef/800/450',
    previewVideo: SAMPLE_PREVIEW,
    rating: 4.7,
    tags: ['Documentary', 'Food', 'Culture'],
    episodeCount: 6,
    totalDuration: '48 min',
    description: 'Exploring the world\'s most extraordinary street food vendors and their stories.',
    episodes: [
      { id: '6-1', title: 'Bangkok Nights', thumbnail: 'https://picsum.photos/seed/chef1/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 100 },
      { id: '6-2', title: 'Mexico City Dreams', thumbnail: 'https://picsum.photos/seed/chef2/400/225', videoUrl: SAMPLE_VIDEO, duration: 460, progress: 80 },
      { id: '6-3', title: 'Mumbai Mornings', thumbnail: 'https://picsum.photos/seed/chef3/400/225', videoUrl: SAMPLE_VIDEO, duration: 470, progress: 0 },
      { id: '6-4', title: 'Tokyo Alleyways', thumbnail: 'https://picsum.photos/seed/chef4/400/225', videoUrl: SAMPLE_VIDEO, duration: 450, progress: 0 },
      { id: '6-5', title: 'Istanbul Bazaar', thumbnail: 'https://picsum.photos/seed/chef5/400/225', videoUrl: SAMPLE_VIDEO, duration: 480, progress: 0 },
      { id: '6-6', title: 'New York Underground', thumbnail: 'https://picsum.photos/seed/chef6/400/225', videoUrl: SAMPLE_VIDEO, duration: 490, progress: 0 },
    ],
    relatedUniverses: ['3'],
  },
];

export const getSeriesById = (id: string): Series | undefined => {
  return mockSeries.find(series => series.id === id);
};

export const getEpisodeById = (seriesId: string, episodeId: string): Episode | undefined => {
  const series = getSeriesById(seriesId);
  return series?.episodes.find(ep => ep.id === episodeId);
};

export const getContinueWatching = (): Series[] => {
  return mockSeries.filter(series =>
    series.episodes.some(ep => ep.progress > 0 && ep.progress < 100)
  );
};

export const getTrending = (): Series[] => {
  return [...mockSeries].sort((a, b) => b.rating - a.rating).slice(0, 4);
};

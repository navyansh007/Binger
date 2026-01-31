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

// Mixkit video URL helper (free vertical videos)
const mixkitVideo = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

// Portrait thumbnails (9:16 aspect ratio for vertical content)
const portraitThumb = (seed: string) => `https://picsum.photos/seed/${seed}/450/800`;

export const mockSeries: Series[] = [
  {
    id: '1',
    title: 'Midnight Chronicles',
    thumbnail: portraitThumb('midnight-dark'),
    previewVideo: mixkitVideo(3458), // Candle lighting in the dark
    rating: 4.8,
    tags: ['Thriller', 'Mystery', 'Drama'],
    episodeCount: 8,
    totalDuration: '56 min',
    description: 'A detective uncovers a web of secrets in a small town where nothing is as it seems.',
    episodes: [
      { id: '1-1', title: 'The Arrival', thumbnail: portraitThumb('mc-ep1'), videoUrl: mixkitVideo(3458), duration: 420, progress: 100 },
      { id: '1-2', title: 'First Clues', thumbnail: portraitThumb('mc-ep2'), videoUrl: mixkitVideo(28901), duration: 380, progress: 65 },
      { id: '1-3', title: 'Hidden Paths', thumbnail: portraitThumb('mc-ep3'), videoUrl: mixkitVideo(3925), duration: 450, progress: 0 },
      { id: '1-4', title: 'The Witness', thumbnail: portraitThumb('mc-ep4'), videoUrl: mixkitVideo(3926), duration: 410, progress: 0 },
      { id: '1-5', title: 'Breaking Point', thumbnail: portraitThumb('mc-ep5'), videoUrl: mixkitVideo(50747), duration: 390, progress: 0 },
      { id: '1-6', title: 'Revelations', thumbnail: portraitThumb('mc-ep6'), videoUrl: mixkitVideo(3923), duration: 440, progress: 0 },
      { id: '1-7', title: 'The Chase', thumbnail: portraitThumb('mc-ep7'), videoUrl: mixkitVideo(3438), duration: 400, progress: 0 },
      { id: '1-8', title: 'Midnight Truth', thumbnail: portraitThumb('mc-ep8'), videoUrl: mixkitVideo(41741), duration: 480, progress: 0 },
    ],
    relatedUniverses: ['2', '5'],
  },
  {
    id: '2',
    title: 'Neon Dreams',
    thumbnail: portraitThumb('neon-cyber'),
    previewVideo: mixkitVideo(1232), // Girl in neon sign
    rating: 4.6,
    tags: ['Sci-Fi', 'Action', 'Cyberpunk'],
    episodeCount: 6,
    totalDuration: '42 min',
    description: 'In a dystopian future, a hacker fights against corporate overlords to free humanity.',
    episodes: [
      { id: '2-1', title: 'Boot Sequence', thumbnail: portraitThumb('nd-ep1'), videoUrl: mixkitVideo(1232), duration: 420, progress: 100 },
      { id: '2-2', title: 'Firewall', thumbnail: portraitThumb('nd-ep2'), videoUrl: mixkitVideo(50812), duration: 400, progress: 100 },
      { id: '2-3', title: 'Ghost Protocol', thumbnail: portraitThumb('nd-ep3'), videoUrl: mixkitVideo(50810), duration: 430, progress: 30 },
      { id: '2-4', title: 'System Crash', thumbnail: portraitThumb('nd-ep4'), videoUrl: mixkitVideo(49878), duration: 410, progress: 0 },
      { id: '2-5', title: 'Reboot', thumbnail: portraitThumb('nd-ep5'), videoUrl: mixkitVideo(1240), duration: 450, progress: 0 },
      { id: '2-6', title: 'Liberation', thumbnail: portraitThumb('nd-ep6'), videoUrl: mixkitVideo(44694), duration: 480, progress: 0 },
    ],
    relatedUniverses: ['1', '4'],
  },
  {
    id: '3',
    title: 'Love in Paris',
    thumbnail: portraitThumb('paris-romance'),
    previewVideo: mixkitVideo(100947), // Silhouettes of Flirting Couple
    rating: 4.4,
    tags: ['Romance', 'Drama', 'Comedy'],
    episodeCount: 10,
    totalDuration: '70 min',
    description: 'Two strangers meet in the City of Light and discover that love knows no boundaries.',
    episodes: [
      { id: '3-1', title: 'First Glance', thumbnail: portraitThumb('lp-ep1'), videoUrl: mixkitVideo(100947), duration: 420, progress: 0 },
      { id: '3-2', title: 'Coffee & Croissants', thumbnail: portraitThumb('lp-ep2'), videoUrl: mixkitVideo(100949), duration: 400, progress: 0 },
      { id: '3-3', title: 'Eiffel Encounters', thumbnail: portraitThumb('lp-ep3'), videoUrl: mixkitVideo(100951), duration: 430, progress: 0 },
      { id: '3-4', title: 'Rainy Days', thumbnail: portraitThumb('lp-ep4'), videoUrl: mixkitVideo(101485), duration: 410, progress: 0 },
      { id: '3-5', title: 'Montmartre Nights', thumbnail: portraitThumb('lp-ep5'), videoUrl: mixkitVideo(100952), duration: 450, progress: 0 },
      { id: '3-6', title: 'Misunderstandings', thumbnail: portraitThumb('lp-ep6'), videoUrl: mixkitVideo(100762), duration: 400, progress: 0 },
      { id: '3-7', title: 'Second Chances', thumbnail: portraitThumb('lp-ep7'), videoUrl: mixkitVideo(100796), duration: 420, progress: 0 },
      { id: '3-8', title: 'The Letter', thumbnail: portraitThumb('lp-ep8'), videoUrl: mixkitVideo(12170), duration: 390, progress: 0 },
      { id: '3-9', title: 'Seine Sunset', thumbnail: portraitThumb('lp-ep9'), videoUrl: mixkitVideo(100948), duration: 440, progress: 0 },
      { id: '3-10', title: 'Forever Paris', thumbnail: portraitThumb('lp-ep10'), videoUrl: mixkitVideo(100953), duration: 480, progress: 0 },
    ],
    relatedUniverses: ['6'],
  },
  {
    id: '4',
    title: 'The Last Kingdom',
    thumbnail: portraitThumb('kingdom-epic'),
    previewVideo: mixkitVideo(100174), // Waterfall Between Green Hills
    rating: 4.9,
    tags: ['Fantasy', 'Adventure', 'Epic'],
    episodeCount: 12,
    totalDuration: '84 min',
    description: 'An epic tale of warriors, magic, and the fight for a realm on the brink of destruction.',
    episodes: [
      { id: '4-1', title: 'The Prophecy', thumbnail: portraitThumb('lk-ep1'), videoUrl: mixkitVideo(100174), duration: 420, progress: 100 },
      { id: '4-2', title: 'Rise of Darkness', thumbnail: portraitThumb('lk-ep2'), videoUrl: mixkitVideo(51501), duration: 430, progress: 100 },
      { id: '4-3', title: 'The Gathering', thumbnail: portraitThumb('lk-ep3'), videoUrl: mixkitVideo(3980), duration: 410, progress: 100 },
      { id: '4-4', title: 'Ancient Powers', thumbnail: portraitThumb('lk-ep4'), videoUrl: mixkitVideo(100173), duration: 450, progress: 45 },
      { id: '4-5', title: 'Betrayal', thumbnail: portraitThumb('lk-ep5'), videoUrl: mixkitVideo(1178), duration: 420, progress: 0 },
      { id: '4-6', title: 'The Siege', thumbnail: portraitThumb('lk-ep6'), videoUrl: mixkitVideo(100177), duration: 440, progress: 0 },
      { id: '4-7', title: 'Lost Hope', thumbnail: portraitThumb('lk-ep7'), videoUrl: mixkitVideo(51502), duration: 400, progress: 0 },
      { id: '4-8', title: 'Alliance', thumbnail: portraitThumb('lk-ep8'), videoUrl: mixkitVideo(1186), duration: 430, progress: 0 },
      { id: '4-9', title: 'The Battle', thumbnail: portraitThumb('lk-ep9'), videoUrl: mixkitVideo(40657), duration: 480, progress: 0 },
      { id: '4-10', title: 'Sacrifice', thumbnail: portraitThumb('lk-ep10'), videoUrl: mixkitVideo(1164), duration: 420, progress: 0 },
      { id: '4-11', title: 'Dawn Rising', thumbnail: portraitThumb('lk-ep11'), videoUrl: mixkitVideo(1173), duration: 450, progress: 0 },
      { id: '4-12', title: 'The Last Stand', thumbnail: portraitThumb('lk-ep12'), videoUrl: mixkitVideo(101015), duration: 520, progress: 0 },
    ],
    relatedUniverses: ['2', '5'],
  },
  {
    id: '5',
    title: 'Urban Legends',
    thumbnail: portraitThumb('horror-dark'),
    previewVideo: mixkitVideo(101599), // Hand Rising From Graveyard
    rating: 4.5,
    tags: ['Horror', 'Anthology', 'Suspense'],
    episodeCount: 5,
    totalDuration: '35 min',
    description: 'Each episode brings a different terrifying tale inspired by real urban legends.',
    episodes: [
      { id: '5-1', title: 'The Vanishing Hitchhiker', thumbnail: portraitThumb('ul-ep1'), videoUrl: mixkitVideo(101599), duration: 420, progress: 0 },
      { id: '5-2', title: 'Bloody Mary', thumbnail: portraitThumb('ul-ep2'), videoUrl: mixkitVideo(101600), duration: 400, progress: 0 },
      { id: '5-3', title: 'The Hook', thumbnail: portraitThumb('ul-ep3'), videoUrl: mixkitVideo(33875), duration: 430, progress: 0 },
      { id: '5-4', title: 'Killer in the Backseat', thumbnail: portraitThumb('ul-ep4'), videoUrl: mixkitVideo(51086), duration: 410, progress: 0 },
      { id: '5-5', title: 'The Babysitter', thumbnail: portraitThumb('ul-ep5'), videoUrl: mixkitVideo(101602), duration: 450, progress: 0 },
    ],
    relatedUniverses: ['1'],
  },
  {
    id: '6',
    title: 'Chef\'s Table: Streets',
    thumbnail: portraitThumb('food-chef'),
    previewVideo: mixkitVideo(10428), // Food video
    rating: 4.7,
    tags: ['Documentary', 'Food', 'Culture'],
    episodeCount: 6,
    totalDuration: '48 min',
    description: 'Exploring the world\'s most extraordinary street food vendors and their stories.',
    episodes: [
      { id: '6-1', title: 'Bangkok Nights', thumbnail: portraitThumb('ct-ep1'), videoUrl: mixkitVideo(10428), duration: 480, progress: 100 },
      { id: '6-2', title: 'Mexico City Dreams', thumbnail: portraitThumb('ct-ep2'), videoUrl: mixkitVideo(12171), duration: 460, progress: 80 },
      { id: '6-3', title: 'Mumbai Mornings', thumbnail: portraitThumb('ct-ep3'), videoUrl: mixkitVideo(47332), duration: 470, progress: 0 },
      { id: '6-4', title: 'Tokyo Alleyways', thumbnail: portraitThumb('ct-ep4'), videoUrl: mixkitVideo(26094), duration: 450, progress: 0 },
      { id: '6-5', title: 'Istanbul Bazaar', thumbnail: portraitThumb('ct-ep5'), videoUrl: mixkitVideo(10427), duration: 480, progress: 0 },
      { id: '6-6', title: 'New York Underground', thumbnail: portraitThumb('ct-ep6'), videoUrl: mixkitVideo(47335), duration: 490, progress: 0 },
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

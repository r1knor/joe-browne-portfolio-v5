import type { ImageSource, MusicItem } from '../types/content';

const square = (slug: string, alt: string, size = 1200): ImageSource => ({
  src: `/assets/images/${slug}-1200.webp`,
  srcSet: `/assets/images/${slug}-720.webp 720w, /assets/images/${slug}-1200.webp 1200w`,
  alt,
  width: size,
  height: size,
});

export const music: MusicItem[] = [
  {
    slug: 'dubby-riddim',
    title: 'Dubby Riddim',
    artist: 'Riknor',
    releaseType: 'SoundCloud track',
    genre: ['UK Garage', 'Grime', 'Reggae'],
    description: 'A verified Riknor track available through the existing SoundCloud profile.',
    coverImage: square('riknor-dark-garage', 'Riknor Dark Garage cover artwork', 1400),
    externalUrl: 'https://soundcloud.com/riknorgrime/dubby-riddim',
    embedUrl:
      'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/riknorgrime/dubby-riddim&color=%23ef554c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false',
    featured: true,
  },
];

export const musicArtwork: ImageSource[] = [
  square('riknor-dark-garage', 'Riknor Dark Garage artwork', 1400),
  square('riknor-futurecurse', 'Riknor and Futurecurse artwork', 1080),
  square('strictly-dubs-01', 'Strictly Dubs artwork study one', 1000),
  square('strictly-dubs-02', 'Strictly Dubs artwork study two', 1000),
  square('strictly-dubs-03', 'Strictly Dubs artwork study three', 1000),
];

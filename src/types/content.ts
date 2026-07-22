export type ImageSource = {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  categories: string[];
  role?: string;
  client?: string;
  tools?: string[];
  deliverables?: string[];
  coverImage: ImageSource;
  galleryImages: ImageSource[];
  featured: boolean;
  orientation: 'landscape' | 'portrait';
};

export type Experience = {
  dates: string;
  title: string;
  organisation: string;
  description: string;
  kind: 'work' | 'education' | 'independent';
};

export type MusicItem = {
  slug: string;
  title: string;
  artist: string;
  releaseType?: string;
  genre?: string[];
  description: string;
  coverImage?: ImageSource;
  externalUrl?: string;
  embedUrl?: string;
  featured: boolean;
};

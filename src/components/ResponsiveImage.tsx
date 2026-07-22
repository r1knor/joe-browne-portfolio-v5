import type { ImageSource } from '../types/content';

type Props = {
  image: ImageSource;
  eager?: boolean;
  className?: string;
  sizes?: string;
};

export function ResponsiveImage({
  image,
  eager = false,
  className,
  sizes = '(max-width: 760px) 100vw, 82vw',
}: Props) {
  return (
    <img
      className={className}
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Loading from '@/components/ui/Loading/Loading';

interface AvatarProps {
  src?: string | null | StaticImageData;
  alt?: string | null;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function AvatarImage({
  src,
  alt = 'avatar',
  className,
  width,
  height,
}: AvatarProps) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt ? alt : 'avatar img'}
          className={clsx(
            'shadow-xl object-top rounded-full w-32 h-32 object-cover',
            className
          )}
          width={width ? width : 16}
          height={height ? height : 16}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

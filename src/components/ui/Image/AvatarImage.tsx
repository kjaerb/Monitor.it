import Image from "next/image";

interface AvatarImageProps {
  src?: string;
  alt?: string;
}

export function AvatarImage({ src, alt }: AvatarImageProps) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={`avatar-${alt}`}
          width={24}
          height={24}
          className='rounded-full'
        />
      ) : (
        <div className='w-10 h-10 rounded-full bg-gray-300'></div>
      )}
    </>
  );
}

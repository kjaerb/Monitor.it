import clsx from "clsx";
import Image from "next/image";
import Loading from "../Loading/Loading";

interface AvatarProps {
  src?: string | null;
  alt?: string | null;
  className?: string;
  width?: number;
  height?: number;
}

export function AvatarImage({
  src,
  alt = "avatar",
  className,
  width,
  height,
}: AvatarProps) {
  return (
    <>
      {src ? (
        <Image
          src={src}
          alt={alt ? alt : ""}
          className={clsx(
            "m-0 flex-shrink-0 rounded-full bg-gray-300",
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

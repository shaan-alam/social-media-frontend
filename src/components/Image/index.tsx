import React from "react";
import Skeleton from "react-loading-skeleton";

export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  skeletonHeight?: number;
  skeletonWidth?: number;
  isLoading?: boolean;
}

const Image = ({
  skeletonHeight,
  skeletonWidth,
  src,
  alt,
  isLoading,
  ...otherProps
}: ImageProps) => {
  return (
    <>
      {(!src || isLoading) && (
        <Skeleton height={skeletonHeight} width={skeletonWidth} />
      )}
      <img src={src} alt={alt} {...otherProps} />
    </>
  );
};

export default Image;

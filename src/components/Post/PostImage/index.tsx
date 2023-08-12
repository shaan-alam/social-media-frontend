import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "../../Image";

const PostImage = ({
  image,
  caption,
  filter,
}: {
  image: string;
  caption: string;
  filter: string;
}) => {
  const [isLoaded, setLoaded] = useState<boolean>(false); // To determine if the image is completely loaded!

  // postImageRef to determine when the image is loaded and to show skeleton component on the basis of that!
  const postImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = postImageRef.current;
    if (img && img.complete) {
      setLoaded(true);
    }
  }, []);

  return image != "" ? (
    <div className="post-image">
      <Image
        isLoading={!isLoaded}
        skeletonHeight={400}
        src={image}
        alt={caption}
        className={`my-3 w-full rounded-lg ${filter} ${
          !isLoaded ? "hidden" : ""
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  ) : null;
};

export default PostImage;

import { useState } from "react";
import TextTruncate from "react-truncate";

const PostCaption = ({ caption }: { caption: string }) => {
  const [isTruncated, setTruncated] = useState<boolean>(true); // To determine whether to show full post caption or truncted text caption

  return (
    <div className="caption mb-4">
      {isTruncated ? (
        <TextTruncate
          lines={3}
          ellipsis={
            <a
              href="#!"
              onClick={() => setTruncated(false)}
              className="text-fb"
            >
              ...Show more..
            </a>
          }
        >
          <p className="leading-7">{caption}</p>
        </TextTruncate>
      ) : (
        <>
          <p className="leading-7">{caption}</p>
          <a href="#!" onClick={() => setTruncated(true)} className="text-fb">
            Show less
          </a>
        </>
      )}
    </div>
  );
};

export default PostCaption;

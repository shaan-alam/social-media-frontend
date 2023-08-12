import { useState } from "react";
import { PostType } from "../../components/Post/types";
import PostModal from "../Modal/PostModal";

interface Props {
  photo: PostType;
}

const PhotoThumbnail = ({ photo }: Props) => {
  const [postModal, setPostModal] = useState(false);

  return (
    <div className="photo-thumbnail">
      <img
        src={photo?.thumbnailURL}
        alt={photo?.caption}
        className={`hover:opacity-95 ${photo.filter}`}
        onClick={() => setPostModal(true)}
      />
      {postModal && (
        <PostModal
          isOpen={postModal}
          setOpen={setPostModal}
          post={photo}
          comments={photo.comments}
        />
      )}
    </div>
  );
};

export default PhotoThumbnail;

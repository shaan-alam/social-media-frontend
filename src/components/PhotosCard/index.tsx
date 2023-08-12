import { PostType } from "../Post/types";
import { Link } from "react-router-dom";

interface Props {
  photos: PostType[];
}

const PhotosCard = ({ photos }: Props) => {
  return (
    <div className="sidebar-item bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
      <h1 className="font-bold text-3xl mb-5">Photos</h1>
      {photos?.length === 0 && (
        <div className="w-full text-center bg-gray-200 p-2 rounded-lg">
          <p className="font-semibold">No photos to show!</p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {photos?.map((photo) => (
          <Link to="#!" className="hover:opacity-95" key={photo._id}>
            <img
              src={photo.thumbnailURL}
              alt={photo.caption}
              className={`${photo.filter ? photo.filter : ""}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotosCard;

import Modal from "../index";
import Avatar from "../../Avatar";
import Comment from "../../Comment/index";
import { Props } from "./types";

const PostModal = ({ isOpen, setOpen, post, comments }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      setOpen={setOpen}
      modalTitle={`${post.author.fullName}'s Photo`}
    >
      <div className="p-4 overflow-y-auto">
        <div className="overflow-y-auto" style={{ height: "90vh" }}>
          <img
            src={post.imageURL}
            alt={post.caption}
            className={`${post.filter}`}
          />
          <Avatar
            src={post.author.avatar}
            withName
            name={post.author.fullName}
            className="h-10 w-10 rounded-full my-6"
          />
          <p className="leading-7">{post.caption}</p>
          <h3 className="text-gray-600 font-medium my-6">
            {comments.length > 0 ? "Comments" : "No commnets"}
          </h3>
          <div className="comments">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;

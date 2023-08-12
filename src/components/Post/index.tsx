import { useState, useRef } from "react";
import { PostType } from "./types";
import PostActions from "./PostActions";
import PostStats from "./PostStats";
import Avatar from "../Avatar";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import { Counters } from "./PostActions/types";
import PostDropdown from "./PostDropdown";
import { useUser } from "../../hooks/user";
import PostComment from "../Comment";
import { Comment } from "./types";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../Button";
import EmojiPicker from "../EmojiPicker";
import loader from "../../assets/svg/loader-dark.svg";
import { useFetchComments, useCreateComment } from "../../hooks/comments";

const Post = ({ post }: { post: PostType }) => {
  const user = useUser();
  const [comments, setComments] = useState<Comment[]>([]);

  console.log("i got the post", post);

  const { refetch, isLoading, isFetching } = useFetchComments(
    post._id,
    setComments
  );

  const [counters, setCounters] = useState<Counters[]>(
    post?.reactions?.reactions.map(
      ({ emoji, by: { _id, fullName, avatar } }) => ({
        emoji,
        by: {
          userID: _id,
          fullName,
          avatar,
        },
      })
    )
  );

  const mutation = useCreateComment(post._id, (result) =>
    setComments([result.data.comment, ...comments])
  );

  // CommentBox Ref to focus on the comment Box when clicked on the comment icon
  const commentBox = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: yup.object({
      comment: yup.string().trim().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const newComment = {
        message: values.comment,
        author: user._id,
      };

      try {
        await mutation.mutateAsync(newComment);
        setSubmitting(false);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="post mb-3 p-4 bg-white shadow-sm w-full mx-auto rounded-lg">
      <div className="flex items-center justify-between bg-white mb-3 pt-4">
        <Avatar
          src={post?.author?.avatar}
          className="h-7 w-7 rounded-full"
          name={post?.author?.fullName}
          withName
          link={`/profile/${post?.author?._id}/posts`}
        />
        {post.author._id === user._id && <PostDropdown post={post} />}
      </div>
      <PostImage
        image={post?.imageURL}
        caption={post?.caption}
        filter={post?.filter}
      />
      <PostCaption caption={post?.caption} />
      <PostStats counters={counters} comments={post.commentCount} />
      <PostActions
        commentBox={commentBox}
        post={post}
        setCounters={setCounters}
      />
      <div className="add-comment flex items-center">
        <Avatar src={user?.avatar} className="h-7 w-7 rounded-full mt-3 mr-2" />
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full rounded-full mt-3 bg-gray-100 flex items-center justify-between">
            <input
              ref={commentBox}
              type="text"
              className="w-full p-2 rounded-full outline-none bg-gray-100"
              placeholder="Comment..."
              {...formik.getFieldProps("comment")}
            />
            <EmojiPicker
              onEmojiSelect={(emoji: string) =>
                formik.setFieldValue(
                  "comment",
                  `${formik.values.comment} ${emoji}`
                )
              }
            />
            <Button
              type="submit"
              text="POST"
              variant="default"
              isLoading={formik.isSubmitting}
              className="py-2 px-3 rounded-full flex-shrink"
            />
          </div>
        </form>
      </div>
      <div className="comments">
        {comments &&
          comments.map((comment) => (
            <PostComment key={comment._id} comment={comment} />
          ))}
      </div>
      {post.commentCount > comments.length && comments.length !== 0 ? (
        <span
          className="text-gray-600 cursor-pointer hover:underline flex items-center text-sm"
          onClick={() => refetch()}
        >
          View More &nbsp;{(isLoading || isFetching) && <img src={loader} />}
        </span>
      ) : null}
    </div>
  );
};

export default Post;

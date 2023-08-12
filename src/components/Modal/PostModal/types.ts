interface CommentType {
  _id: string;
  date: string;
  message: string;
  author: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  commentRepliesCount: number;
  commentLikes: { _id: string; by: string }[];
  postId: string;
}

type PostType = {
  _id: string;
  caption: string;
  imageURL: string;
  thumbnailURL: string;
  author: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  filter: string;
  reactions: {
    reactions: Array<{
      _id: string;
      emoji: string;
      by: {
        _id: string;
        fullName: string;
        avatar: string;
      };
    }>;
  };
  comments: CommentType[];
  commentCount: number;
};

export interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comments: CommentType[];
  post: PostType;
}

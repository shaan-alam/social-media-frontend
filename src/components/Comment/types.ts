export interface CommentReplyInterface {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

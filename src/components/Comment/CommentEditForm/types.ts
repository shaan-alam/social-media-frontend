import React from "react";

export interface CommentEditFormInterface {
  isReply: boolean;
  setCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
  initialComment: string;
  commentId?: string;
  commentReplyId?: string
}

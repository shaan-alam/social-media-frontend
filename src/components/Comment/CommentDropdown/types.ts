import React from "react";

export interface CommentDropdownProps {
  onEditBtnClick: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: React.MouseEventHandler<HTMLDivElement> | undefined;
  isCommentReply: boolean
}

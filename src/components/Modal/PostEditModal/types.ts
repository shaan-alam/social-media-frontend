import React from "react";
import { PostType } from "../../Post/types";

export interface PostEditModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
}

import { PostType } from "../types";

export interface Counters {
  emoji: string;
  by: {
    userID: string;
    fullName: string;
    avatar: string;
  };
}

export interface Reaction {
  name: string;
  label: string;
  icon: string;
  textColor: string;
}

export interface PostActionsProps {
  commentBox: React.RefObject<HTMLInputElement>;
  post: PostType;
  setCounters: React.Dispatch<React.SetStateAction<Counters[]>>;
}

import { UseQueryResult } from "react-query";

export type Profile = UseQueryResult<
  | {
      _id: string;
      fullName: string;
      avatar: string;
      cover_picture: string;
      createdAt: string;
      details: {
        lives_in_city: string;
        from_city: string;
        bio: string;
        works: string[];
        education: string[];
      };
      followers: Array<{
        _id: string;
        fullName: string;
        avatar: string;
      }>;
      following: Array<{
        _id: string;
        fullName: string;
        avatar: string;
      }>;
    }
  | undefined,
  unknown
>;

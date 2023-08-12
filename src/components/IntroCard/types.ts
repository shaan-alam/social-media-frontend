import React from "react";

export interface Props {
  
  details:
    | {
        lives_in_city: string;
        from_city: string;
        works: string[];
        education: string[];
      }
    | undefined;
  followers: number | undefined;
  following: number | undefined;
  createdAt: string | undefined;
}

export type IntroCardType = ({
  details,
  followers,
  following,
  createdAt,
}: Props) => JSX.Element;

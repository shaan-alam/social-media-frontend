import React from 'react';

export interface PostStatsModalInterface {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  counters: Array<{
    emoji: string;
    by: { userID: string; fullName: string; avatar: string };
  }>;
}

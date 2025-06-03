type UserProfile = {
  username: string;
  name: string;
  avatar?: string;
  title: string;
  url: string;
  fide?: number;
  status?: string;
  followers?: number;
  verified?: boolean;
  is_streamer?: boolean;
  joined: number;
};

export type { UserProfile };

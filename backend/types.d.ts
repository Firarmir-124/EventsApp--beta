import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
}

export interface EventType {
  title: string;
  description: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: string;
  hashtag: Types.ObjectId;
  user: Types.ObjectId;
  createDate: string;
  viewsCount: number;
}

export interface HashtagType {
  name: string;
}

export interface Filter {
  titleEvent: string[];
  titleHashtag: string;
  dateTimeEvent: string;
}

export interface Filter2 {
  title: {
    $in: string[];
  };
  hashtag: string;
  time: string;
}

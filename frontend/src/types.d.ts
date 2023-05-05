export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface EventList {
  _id: string;
  title: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: string;
  hashtag: {
    _id: string;
    name: string;
  };
  user: string;
  viewsCount: number;
}

export interface TitleEventsType {
  _id: string;
  title: string;
}

export interface EventListFull {
  length: number;
  perPage: number;
  eventList: EventList[];
  pages: number;
}

export interface EventOne {
  _id: string;
  title: string;
  description: string;
  speaker: [
    {
      name: string;
    },
  ];
  time: string;
  image: File | null;
  hashtag: string;
  user: string;
}

export interface EventMutation {
  title: string;
  description: string;
  time: string;
  image: File | null;
  hashtag: string;
  speaker: {
    name: string;
  }[];
}

export interface HashtagListType {
  _id: string;
  name: string;
}

export interface HashtagMutation {
  name: string;
}

export interface TypesCallTable {
  id: string;
  name: string;
  fullName: string;
  show: boolean;
}

export interface Filter {
  titleEvent: TitleEventsType[];
  titleHashtag: string;
  dateTimeEvent: string;
}

export interface FilterMutation {
  title: { $in: string[] } | null;
  hashtag: string | null;
  time: string | null;
}

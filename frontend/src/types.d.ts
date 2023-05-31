export interface AlertType {
  _id: string;
  viewed: boolean;
  eventId: {
    _id: string;
    title: string;
  };
  status: boolean;
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  alert: AlertType[];
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

export interface GuestType {
  _id: string;
  phone: string;
  name: {
    _id: string;
    displayName: string;
  };
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
  address: string;
  guest: GuestType[];
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
  viewsCount: number;
  address: string;
  guest: GuestType[];
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
  address: string;
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

export interface RecordUser {
  phone: string;
  description: string;
}

export interface RecordUserList {
  _id: string;
  name: {
    _id: string;
    displayName: string;
  };
  phone: string;
  description: string;
  event: {
    _id: string;
    title: string;
  };
  status: string;
}

export interface ListFavoritesType {
  _id: string;
  image: string;
  title: string;
}

export interface EventFavoritesType {
  list: ListFavoritesType;
  show: boolean;
  _id: string;
}

export interface FavoritesType {
  _id: string;
  event: EventFavoritesType[];
  user: string;
}

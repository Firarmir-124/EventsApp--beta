import { Types } from 'mongoose';

export interface AlertType {
  viewed: boolean;
  eventId: string;
  status: boolean;
}

export interface IUser {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  alert: AlertType[];
  online: boolean;
}

export interface IUserId extends IUser {
  _id: string;
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
  address: string;
  guest: Types.ObjectId[];
  checked: boolean;
}

export interface HashtagType {
  name: string;
}

export interface RecordUserType {
  name: Types.ObjectId;
  phone: string;
  description: string;
  event: Types.ObjectId;
  status: string;
}

export interface CommercialLinkType {
  event: string[];
  description: string;
  shortUrl: string;
  fullLink: string;
  title: string;
}

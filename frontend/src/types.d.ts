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

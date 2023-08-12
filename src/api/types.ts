export interface SignUpDataType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Reaction {
  emoji: string;
  by: string;
}

export interface NewPost {
  filter: string;
  caption: string;
  image: string;
}

export interface EditPost {
  caption: string;
}

export interface GoogleAuthentication {
  avatar: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

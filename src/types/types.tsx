export type PostsType = {
  id: Number;
  message: String;
  likesCount: Number;
};

export type ContactsProfile = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userID: Number;
  lookingForAJob: Boolean;
  lookingForAJobDescription: string;
  fullNane: string;
  contacts: ContactsProfile;
  photos: PhotosType;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
};

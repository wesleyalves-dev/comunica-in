export interface UserRaw {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends UserRaw {
  createdAtFormatted: string;
  updatedAtFormatted: string;
}

export interface User {
  id: string;
  username: string;
}

export interface UserState extends User {
  fetching: boolean;
}

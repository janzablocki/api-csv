export interface InputData {
  ['first name']?: string;
  ['last name']?: string;
  email?: string;
  ['role description']?: string;
  team?: string;
}

export interface FormattedInputData {
  first_name?: string | null;
  last_name?: string | null;
  email: string | null;
  role_description?: string | null;
  team: string | null;
}

export interface UserInsertResponse {
  user: FormattedUserData;
  created: boolean;
  detail: string;
  err_code?: string;
}

export interface TeamInsertResponse {
  team: string;
  created: boolean;
  detail: string;
  err_code?: string;
}

export interface UserData {
  id: number,
  first_name: string | null,
  last_name: string | null,
  email: string | null,
  role_description: string | null,
  team: string | null,
}

export interface TeamData {
  team: string;
  id: number;
}

export interface TeamWithUsers extends TeamData {
  users: UserData[];
}

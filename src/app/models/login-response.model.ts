export interface User {
  username: string;
  password: string;
  role: 'Admin' | 'User';
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  expiration: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
}
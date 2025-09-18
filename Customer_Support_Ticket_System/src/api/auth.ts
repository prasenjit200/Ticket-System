

import axios from 'axios';

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: any;
}

export const signIn = async (data: SignInData): Promise<SignInResponse> => {
  const response = await axios.post('https://localhost:7238/api/Auth/signin', {
    email: data.email,
    Password: data.password,
  });

  return response.data;
};


// signup ->
export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export const signUp = async (data: SignUpData) => {
  const response = await axios.post('https://localhost:7238/api/Auth/register', {
    firstNamem: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash: data.passwordHash,
  });
  return response.data;
};

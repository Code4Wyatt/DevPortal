import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/auth/developer-login",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const employerApi = createApi({
  reducerPath: "employerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/auth/employer-login",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/",
          method: "post",
          body,
        };
      },
    }),
  }),
});

let email = localStorage.getItem('email')
let token = localStorage.getItem('token')

export const userApi = createApi({
  reducerPath: "fetchUserDetails",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/developer/currentUser/`,
    headers: { Authorization: "Bearer " + token}
  }),
  endpoints: (builder) => ({
    getDeveloperDetails: builder.query({
      query: () => {
        return {
          url: `/${email}`,
          method: "get",
        };
      },
    }),
  }),
});

const login = async (email: string, password: string) => {
  try {
    let response = await fetch(`http://localhost:8000/auth/developer-login`, {
      method: "POST",
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchCurrentUser = async (email: string) => {
  try {
    let response = await fetch(
      `http://localhost:8000/developer/currentUser/${email}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};


export { login, fetchCurrentUser };
export const { useLoginUserMutation } = authApi
export const { useGetDeveloperDetailsQuery } = userApi

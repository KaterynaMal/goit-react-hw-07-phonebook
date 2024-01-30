import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: 'https://65b2d3769bfb12f6eafe7a18.mockapi.io',
});

export const requestContacts = createAsyncThunk(
  'contacts/requestContacts',
  async () => {
    const { data } = await instance.get('/contacts');
    return data;
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contactData) => {
    const { data } = await instance.post('/contacts', contactData);
    return data;
  }
);

export const deleteContactApi = createAsyncThunk(
  'contacts/deleteContactApi',
  async (contactId) => {
    await instance.delete(`/contacts/${contactId}`);
    return contactId;
  }
);

// export const requestPostDetailsById = async postId => {
//   const { data } = await instance.get(`/posts/${postId}`);
//   return data;
// };

// export const requestPostsByQuery = async searchTerm => {
//   const { data } = await instance.get(`/posts?q=${searchTerm}`);
//   return data;
// };
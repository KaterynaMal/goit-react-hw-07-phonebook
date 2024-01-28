import axios from "axios";

const instance = axios.create({
  baseURL: 'https://65b2d3769bfb12f6eafe7a18.mockapi.io',
});

export const requestContacts = async () => {
  const { data } = await instance.get('/contacts');
  return data;
};

// export const requestPostDetailsById = async postId => {
//   const { data } = await instance.get(`/posts/${postId}`);
//   return data;
// };

// export const requestPostsByQuery = async searchTerm => {
//   const { data } = await instance.get(`/posts?q=${searchTerm}`);
//   return data;
// };
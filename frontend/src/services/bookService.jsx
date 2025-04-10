import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const getBooks = () => axios.get(`${API_BASE_URL}/books`);
export const addBook = (book) => axios.post(`${API_BASE_URL}/books`, book);
export const updateBook = (id, book) =>
  axios.put(`${API_BASE_URL}/books/${id}`, book);
export const deleteBook = (id) => axios.delete(`${API_BASE_URL}/books/${id}`);

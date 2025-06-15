import axios from "axios";

const API_URL = "http://localhost:8080/api/books";

export const getBooks = () => axios.get(API_URL);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
export const getBookById = (id) => axios.get(`${API_URL}/${id}`);
export const updateBook = (id, book) => axios.put(`${API_URL}/${id}`, book);

export const uploadBook = (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

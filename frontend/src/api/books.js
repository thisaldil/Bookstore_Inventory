import axios from "axios";

const API_URL = "https://bookstore-inventory-nk4s.onrender.com/api/books";
export const getBooks = () => axios.get(API_URL);

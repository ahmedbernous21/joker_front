import axios from "axios";

const ENV = import.meta.env.VITE_ENV;

const customAxios = axios.create({
  baseURL:
    ENV == "developement"
      ? "http://localhost:8000/api/"
      : "htpps://some url",
});

export default customAxios;

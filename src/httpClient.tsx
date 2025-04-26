import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { environment } from "./enviroments/enviroment";

const API_URL = environment.browserApiEndpoint;

const HttpClient = {
  get: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const token = localStorage.getItem('token');
    const headers = {
      ...(token && { Authorization: `Token ${token}` })
    };
    
    const response: AxiosResponse<T> = await axios.get(`${API_URL}${endpoint}`, {
      headers,
      ...config,
    });
    return response.data;
  },

  post: async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const token = localStorage.getItem('token');
    const headers = {
      ...(token && { Authorization: `Token ${token}` })
    };
    
    const response: AxiosResponse<T> = await axios.post(`${API_URL}${endpoint}`, data, {
      headers,
      ...config,
    });
    return response.data;
  },

  delete: async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const token = localStorage.getItem('token');
    const headers = {
      ...(token && { Authorization: `Token ${token}` })
    };
    
    const response: AxiosResponse<T> = await axios.delete(`${API_URL}${endpoint}`, {
      headers,
      ...config,
    });
    return response.data;
  },

  put: async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const token = localStorage.getItem('token');
    const headers = {
      ...(token && { Authorization: `Token ${token}` })
    };
    
    const response: AxiosResponse<T> = await axios.put(`${API_URL}${endpoint}`, data, {
      headers,
      ...config,
    });
    return response.data;
  },
};

export default HttpClient;
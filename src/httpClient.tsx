interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  async post<T>(
    url: string,
    body: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  async put<T>(
    url: string,
    body: unknown,
    options: RequestOptions = {},
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }

  private async request<T>(url: string, options: RequestOptions): Promise<T> {
    try {
      const response = await fetch(this.baseURL + url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Unknown error occurred");
    }
  }
}

import { environment } from "./enviroments/enviroment";
const httpClient = environment.httpEndpoint;
export default new HttpClient(`${httpClient}/api/`);
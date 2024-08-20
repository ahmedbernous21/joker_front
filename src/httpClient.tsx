class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  async post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  async put(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: "DELETE" });
  }

  async request(url, options) {
    try {
      const response = await fetch(this.baseURL + url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
import { environment } from "./enviroments/enviroment";
const httpClient = environment.httpEndpoint;
export default new HttpClient(`${httpClient}/api/`);

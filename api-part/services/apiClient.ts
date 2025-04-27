import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for logging and error handling
    this.client.interceptors.response.use(
      (response) => {
       // console.log(`[${response.status}] ${response.config.method?.toUpperCase()} ${response.config.url}`);
        return response;
      },
      (error) => {
        if (error.response) {
          console.error(
            `[${error.response.status}] ${error.config.method?.toUpperCase()} ${error.config.url}:`,
            error.response.data
          );
        } else {
          console.error('API Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    this.authToken = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(endpoint, config);
  }

  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(endpoint, data, config);
  }

  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(endpoint, data, config);
  }

  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(endpoint, config);
  }

  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(endpoint, data, config);
  }
}
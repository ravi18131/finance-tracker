import axios, { AxiosResponse } from "axios";

interface ApiResponse<T> {
  error: string;
  success: boolean;
  data: T;
}

let endpoint = "https://taxnexus-fedl.onrender.com/api/v1/admin";
if (window.origin.includes("taxnexus-admin.vercel.app")) {
  endpoint = "https://taxnexus-fedl.onrender.com/api/v1/admin";
}

if (window.origin.includes("localhost")) {
  endpoint = "http://localhost:5021/api/v1";
}

/**
 * Initializing axios instance
 */
const fetchApi = axios.create({
  baseURL: endpoint,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Axios Interceptor
 */
fetchApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const upload_file = async <T>(
  url: string,
  file: File,
  folder: string
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response: AxiosResponse<ApiResponse<T>> = await fetchApi.post<
      ApiResponse<T>
    >(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export default fetchApi;

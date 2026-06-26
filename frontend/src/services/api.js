import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

export const analyzeApps = async (apps) => {
  const response = await api.post("/api/analyze", {
    apps,
  });

  return response.data;
};

export default api;
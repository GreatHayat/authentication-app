import axios from "axios";

const apiEndpoints = {
  user: {
    users: "/users",
  },
};

const API_ROOT = "http://localhost:5000/api";

const client = axios.create({ baseURL: API_ROOT });

client.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export { client, apiEndpoints };

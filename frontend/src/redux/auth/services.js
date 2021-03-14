import axios from "axios";
import { apiEndpoints, client } from "../../config/api";

const getUsers = async () => {
  const users = await client.get(apiEndpoints.user.users);
  return users;
};

export const authService = {
  getUsers,
};

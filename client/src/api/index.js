import axios from "axios";

const api = axios.create({ baseURL: "/api" });



export const setAuthHeader = function(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const clearAuthHeader = function() {
  delete api.defaults.headers.common["Authorization"];
};

export const addtag = async (input) => {
  console.log("POST" , input)
  const response = await api.post("/addtag:uuid",input)
  return response.data
}

export const create = async (newStore) => {
  console.log("POST", newStore)
  const response = await api.post("/butiker/newstore", newStore)
  return response.data
};
export const register = async (newUser) => {
  console.log("POST /register", " - Payload: ", newUser);
  const response = await api.post("/register", newUser);
  // console.log("Response: ", response);
  return response.data;
};

export const login = async (credentials) => {
  console.log("POST /auth", " - Payload: ", credentials);
  const response = await api.post("/auth", credentials);
  // console.log("Response: ", response);
  return response.data;
};
export const remove = async userToBeRemoved => {
  console.log("DELETE /", userToBeRemoved)
  const response = await api.post("/delete", JSON.stringify({email:userToBeRemoved}), {headers:{
    'content-type': 'text/json'
  } })
  console.log("Response", response);
  return response
}
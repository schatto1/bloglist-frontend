import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const updateUrl = `${baseUrl}/${newObject.id}`;

  const response = await axios.put(updateUrl, newObject, config);
  return response.data;
};

const remove = async (toRemove) => {
  const config = {
    headers: { Authorization: token },
  };

  const deleteUrl = `${baseUrl}/${toRemove.id}`;

  const response = await axios.delete(deleteUrl, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };

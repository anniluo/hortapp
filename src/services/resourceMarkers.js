import axios from 'axios';
const baseUrl = '/api/resourceMarkers';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newMarkerObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newMarkerObject, config);
  return response.data;
};

const update = (id, newMarkerObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newMarkerObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };

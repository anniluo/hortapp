import axios from 'axios';
const baseUrl = '/api/users';

const getOneWith = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newUserObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newUserObject);
  return request.then((response) => response.data);
};

export default { getOneWith, update };

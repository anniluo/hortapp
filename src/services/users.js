import axios from 'axios';
const baseUrl = '/api/users';

const setToStorage = (key, user) => {
  window.sessionStorage.setItem(key, JSON.stringify(user));
};

const getFromStorage = (key) => {
  return window.sessionStorage.getItem(key);
};

const clearStorage = (key) => {
  window.sessionStorage.removeItem(key);
};

const getOneWith = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newUserObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newUserObject);
  return request.then((response) => response.data);
};

export default { getOneWith, update, setToStorage, clearStorage, getFromStorage };

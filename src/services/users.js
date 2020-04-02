import axios from 'axios';
const baseUrl = '/api/users';

const setToLocalStorage = (key, user) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

const getFromLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

const clearLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

const getOneWith = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newUserObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newUserObject);
  return request.then((response) => response.data);
};

export default { getOneWith, update, setToLocalStorage, clearLocalStorage, getFromLocalStorage };

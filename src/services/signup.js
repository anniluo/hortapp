import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/signup';

const signup = async (newUserObject) => {
  const response = await axios.post(baseUrl, newUserObject);
  return response.data;
};

export default { signup };

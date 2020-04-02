import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/natureResources';

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };

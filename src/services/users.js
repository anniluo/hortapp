const baseUrl = 'http://localhost:3001/api/users';

const getAll = () => {
  fetch(baseUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('error occured when trying to fetch all the markers', error);
      return error;
    });
};

const create = () => {};

const update = () => {};

export default { getAll, create, update };

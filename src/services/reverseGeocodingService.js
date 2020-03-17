export const getReverseGeocodeWithPosition = () => {
  fetch(
    'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=37.42159&longitude=-122.0837&localityLanguage=en'
  )
    .then(response => {
      console.log('in service success', response);
      return response.json();
    })
    .then(data => {
      console.log('in service after response to json', data);
      return data;
    })
    .catch(error => {
      console.log('in service error', error.message);
    });
};

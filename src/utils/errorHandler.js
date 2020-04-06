const handleError = (error) => {
  console.log('incoming error:', error);
  let errors = [];
  switch (error.message) {
    case 'Network Error':
      errors.push('Network Error');
    case 'User denied geolocation prompt':
      errors.push('User denied geolocation prompt');
    case 'Missing Address':
      errors.push('Address for this location is missing');
    case 'Missing Resource':
      errors.push('Resource for this location is missing');
    case 'Incorrect Match':
      errors.push('Your password and confirmation password do not match.');
      break;
    default:
      errors.push(`Error occured: ${error.message}`);
  }
  console.log(errors);
  return errors;
};

export default { handleError };

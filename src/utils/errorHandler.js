const handleError = (error) => {
  console.log('incoming error:', error);
  let errors = [];
  switch (error.message) {
    case 'Network Error':
      errors.push('Could not fetch markers due to Network Error');
      break;
    case 'User denied geolocation prompt':
      errors.push('Request to get the device location was denied');
      break;
    case 'Missing Address or Resource':
      errors.push('Address and Resource are required');
      break;
    case 'Missing Username or Password':
      errors.push('Username and Password are required');
      break;
    case 'Missing Username, Password or Email':
      errors.push('Email, Username and Password are required');
      break;
    case 'Short Address':
      errors.push('Address must be at least 6 characters long');
      break;
    case 'Short Username or Password':
      errors.push(
        'Username must be at least 4 characters long and Password must be at least 8 characters long'
      );
      break;
    case 'Short Comment':
      errors.push('Comment must be at least 10 characters long');
      break;
    case 'Incorrect Match':
      errors.push('Password and Confirmation password do not match.');
      break;
    default:
      errors.push(`Error occured: ${error.message}`);
  }
  console.log(errors);
  return errors;
};

module.exports = { handleError };

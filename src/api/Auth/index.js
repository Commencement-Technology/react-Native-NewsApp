import axios from 'axios';

// Login User

// eslint-disable-next-line prettier/prettier
export const loginUser = values => {
  const url = 'api/users/login';

  return axios.post(url, values).then(response => response.data);
};

// Register User
// eslint-disable-next-line prettier/prettier
// export const registerUser = values => {
//   const url = 'api/users';

//   return axios.post(url, values).then(response => response.data);
// };

export const registerUser = async values => {
  const url = 'api/users';

  try {
    const response = await axios.post(url, values);
    return response.data;
  } catch (error) {
    throw error;
  }
};

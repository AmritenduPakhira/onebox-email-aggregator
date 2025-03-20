import axios from 'axios';

export const searchEmails = async (query) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching emails:', error);
    throw error;
  }
};

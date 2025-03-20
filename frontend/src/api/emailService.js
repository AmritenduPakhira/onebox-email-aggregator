import axios from 'axios';

const API_URL = 'http://localhost:5000/api/emails';

export const fetchEmails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

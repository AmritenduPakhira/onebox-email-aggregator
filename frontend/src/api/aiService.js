import axios from 'axios';

export const analyzeEmail = async (emailId) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/ai/analyze`, { emailId });
    return response.data;
  } catch (error) {
    console.error('Error analyzing email:', error);
    throw error;
  }
};

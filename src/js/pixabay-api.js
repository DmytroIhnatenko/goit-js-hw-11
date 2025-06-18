import axios from 'axios';
const API_KEY = '50912245-ef7826fa83dec8c0e3bb73371';

export default async function getImagesByQuery(query) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

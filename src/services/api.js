import axios from "axios";

const API_KEY = import.meta.env.VITE_MAKCORPS_API_KEY;
const BASE_URL = "https://api.makcorps.com";

export const fetchCityId = async (cityName) => {
    const response = await axios.get(`${BASE_URL}/mapping?api_key=${API_KEY}&name=${cityName}`)
    console.log(response.data);

    return response.data; 
}

export const fetchHotels = async ({ cityId, roomType, adults, children, checkin, checkout }) => {
    if (!cityId) {
      console.error("Error: Missing cityid in API call.");
      return [];
    }
  
    const url = `${BASE_URL}/city?cityid=${cityid}&pagination=0&cur=USD&roomType=${roomType}&adults=${adults}&children=${children}&checkin=${checkin}&checkout=${checkout}&api_key=${API_KEY}`;
  
    console.log("🛠 Fetching hotels with URL:", url); 
  
    try {
      const response = await axios.get(url);
      console.log("Hotels API Response:", response.data);
  
      return response.data || []; // data returned ?
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return [];
    }
  };
  
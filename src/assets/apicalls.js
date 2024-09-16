import axios from 'axios';

useEffect(() => {
  const fetchTruckData = async () => {
    try {
      const response = await axios.get('/api/trucks');
      setTrucks(response.data);
    } catch (error) {
      console.error('Error fetching truck data:', error);
    }
  };

  fetchTruckData();
}, []);

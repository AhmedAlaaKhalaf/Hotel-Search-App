import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "../services/api";

export const useFetchHotels = (searchParams) => {
    return useQuery({
      queryKey: ["hotels", searchParams],
      queryFn: async () => {
        const data = await fetchHotels(searchParams);
        console.log("Hotels API Response:", data); 
        return data;
      },
      staleTime: 1000 * 60 * 60, 
      retry: false, 
      enabled: !!searchParams.cityId, // that checks if cityid is available or not
    });
  };
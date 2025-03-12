import { useQuery } from "@tanstack/react-query";
import { fetchCityId } from "../services/api";

export const useFetchCityId = (cityName) => {
    return useQuery({
      queryKey: ["cityId", cityName],
      queryFn: () => fetchCityId(cityName),
      staleTime: 1000 * 60 * 60, // cache for 1 hour
      retry: false, 
      enabled: !!cityName, // that checks if cityName is available or not
    });
  };
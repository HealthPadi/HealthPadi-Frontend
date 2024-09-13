//This is the health update hook that is used to fetch health updates. It uses the useQuery hook from react-query to fetch health updates. It also uses the healthUpdateService to fetch health updates. It returns the getHealthUpdatesQuery and useGetHealthUpdateByIdQuery functions that can be used to fetch health updates and health updates by id.

import healthUpdateService from "../services/healthUpdateService";
import { useQuery } from "@tanstack/react-query";

const useHealthUpdate = () => {
  const getHealthUpdatesQuery = useQuery({
    queryKey: ["healthUpdates"],
    queryFn: async () => {
      const response = await healthUpdateService.getHealthUpdate();
      return response.data;
    },
  });

  const useGetHealthUpdateByIdQuery = (id: string) =>
    useQuery({
      queryKey: ["healthUpdate", id],
      queryFn: async () => {
        const response = await healthUpdateService.getHealthUpdateById(id);
        return response.data;
      },
    });

  return {
    getHealthUpdatesQuery,
    useGetHealthUpdateByIdQuery,
  };
};

export default useHealthUpdate;

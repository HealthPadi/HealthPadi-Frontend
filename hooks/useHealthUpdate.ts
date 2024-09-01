import healthUpdateService from "../services/healthUpdateService";
import { useQuery } from "@tanstack/react-query";

const useHealthUpdate = () => {
  const getHealthUpdatesQuery = useQuery({
    queryKey: ["healthUpdates"],
    queryFn: async () => {
      const response = await healthUpdateService.getAllHealthUpdates();
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

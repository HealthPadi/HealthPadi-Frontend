// useHealthUpdate.ts
import { useQuery } from "@tanstack/react-query";
import healthUpdateService from "../services/healthUpdateService";

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

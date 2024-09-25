import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/userService";
import { NoUserReport } from "../services/userService";

const useUser = () => {
  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await UserService.getUsers();
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
  });

  const useGetUserReportsQuery = (userId: string) =>
    useQuery({
      queryKey: ["userReports", userId],
      queryFn: async () => {
        if (!userId) {
          throw new Error("Invalid user ID");
        }
        try {
          const response = await UserService.getUserReport(userId);
          if ("message" in response.data) {
            return [];
          } else {
            return response.data.data;
          }
        } catch (error) {
          console.error("Error fetching user reports:", error);
          throw new Error(
            error instanceof Error ? error.message : String(error)
          );
        }
      },
    });

  return {
    getUsersQuery,
    useGetUserReportsQuery,
  };
};

export default useUser;

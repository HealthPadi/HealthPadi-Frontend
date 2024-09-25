import { useMutation } from "@tanstack/react-query";
import AdminToggleService, {
  AdminToggleRequest,
  AdminToggleResponse,
} from "@/services/adminToggle.Service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const useAdminToggle = () => {
  const adminToggleMutation = useMutation({
    mutationFn: async (requestBody: AdminToggleRequest) => {
      const response: { data: { data: AdminToggleResponse } } =
        await AdminToggleService.adminToggle(requestBody);
      return response.data.data; // Return only the response data
    },
    onError: (error: AxiosError) => {
      // Handle error (optional)
      console.error(error);
      toast.error("Failed to update status");
    },
    onSuccess: (data: AdminToggleResponse) => {
      toast.success("Status updated successfully");
    },
  });

  return {
    adminToggleMutation,
  };
};

export default useAdminToggle;

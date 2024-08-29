import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AxiosResponseMessage from "@/lib/axiosResponseMessage";
import { ReportRequest } from "../services/reportService";
import reportService from "../services/reportService";
import toast from "react-hot-toast";
import { useAuthState } from "../store/authStore"; // Assuming you have an auth store

const useReport = () => {
  const { token = "" } = useAuthState(); // Assuming token is stored in auth state

  const createReportMutation = useMutation({
    mutationFn: async (data: ReportRequest) => {
      const response = await reportService.createReport(data, token);
      toast.success("Report submitted successfully", {
        duration: 3000,
        icon: "🎉",
      });
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.error(AxiosResponseMessage(error));
      toast.error("Report submission failed", {
        duration: 3000,
        icon: "❌",
      });
    },
  });

  return {
    createReportMutation,
  };
};

export default useReport;

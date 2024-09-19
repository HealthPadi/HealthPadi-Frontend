import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AxiosResponseMessage from "@/lib/axiosResponseMessage";
import { ReportRequest } from "../services/reportService";
import reportService from "../services/reportService";
import toast from "react-hot-toast";
import { useAuthState } from "../store/authStore";

const useReport = () => {
  const { token = "" } = useAuthState();

  const createReportMutation = useMutation({
    mutationFn: async (data: ReportRequest) => {
      console.log("Sending report data to server:", data);
      const response = await reportService.createReport(data, token);

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

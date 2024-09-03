//This is the report hook that is used to create a report. It uses the useMutation hook from react-query to create a report mutation. It also uses the useAuthState hook to get the authentication token from the auth store. It returns the createReportMutation function that can be used to create a report.

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

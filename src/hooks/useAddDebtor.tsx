import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../API";
import { message } from "antd";

interface DebtorData {
  full_name: string;
  address: string;
  description: string;
  store: string;
  phone_numbers: string[];
  images: string[];
}

const useAddDebtor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DebtorData) => {
      try {
        console.log("Sending data to API:", data);

        const response = await API.post("/debtor", data);

        console.log("API Response:", response.data);

        return response.data;
      } catch (error: any) {
        console.error("Error details:", error.response?.data);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Success response:", data);
      message.success("Qarzdor muvaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      console.error("Error response:", error.response?.data);
      message.error(
        error.response?.data?.message || "Qarzdor qo'shishda xatolik yuz berdi"
      );
    },
  });
};

export default useAddDebtor;

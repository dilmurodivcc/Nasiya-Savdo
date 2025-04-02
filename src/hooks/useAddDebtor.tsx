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
  debt_sum: string;
  duration: number;
}

const useAddDebtor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DebtorData) => {
      try {
        const formData = new FormData();
        formData.append("full_name", data.full_name);
        formData.append("address", data.address || "");
        formData.append("description", data.description || "");
        formData.append("store", "default store");
        data.phone_numbers.forEach((number) => {
          formData.append("phone_numbers[]", number);
        });
        formData.append("debt_sum", data.debt_sum);
        formData.append("duration", data.duration.toString());

        if (data.images && data.images.length > 0) {
          data.images.forEach((image) => {
            formData.append("images[]", image);
          });
        }

        const response = await API.post("/debtor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      message.success("Qarzdor muvaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      console.error("Error details:", error.response?.data);
      message.error(
        error.response?.data?.message || "Qarzdor qo'shishda xatolik yuz berdi"
      );
    },
  });
};

export default useAddDebtor;

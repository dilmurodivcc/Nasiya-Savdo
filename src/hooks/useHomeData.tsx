import { useQuery } from "@tanstack/react-query";
import API from "../API";
import { message } from "antd";

interface HomeData {
  total_debt: number;
  delayed_payments: number;
  total_customers: number;
  wallet_balance: number;
  payment_history: {
    amount: number;
    date: string;
  }[];
}

const fetchHomeData = async (): Promise<HomeData> => {
  try {
    const response = await API.get("/store/statistics");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 500) {
      message.error(
        "Serverda xatolik yuz berdi. Iltimos qayta urinib ko'ring."
      );
    }
    throw error;
  }
};

const useHomeData = () => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
    retry: 1, // Only retry once if request fails
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};

export default useHomeData;

import { useQuery } from "@tanstack/react-query";
import API from "../API";

interface PhoneNumber {
  id: number;
  number: string;
}

interface Debt {
  id: number;
  debt_sum: string;
}

export interface Customer {
  id: string;
  full_name: string;
  phone_numbers: PhoneNumber[];
  debts: Debt[];
  is_starred: boolean;
}

interface CustomersResponse {
  data: Customer[];
}

const useCustomers = (searchTerm: string) => {
  return useQuery<CustomersResponse>({
    queryKey: ["customers", searchTerm],
    queryFn: async () => {
      const response = await API.get("/customers", {
        params: { search: searchTerm },
      });
      return response.data;
    },
  });
};

export default useCustomers;

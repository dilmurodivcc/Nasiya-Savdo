import { useQuery } from "@tanstack/react-query";
import API from "../API";

interface PhoneNumber {
  number: string;
}

interface Debt {
  debt_sum: string;
  debt_status: string;
  total_debt_sum?: string;
}

export interface Customer {
  id: string;
  full_name: string;
  phone_numbers: PhoneNumber[];
  address: string;
  description?: string;
  debts: Debt[];
  created_at: string;
  updated_at: string;
  is_starred?: boolean;
}

interface CustomersResponse {
  data: Customer[];
  total: number;
}

const useCustomers = (searchTerm: string) => {
  return useQuery<CustomersResponse>({
    queryKey: ["customers", searchTerm],
    queryFn: async () => {
      const response = await API.get("/debtor", {
        params: {
          spik: 0,
          take: 10,
          ...(searchTerm && { search: searchTerm }),
        },
      });
      return response.data;
    },
  });
};

export default useCustomers;

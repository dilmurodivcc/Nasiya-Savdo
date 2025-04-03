import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../API";
import { Customer } from "./useCustomers";

const useCustomerDetail = (id: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<{ data: Customer }>({
    queryKey: ["customer", id],
    queryFn: async () => {
      const response = await API.get(`/debtor/${id}`);
      return response.data;
    },
  });

  const deleteCustomer = useMutation({
    mutationFn: async () => {
      console.log("Making delete request to:", `/debtor/${id}`);
      try {
        const response = await API.delete(`/debtor/${id}`);
        console.log("Delete response:", response);
        return response.data;
      } catch (error) {
        console.error("Delete request failed:", error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log("Delete mutation succeeded");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      console.error("Delete mutation failed:", error);
    },
  });

  const toggleStar = useMutation({
    mutationFn: async () => {
      const response = await API.post(`/debtor/${id}/toggle-star`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", id] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  return {
    customer: data?.data,
    isLoading,
    error,
    deleteCustomer,
    toggleStar,
  };
};

export default useCustomerDetail;

import { data, useNavigate, useParams } from "react-router-dom";
import { Button, Progress, Spin, message } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useCustomerDetail from "../hooks/useCustomerDetail";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import "./CustomerDetail.css";
import { useQuery } from "@tanstack/react-query";
import API from "../API";

interface Debt {
  id: string;
  created_at: string;
  updated_at: string;
  total_debt_sum: string;
  total_month: number;
  next_payment_date: string;
  debt_status: string;
  debt_period: number;
  debt_sum: string;
  description: string;
  images: {
    id: string;
    created_at: string;
    updated_at: string;
    image: string;
  }[];
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Mijozni o'chirish</h3>
        <p>Haqiqatan ham bu mijozni o'chirmoqchimisiz?</p>
        <div className="modal-actions">
          <Button onClick={onClose}>Yo'q</Button>
          <Button type="primary" danger onClick={onConfirm} loading={isLoading}>
            Ha
          </Button>
        </div>
      </div>
    </div>
  );
};

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customer, isLoading, error, deleteCustomer, toggleStar } =
    useCustomerDetail(id || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      console.log("Deleting customer with ID:", id);
      await deleteCustomer.mutateAsync();
      console.log("Delete mutation completed successfully");
      message.success("Mijoz muvaffaqiyatli o'chirildi");
      navigate("/customers");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Mijozni o'chirishda xatolik yuz berdi");
      setIsDeleting(false);
    }
    setIsModalOpen(false);
  };

  const {
    data: client,
    isLoading: isClientLoading,
    error: clientError,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      try {
        const response = await API.get(`/debtor/${id}`);
        if (!response.data) {
          throw new Error("Mijoz ma'lumotlari topilmadi");
        }
        return response.data;
      } catch (error: any) {
        console.error("Error fetching client:", error);
        if (error.response?.status === 404) {
          throw new Error("Mijoz topilmadi");
        }
        throw new Error(
          error.response?.data?.message ||
            "Mijoz ma'lumotlarini olishda xatolik yuz berdi"
        );
      }
    },
    enabled: !!id,
    retry: false,
  });

  const {
    data: debts,
    isLoading: isDebtsLoading,
    error: debtsError,
  } = useQuery({
    queryKey: ["debts", id],
    queryFn: async () => {
      try {
        const response = await API.get(`/debts?debtor_id=${id}`);
        console.log("API Response:", response);
        console.log("Debts data:", response.data);
        if (!response.data) {
          return [];
        }
        return response.data.data || [];
      } catch (error: any) {
        console.error("Error fetching debts:", error);
        return [];
      }
    },
    enabled: !!client,
  });

  console.log("Current debts state:", debts);

  const calculateProgress = (paid: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((paid / total) * 100);
  };

  if (isClientLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (clientError) {
    return (
      <div className="error-message">
        <h3>Xatolik yuz berdi</h3>
        <p>{(clientError as Error).message}</p>
        <Button onClick={() => navigate("/customers")} type="primary">
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="error-message">
        <h3>Xatolik yuz berdi</h3>
        <p>Mijoz ma'lumotlari topilmadi</p>
        <Button onClick={() => navigate("/customers")} type="primary">
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  const totalDebt = (debts || []).reduce((sum: number, debt: Debt) => {
    return sum + parseFloat(debt.debt_sum || "0");
  }, 0);

  return (
    <>
      <div className="customer-detail-page">
        <div className="container">
          <Header />
          <div className="customer-detail-header">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/customers")}
            >
              Orqaga
            </Button>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              O'chirish
            </Button>
          </div>

          <div className="customer-info">
            <div className="customer-name-section">
              <h2>{client.full_name}</h2>
              <button className="star" onClick={() => toggleStar.mutate()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.713 3.45624C12.6501 3.32003 12.5496 3.20468 12.4232 3.12382C12.2969 3.04297 12.15 3 12 3C11.85 3 11.7031 3.04297 11.5768 3.12382C11.4504 3.20468 11.3499 3.32003 11.287 3.45624L9.03344 8.34031L3.69315 8.97399C3.54415 8.99158 3.40331 9.05149 3.2873 9.14662C3.17129 9.24176 3.08497 9.36814 3.03854 9.5108C2.99211 9.65347 2.98753 9.80645 3.02534 9.95164C3.06314 10.0968 3.14175 10.2282 3.25185 10.3301L7.20151 13.9813L6.15324 19.258C6.12413 19.4051 6.13774 19.5575 6.19246 19.6971C6.24719 19.8367 6.34074 19.9577 6.46206 20.0458C6.58338 20.1339 6.7274 20.1855 6.87708 20.1943C7.02676 20.2032 7.17586 20.169 7.30673 20.0959L12 17.4685L16.6933 20.0959C16.8242 20.1693 16.9735 20.2037 17.1234 20.195C17.2733 20.1862 17.4176 20.1346 17.5391 20.0464C17.6606 19.9581 17.7542 19.8368 17.8089 19.697C17.8635 19.5571 17.877 19.4045 17.8475 19.2572L16.7993 13.9821L20.7481 10.3301C20.8583 10.2282 20.9369 10.0968 20.9747 9.95164C21.0125 9.80645 21.0079 9.65347 20.9615 9.5108C20.915 9.36814 20.8287 9.24176 20.7127 9.14662C20.5967 9.05149 20.4558 8.99158 20.3069 8.97399L14.9658 8.33953L12.713 3.45624Z"
                    fill={client.is_starred ? "#FFA800" : "#00000040"}
                  />
                </svg>
              </button>
            </div>

            <div className="total-debt">
              <h3>Umumiy nasiya:</h3>
              <h2>{totalDebt.toLocaleString()} so'm</h2>
            </div>

            <div className="debts-list">
              <div className="debts-list-header">
                <h3>Faol nasiyalar:</h3>
                <button onClick={() => navigate(`/customers/${id}/debt-add`)}>
                  <PlusOutlined />
                </button>
              </div>
              {(debts || []).map((debt: Debt, index: number) => (
                <div key={index} className="debt-item">
                  <div className="debt-header">
                    <div className="debt-date">
                      {new Date(debt.created_at).toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="debt-sum">
                      {parseFloat(debt.debt_sum || "0").toLocaleString()} so'm
                    </div>
                  </div>
                  <div className="debt-progress">
                    <Progress
                      percent={calculateProgress(
                        parseFloat(debt.total_debt_sum || "0"),
                        parseFloat(debt.debt_sum || "0")
                      )}
                      showInfo={false}
                      strokeColor={
                        debt.debt_status === "active" ? "#4CAF50" : "#FF4D4F"
                      }
                      trailColor="#E0E0E0"
                    />
                  </div>
                  <div className="debt-footer">
                    <span>Keyingi to'lov: {debt.next_payment_date}</span>
                    <span>
                      {parseFloat(debt.total_debt_sum || "0").toLocaleString()}{" "}
                      so'm
                    </span>
                  </div>
                </div>
              ))}
              {(!debts || debts.length === 0) && (
                <div className="empty-debts">
                  <p>Hozircha faol nasiyalar yo'q</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
};

export default CustomerDetail;

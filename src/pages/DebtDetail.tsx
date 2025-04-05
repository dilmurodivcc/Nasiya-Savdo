import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Spin,
  Image,
  Progress,
  Descriptions,
  Tag,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../API";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import dayjs from "dayjs";

interface DebtImage {
  id: string;
  created_at: string;
  updated_at: string;
  image: string;
}

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
  images: DebtImage[];
}

const DebtDetail = () => {
  const { id, debtId } = useParams<{ id: string; debtId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: debt, isLoading } = useQuery<Debt>({
    queryKey: ["debt", debtId],
    queryFn: async () => {
      try {
        const response = await API.get(`/debts/${debtId}`);
        console.log("Debt detail response:", response.data);
        if (!response.data?.data) {
          throw new Error("Nasiya ma'lumotlari topilmadi");
        }
        return {
          ...response.data.data,
          images: response.data.data.images || [],
        };
      } catch (error: any) {
        console.error("Error fetching debt details:", error);
        if (error.response?.status === 404) {
          throw new Error("Nasiya topilmadi");
        }
        throw new Error(
          error.response?.data?.message ||
            "Nasiya ma'lumotlarini olishda xatolik yuz berdi"
        );
      }
    },
    enabled: !!debtId,
    retry: false,
  });

  const updateDebtMutation = useMutation({
    mutationFn: (data: any) => API.put(`/debts/${debtId}`, data),
    onSuccess: () => {
      message.success("Nasiya muvaffaqiyatli yangilandi");
      queryClient.invalidateQueries({ queryKey: ["debt", debtId] });
      setIsEditing(false);
    },
    onError: (error) => {
      message.error("Nasiyani yangilashda xatolik yuz berdi");
    },
  });

  const handleEdit = () => {
    if (debt) {
      form.setFieldsValue({
        debt_sum: debt.debt_sum,
        total_debt_sum: debt.total_debt_sum,
        debt_period: debt.debt_period,
        next_payment_date: dayjs(debt.next_payment_date),
        description: debt.description,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await updateDebtMutation.mutateAsync({
        debt_date: values.next_payment_date.format("YYYY-MM-DD"),
        debt_period: values.debt_period,
        debt_sum: values.debt_sum,
        description: values.description,
        debtor: id,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const calculateProgress = (paid: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((paid / total) * 100);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!debt) {
    return (
      <div className="error-message">
        <h3>Xatolik yuz berdi</h3>
        <p>Nasiya ma'lumotlari topilmadi</p>
        <Button onClick={() => navigate(`/customers/${id}`)} type="primary">
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="debt-detail-page">
          <div className="debt-detail-header">
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(`/customers/${id}`)}
              >
                Orqaga
              </Button>
              {!isEditing ? (
                <Button
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  type="primary"
                >
                  Tahrirlash
                </Button>
              ) : (
                <>
                  <Button
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    type="primary"
                    loading={updateDebtMutation.isPending}
                  >
                    Saqlash
                  </Button>
                  <Button icon={<CloseOutlined />} onClick={handleCancel}>
                    Bekor qilish
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="debt-detail-content">
            {isEditing ? (
              <Form form={form} layout="vertical" className="debt-form">
                <Form.Item
                  name="debt_sum"
                  label="Nasiya summasi"
                  rules={[
                    { required: true, message: "Nasiya miqdorini kiriting" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="total_debt_sum"
                  label="Umumiy nasiya summasi"
                  rules={[
                    {
                      required: true,
                      message: "Umumiy nasiya miqdorini kiriting",
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>

                <Form.Item
                  name="debt_period"
                  label="Nasiya muddati"
                  rules={[
                    { required: true, message: "Nasiya muddatini tanlang" },
                    {
                      type: "number",
                      min: 1,
                      max: 12,
                      message:
                        "Nasiya muddati 1-12 oy oralig'ida bo'lishi kerak",
                    },
                  ]}
                >
                  <Select>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                      <Select.Option key={month} value={month}>
                        {month} oy
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="next_payment_date"
                  label="Keyingi to'lov sanasi"
                  rules={[
                    {
                      required: true,
                      message: "Keyingi to'lov sanasini tanlang",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Izoh"
                  rules={[{ required: true, message: "Izoh kiriting" }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Form>
            ) : (
              <>
                <div className="debt-status">
                  <h2>Nasiya holati</h2>
                  <Progress
                    percent={calculateProgress(
                      parseFloat(debt.total_debt_sum),
                      parseFloat(debt.debt_sum)
                    )}
                    status={
                      debt.debt_status === "active" ? "active" : "success"
                    }
                  />
                  <Tag color={debt.debt_status === "active" ? "blue" : "green"}>
                    {debt.debt_status === "active" ? "Faol" : "Yopilgan"}
                  </Tag>
                </div>

                <Descriptions
                  title="Nasiya ma'lumotlari"
                  bordered
                  column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Nasiya summasi">
                    {parseFloat(debt.debt_sum).toLocaleString()} so'm
                  </Descriptions.Item>
                  <Descriptions.Item label="Umumiy nasiya summasi">
                    {parseFloat(debt.total_debt_sum).toLocaleString()} so'm
                  </Descriptions.Item>
                  <Descriptions.Item label="Nasiya muddati">
                    {debt.debt_period} oy
                  </Descriptions.Item>
                  <Descriptions.Item label="Keyingi to'lov sanasi">
                    {new Date(debt.next_payment_date).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Yaratilgan sana">
                    {new Date(debt.created_at).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Yangilangan sana">
                    {new Date(debt.updated_at).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Izoh" span={2}>
                    {debt.description}
                  </Descriptions.Item>
                </Descriptions>

                <div className="debt-images">
                  <h3>Rasmlar</h3>
                  <div className="images-grid">
                    {(debt.images || []).map((img) => {
                      let imageUrl = "";
                      if (typeof img.image === "string") {
                        if (img.image.startsWith('{"image":"')) {
                          try {
                            const parsed = JSON.parse(img.image);
                            imageUrl = parsed.image;
                          } catch (error) {
                            console.error(
                              "Rasmni parse qilishda xatolik:",
                              error
                            );
                          }
                        } else {
                          imageUrl = img.image;
                        }
                      }

                      return imageUrl ? (
                        <Image
                          key={img.id}
                          src={imageUrl}
                          alt="Debt document"
                          width={200}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DebtDetail;

import { Form, Input, Button, Avatar, message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import API from "../API";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./PersonalInfo.css";

interface AdminData {
  id: string;
  username: string;
  phone_number: string;
  email: string;
}

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: adminData } = useQuery<AdminData>({
    queryKey: ["admin"],
    queryFn: async () => {
      const response = await API.get("/admin/me");
      return response.data;
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: (data: Partial<AdminData>) =>
      API.put(`/admins/${adminData?.id}`, data),
    onSuccess: () => {
      message.success("Ma'lumotlar muvaffaqiyatli yangilandi");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      navigate("/settings");
    },
    onError: () => {
      message.error("Ma'lumotlarni yangilashda xatolik yuz berdi");
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await updateAdminMutation.mutateAsync(values);
    } catch (error) {
      console.error("Error updating admin data:", error);
    }
  };

  return (
    <div className="personal-info-container">
      <Header />
      <div className="personal-info-content">
        <div className="page-header">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/settings")}
            type="text"
          >
            Orqaga
          </Button>
          <h1>Shaxsiy ma'lumotlar</h1>
        </div>

        <div className="profile-section">
          <Avatar size={64} icon={<UserOutlined />} />
          <div className="profile-info">
            <h2>{adminData?.username}</h2>
            <p>{adminData?.phone_number}</p>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={adminData}
          onFinish={handleSubmit}
          className="personal-info-form"
        >
          <Form.Item
            name="username"
            label="Ism familiya"
            rules={[{ required: true, message: "Ism familiyani kiriting" }]}
          >
            <Input placeholder="Ism familiyani kiriting" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            label="Telefon raqam"
            rules={[
              { required: true, message: "Telefon raqamni kiriting" },
              {
                pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                message: "Telefon raqam formati: +998 90 123 45 67",
              },
            ]}
          >
            <Input placeholder="+998 90 123 45 67" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Elektron pochta"
            rules={[
              { type: "email", message: "Noto'g'ri elektron pochta formati" },
            ]}
          >
            <Input placeholder="test@gmail.com" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateAdminMutation.isPending}
              block
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalInfo; 
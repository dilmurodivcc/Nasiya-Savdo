import { useState } from "react";
import { Form, Input, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import API from "../API";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const AddCustomer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>(["", ""]);
  const [fileList, setFileList] = useState<any[]>([]);

  const addCustomerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await API.post("/debtor", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Mijoz muvaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate("/customers");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Mijoz qo'shishda xatolik yuz berdi"
      );
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      // Validate phone numbers
      const validPhoneNumbers = phoneNumbers.filter(
        (number) => number.trim() !== ""
      );

      if (validPhoneNumbers.length !== 2) {
        toast.error("Iltimos, 2 ta telefon raqam kiriting");
        return;
      }

      for (const number of validPhoneNumbers) {
        if (!number.startsWith("+998") || number.length !== 13) {
          toast.error(
            "Iltimos, to'g'ri O'zbekiston telefon raqamlarini kiriting"
          );
          return;
        }
      }

      // Validate images
      if (fileList.length !== 2) {
        toast.error("Iltimos, 2 ta rasm yuklang");
        return;
      }

      const formData = {
        full_name: values.full_name,
        address: values.address || "",
        description: values.description || "",
        store: "toy shop..",
        phone_numbers: validPhoneNumbers,
        images: ["", ""], // Bo'sh string array
      };

      await addCustomerMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <>
    <div className="container">

          <Header />
      <div className="add-customer-page">
          <div className="page-content">
            <h2>Yangi mijoz qo'shish</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="add-customer-form"
            >
              <Form.Item
                name="full_name"
                label="To'liq ism"
                rules={[{ required: true, message: "Iltimos, ismni kiriting" }]}
              >
                <Input placeholder="Ism familiya" />
              </Form.Item>

              <Form.Item label="Telefon raqamlar" required>
                <div className="phone-numbers">
                  {phoneNumbers.map((phone, index) => (
                    <Input
                      key={index}
                      value={phone}
                      onChange={(e) => handlePhoneChange(index, e.target.value)}
                      placeholder="+998 90 123 45 67"
                      maxLength={13}
                      style={{ marginBottom: 8 }}
                    />
                  ))}
                </div>
              </Form.Item>

              <Form.Item name="address" label="Manzil">
                <Input.TextArea placeholder="Manzilni kiriting" />
              </Form.Item>

              <Form.Item name="description" label="Izoh">
                <Input.TextArea placeholder="Qo'shimcha ma'lumot" />
              </Form.Item>

              <Form.Item
                name="images"
                label="Rasmlar"
                required
                rules={[
                  { required: true, message: "Iltimos, 2 ta rasm yuklang" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={2}
                >
                  {fileList.length < 2 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Rasm yuklash</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item className="form-actions">
                <Button
                  onClick={() => navigate("/customers")}
                  style={{ marginRight: 8 }}
                >
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addCustomerMutation.isPending}
                >
                  Mijoz qo'shish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>  
        <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default AddCustomer;

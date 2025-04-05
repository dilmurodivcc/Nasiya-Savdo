import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Button, Upload, message, Select } from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import API from "../API";
import { useState } from "react";

const DebtAdd = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    try {
      if (fileList.length === 0) {
        message.error("Kamida 1 ta rasm yuklashingiz kerak");
        return;
      }

      setLoading(true);
      const formData = {
        next_payment_date: values.next_payment_date.format("YYYY-MM-DD"),
        debt_period: values.debt_period,
        debt_sum: values.debt_sum,
        total_debt_sum: values.total_debt_sum,
        description: values.description,
        images: fileList.map((file) => ({
          image: file.response?.url || file.url,
        })),
        debtor: id,
        debt_status: "active",
      };

      await API.post("/debts", formData);
      message.success("Nasiya muvaffaqiyatli qo'shildi");
      navigate(`/customers/${id}`);
    } catch (error) {
      message.error("Nasiya qo'shishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <>
      <div className="container">
        <Header />
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Orqaga
        </Button>
        <div className="debt-add-page">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="debt-form"
          >
            <Form.Item
              name="debt_sum"
              rules={[{ required: true, message: "Nasiya miqdorini kiriting" }]}
            >
              <Input type="number" placeholder="Nasiya miqdorini kiriting" />
            </Form.Item>

            <Form.Item
              name="total_debt_sum"
              rules={[
                { required: true, message: "Umumiy nasiya miqdorini kiriting" },
              ]}
            >
              <Input
                type="number"
                placeholder="Umumiy nasiya miqdorini kiriting"
              />
            </Form.Item>

            <Form.Item
              name="debt_period"
              rules={[
                { required: true, message: "Nasiya muddatini tanlang" },
                {
                  type: "number",
                  min: 1,
                  max: 12,
                  message: "Nasiya muddati 1-12 oy oralig'ida bo'lishi kerak",
                },
              ]}
            >
              <Select placeholder="Nasiya muddatini tanlang">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <Select.Option key={month} value={month}>
                    {month} oy
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="next_payment_date"
              rules={[
                { required: true, message: "Keyingi to'lov sanasini tanlang" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ required: true, message: "Izoh kiriting" }]}
            >
              <Input.TextArea rows={4} placeholder="Izoh kiriting" />
            </Form.Item>

            <Form.Item
              name="images"
              rules={[
                {
                  required: true,
                  message: "Kamida 1 ta rasm yuklashingiz kerak",
                },
              ]}
            >
              <Upload
                action="/api/upload"
                listType="picture"
                maxCount={5}
                onChange={handleUploadChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Rasm yuklash</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Nasiya qo'shish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DebtAdd;

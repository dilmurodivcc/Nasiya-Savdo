import {
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useAddDebtor from "../hooks/useAddDebtor";
import { useState } from "react";
import dayjs from "dayjs";
import "./AddDebtorModal.css";

interface AddDebtorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDebtorModal = ({ isOpen, onClose }: AddDebtorModalProps) => {
  const [form] = Form.useForm();
  const addDebtorMutation = useAddDebtor();
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        full_name: values.full_name,
        address: values.address || "",
        description: values.description || "",
        store: "default store",
        phone_numbers: phoneNumbers.filter((number) => number.trim() !== ""),
        images: fileList.map((file) => file.originFileObj),
        debt_sum: values.debt_sum.toString(),
        duration: dayjs(values.deadline).diff(dayjs(), "month"),
      };

      await addDebtorMutation.mutateAsync(formData);
      form.resetFields();
      setPhoneNumbers([""]);
      setFileList([]);
      onClose();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
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
    <Modal
      title="Yangi qarzdor qo'shish"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width="95%"
      style={{ maxWidth: "600px" }}
      className="add-debtor-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="add-debtor-form"
      >
        <Form.Item
          name="full_name"
          label="To'liq ism"
          rules={[{ required: true, message: "Iltimos, ismni kiriting" }]}
        >
          <Input placeholder="Ism familiya" />
        </Form.Item>

        <Form.Item
          name="debt_sum"
          label="Summa miqdori"
          rules={[{ required: true, message: "Iltimos, summani kiriting" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            placeholder="5 000 000"
          />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Muddat"
          rules={[{ required: true, message: "Iltimos, muddatni kiriting" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <div className="phone-numbers">
          <label>Telefon raqam(lar)</label>
          {phoneNumbers.map((phone, index) => (
            <Input
              key={index}
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              placeholder="+998 90 123 45 67"
              style={{ marginBottom: 8 }}
            />
          ))}
          <Button
            type="dashed"
            onClick={addPhoneNumber}
            block
            icon={<PlusOutlined />}
          >
            Raqam qo'shish
          </Button>
        </div>

        <Form.Item name="address" label="Manzil">
          <Input.TextArea placeholder="Manzilni kiriting" />
        </Form.Item>

        <Form.Item name="description" label="Izoh">
          <Input.TextArea placeholder="Qo'shimcha ma'lumot" />
        </Form.Item>

        <Form.Item name="images" label="Rasmlar">
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
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Bekor qilish
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={addDebtorMutation.isPending}
          >
            Nasiyani so'ndirish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDebtorModal;

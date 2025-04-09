import { useNavigate } from "react-router-dom";
import { List } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    {
      title: "Shaxsiy ma'lumotlar",
      icon: <UserOutlined />,
      onClick: () => navigate("/settings/personal"),
    },
    {
      title: "Xavfsizlik",
      icon: <LockOutlined />,
      onClick: () => navigate("/settings/security"),
    },
    {
      title: "Bildirishnomalar",
      icon: <BellOutlined />,
      onClick: () => navigate("/settings/notifications"),
    },
    {
      title: "Chiqish",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/auth");
      },
    },
  ];

  return (
    <>
      <div className="container">
        <Header />
        <div className="settings-page">
          <List
            dataSource={settingsItems}
            renderItem={(item) => (
              <List.Item onClick={item.onClick} style={{ cursor: "pointer" }}>
                <List.Item.Meta avatar={item.icon} title={item.title} />
              </List.Item>
            )}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;

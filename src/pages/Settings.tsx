import { useState } from "react";
import { Form, Input, Button, List, Avatar, Card } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RightOutlined } from "@ant-design/icons";
import API from "../API";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

interface AdminData {
  id: string;
  username: string;
  phone_number: string;
  email: string;
}

const Settings = () => {
  const navigate = useNavigate();

  const settingsItems = [
    {
      key: "account",
      title: "Akkaunt",
      onClick: () => navigate("/settings/account"),
    },
    {
      key: "personal",
      title: "Shaxsiy ma'lumotlar",
      onClick: () => navigate("/settings/personal"),
    },
    {
      key: "help",
      title: "Yordam",
      onClick: () => navigate("/settings/help"),
    },
    {
      key: "terms",
      title: "Taklif va shikoyatlar",
      onClick: () => navigate("/settings/terms"),
    },
    {
      key: "dastur",
      title: "Dastur haqida",
      onClick: () => navigate("/settings/about"),
    },
    {
      key: "community",
      title: "Community oferta",
      onClick: () => navigate("/settings/community"),
    },
    {
      key: "maxfiylik",
      title: "Maxfiylik siyosati",
      onClick: () => navigate("/settings/privacy"),
    },
    {
      key: "chiqish",
      title: "Chiqish",
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/auth");
      },
      danger: true,
    },
  ];

  return (
    <div className="settings-container">
      <Header />
      <div className="settings-content">
        <h1>Sozlamalar</h1>
        <List
          className="settings-list"
          itemLayout="horizontal"
          dataSource={settingsItems}
          renderItem={(item) => (
            <List.Item
              onClick={item.onClick}
              className={`settings-item ${item.danger ? "danger" : ""}`}
            >
              <List.Item.Meta title={item.title} />
              <RightOutlined />
            </List.Item>
          )}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

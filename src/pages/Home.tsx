import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import eyeClose from "../assets/icons/eye-close.svg";
import eyeOpen from "../assets/icons/eye-open.svg";
import wallet from "../assets/images/wallet.svg";
import { useState } from "react";
import useHomeData from "../hooks/useHomeData";
import { Spin } from "antd";
import { useStore } from "../hooks/useStore";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useHomeData();
  const { user } = useStore();

  console.log("Home Data:", data); // For debugging
  console.log("User Data:", user); // For debugging

  return (
    <>
      <div className="container home">
        <Header />
        <div className="home-grid">
          <div className="balance">
            <div className="content">
              <p>
                {isOpen
                  ? `${user?.data?.wallet || "0"} so'm`
                  : "*** *** *** so'm"}
              </p>
              <img
                src={isOpen ? eyeOpen : eyeClose}
                alt="eye-close"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <h4>Umumiy nasiya:</h4>
          </div>
          <div className="card-red">
            <h3>Kechiktirilgan to'lovlar</h3>
            <h2 className="red">
              {isLoading ? <Spin size="small" /> : data?.delayed_payments || 0}
            </h2>
          </div>
          <div className="card-green">
            <h3>Mijozlar soni </h3>
            <h2 className="green">
              {isLoading ? <Spin size="small" /> : data?.total_customers || 0}
            </h2>
          </div>
          <div className="wallet">
            <h2>Hamyoningiz</h2>
            <div className="wallet-balance">
              <div className="left">
                <img className="icon" src={wallet} alt="wallet" />
                <div className="text">
                  <p>Hisobingizda</p>
                  <h3>{user?.data?.wallet || "0"} so'm</h3>
                </div>
              </div>
              <button className="plus">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00033 12.8334V1.16669M12.8337 7.00002H1.16699"
                    stroke="#F6F6F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="history">
              <div className="line">
                <h4 className="title">Bu oy uchun to'lov:</h4>
                <h4 className="status">To'lov qilingan</h4>
              </div>
              <div className="history-list">
                {isLoading ? (
                  <Spin />
                ) : (
                  data?.payment_history?.map((payment, index) => (
                    <div key={index} className="history-item">
                      <h3>{payment.amount.toLocaleString()} so'm</h3>
                      <h4>{new Date(payment.date).toLocaleString()}</h4>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import eyeClose from "../assets/icons/eye-close.svg";
import eyeOpen from "../assets/icons/eye-open.svg";
import wallet from "../assets/images/wallet.svg";
import { useState } from "react";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="container home">
        <Header />
        <div className="home-grid">
          <div className="balance">
            <div className="content">
              <p>{isOpen ? "177 000 777 so'm" : "*** *** *** so'm"}</p>
              <img
                src={isOpen ? eyeOpen : eyeClose}
                alt="eye-close"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <h4>Umumiy nasiya:</h4>
          </div>
          <div className="card-red">
            <h3>Kechiktirilgan to‘lovlar</h3>
            <h2 className="red">26</h2>
          </div>
          <div className="card-green">
            <h3>Mijozlar soni </h3>
            <h2 className="green">26</h2>
          </div>
          <div className="wallet">
            <h2>Hamyoningiz</h2>
            <div className="wallet-balance">
              <div className="left">
                <img className="icon" src={wallet} alt="wallet" />
                <div className="text">
                  <p>Hisobingizda</p>
                  <h3>177 000 so'm</h3>
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
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="history">
              <div className="line">
                <h4 className="title">Bu oy uchun to‘lov:</h4>
                <h4 className="status">To‘lov qilingan</h4>
              </div>
              <div className="history-list">
                <div className="history-item">
                  <p>177 000 so'm</p>
                </div>
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

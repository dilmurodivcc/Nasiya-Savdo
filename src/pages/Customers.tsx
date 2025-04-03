import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useState } from "react";
import useCustomers from "../hooks/useCustomers";
import { Spin, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Customer } from "../hooks/useCustomers";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useCustomers(searchTerm);
  const [starredCustomers, setStarredCustomers] = useState<Set<string>>(
    new Set()
  );
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleStar = (customerId: string) => {
    setStarredCustomers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  if (error) {
    return (
      <div className="error-message">
        Xatolik yuz berdi: {(error as Error).message}
      </div>
    );
  }

  const calculateTotalDebt = (debts: any[]) => {
    return debts.reduce((total, debt) => {
      const debtSum = parseFloat(debt.debt_sum) || 0;
      return total + debtSum;
    }, 0);
  };

  const EmptyState = () => (
    <div className="empty-container">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>Hozircha mijozlar yo'q</p>
    </div>
  );

  // Sort customers: starred first, then others
  const sortedCustomers = data?.data
    ? [...data.data].sort((a, b) => {
        const aStarred = starredCustomers.has(a.id);
        const bStarred = starredCustomers.has(b.id);
        if (aStarred && !bStarred) return -1;
        if (!aStarred && bStarred) return 1;
        return 0;
      })
    : [];

  return (
    <>
      <div className="customer-page">
        <div className="container">
          <Header />
          <header className="customer-header">
            <div className="input-box">
              <svg
                className="search-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5304 17.4698C19.2375 17.1769 18.7626 17.1769 18.4697 17.4698C18.1768 17.7626 18.1768 18.2375 18.4697 18.5304L19.5304 17.4698ZM22.4696 22.5304C22.7625 22.8233 23.2374 22.8233 23.5303 22.5304C23.8232 22.2375 23.8232 21.7626 23.5303 21.4697L22.4696 22.5304ZM18.4697 18.5304L22.4696 22.5304L23.5303 21.4697L19.5304 17.4698L18.4697 18.5304ZM11 18.25C6.44365 18.25 2.75 14.5563 2.75 10H1.25C1.25 15.3848 5.61522 19.75 11 19.75V18.25ZM19.25 10C19.25 14.5563 15.5563 18.25 11 18.25V19.75C16.3848 19.75 20.75 15.3848 20.75 10H19.25ZM11 1.75C15.5563 1.75 19.25 5.44365 19.25 10H20.75C20.75 4.61522 16.3848 0.25 11 0.25V1.75ZM11 0.25C5.61522 0.25 1.25 4.61522 1.25 10H2.75C2.75 5.44365 6.44365 1.75 11 1.75V0.25Z"
                  fill="#323F49"
                />
              </svg>
              <input
                type="text"
                placeholder="Mijozlarni qidirish..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/customers/add")}
            ></Button>
          </header>
          <div className="customer-list">
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner-wrapper">
                  <Spin size="large" />
                </div>
              </div>
            ) : !sortedCustomers.length ? (
              <EmptyState />
            ) : (
              sortedCustomers.map((customer: Customer) => (
                <div
                  key={customer.id}
                  className="customer-item"
                  onClick={() => navigate(`/customers/${customer.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="left">
                    <h5 className="name">{customer.full_name}</h5>
                    <h6 className="description">
                      {customer.description || "Izoh yo'q"}
                    </h6>
                    <div className="nasiya">
                      <small>Jami Nasiya:</small>
                      <b>
                        {calculateTotalDebt(customer.debts).toLocaleString()}{" "}
                        so'm
                      </b>
                    </div>
                  </div>
                  <button
                    className="star"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(customer.id);
                    }}
                  >
                    {starredCustomers.has(customer.id) ? (
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
                          fill="#FFA800"
                        />
                      </svg>
                    ) : (
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
                          d="M11.0555 3.54294C11.1518 3.37774 11.2897 3.24067 11.4555 3.1454C11.6213 3.05013 11.8091 3 12.0003 3C12.1915 3 12.3794 3.05013 12.5452 3.1454C12.711 3.24067 12.8489 3.37774 12.9451 3.54294L15.3902 7.74028L20.1387 8.76906C20.3255 8.80965 20.4984 8.89848 20.6401 9.02672C20.7818 9.15495 20.8875 9.3181 20.9465 9.49989C21.0056 9.68169 21.0159 9.87579 20.9766 10.0628C20.9372 10.2499 20.8495 10.4233 20.7222 10.5659L17.4854 14.1885L17.9753 19.0218C17.9946 19.2122 17.9637 19.4042 17.8856 19.5788C17.8074 19.7535 17.6849 19.9045 17.5301 20.017C17.3754 20.1294 17.1938 20.1993 17.0036 20.2196C16.8134 20.24 16.6211 20.21 16.4461 20.1328L12.0003 18.1733L7.55454 20.1328C7.37951 20.21 7.18729 20.24 6.99707 20.2196C6.80685 20.1993 6.6253 20.1294 6.47054 20.017C6.31577 19.9045 6.19321 19.7535 6.1151 19.5788C6.03698 19.4042 6.00604 19.2122 6.02537 19.0218L6.51526 14.1885L3.27847 10.5668C3.15094 10.4242 3.06305 10.2507 3.02356 10.0635C2.98407 9.87637 2.99436 9.68212 3.05341 9.50018C3.11247 9.31825 3.21821 9.15498 3.36009 9.02669C3.50197 8.89839 3.67502 8.80956 3.86196 8.76906L8.61044 7.74028L11.0555 3.54294Z"
                          fill="black"
                          fillOpacity="0.4"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Customers;

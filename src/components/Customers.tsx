import { useState } from "react";
import { Card, Input, Spin, Empty } from "antd";
import { SearchOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import useCustomers from "../hooks/useCustomers";
import "./Customers.css";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useCustomers(searchTerm);
  const [starredCustomers, setStarredCustomers] = useState<Set<string>>(
    new Set()
  );

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Xatolik yuz berdi. Iltimos qayta urinib ko'ring.</p>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="empty-container">
        <Empty description="Qarzdorlar topilmadi" />
      </div>
    );
  }

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

  // Sort customers: starred first, then others
  const sortedCustomers = [...data.data].sort((a, b) => {
    const aStarred = starredCustomers.has(a.id);
    const bStarred = starredCustomers.has(b.id);
    if (aStarred && !bStarred) return -1;
    if (!aStarred && bStarred) return 1;
    return 0;
  });

  return (
    <div className="customers-container">
      <div className="search-container">
        <Input
          placeholder="Qidiruv..."
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="customers-grid">
        {sortedCustomers.map((customer) => (
          <Card
            key={customer.id}
            className={`customer-card ${
              starredCustomers.has(customer.id) ? "starred" : ""
            }`}
            extra={
              <span
                onClick={() => toggleStar(customer.id)}
                className="star-icon"
              >
                {starredCustomers.has(customer.id) ? (
                  <StarFilled style={{ color: "#faad14" }} />
                ) : (
                  <StarOutlined />
                )}
              </span>
            }
          >
            <h3>{customer.full_name}</h3>
            <p>
              <strong>Izoh:</strong> {customer.description || "Izoh yo'q"}
            </p>
            <p>
              <strong>Jami Nasiya:</strong>{" "}
              {customer.debts && customer.debts.length > 0
                ? customer.debts
                    .reduce(
                      (total, debt) => total + (parseInt(debt.debt_sum) || 0),
                      0
                    )
                    .toLocaleString()
                : "0"}{" "}
              so'm
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;

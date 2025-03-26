import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  // Joriy sanani olish
  const today = new Date();
  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // Hafta kunlari
  const weekDays = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"];

  // Oyning birinchi kunini olish
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Oyning oxirgi kunini olish
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Oyning kunlarini generatsiya qilish
  const getDaysInMonth = () => {
    const days = [];
    const totalDays = lastDayOfMonth.getDate();

    // Oyning birinchi kuni qaysi hafta kuniga to'g'ri kelishini aniqlash
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Oldingi oyning kunlarini qo'shish
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }

    // Joriy oyning kunlarini qo'shish
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return days;
  };

  // Kunni tanlash
  const handleDateSelect = (day: number | null) => {
    if (!day) return;

    setSelectedDates((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  // Oyni o'zgartirish
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
    setSelectedDates([]); // Oy o'zgarganda tanlangan kunlarni tozalash
  };

  // Oyni formatlash
  const formatMonth = () => {
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    return `${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;
  };

  // To'lovlar ma'lumotlari
  const payments = [
    {
      name: "Avazbek Jahongirov",
      amount: "UZS 1 000 000",
    },
    {
      name: "Otabek Sulaymonov",
      amount: "UZS 1 000 000",
    },
  ];

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <h1>Kalendar</h1>
      </div>

      <div className="calendar-container">
        {/* To'lovlar bo'limi */}
        <div className="payments-section">
          <h3>1 Oktabr kuni to'lov kutilmoqda</h3>
          {payments.map((payment, index) => (
            <div key={index} className="payment-item">
              <h4>{payment.name}</h4>
              <p>{payment.amount}</p>
            </div>
          ))}
        </div>

        {/* Kalendar bo'limi */}
        <div className="calendar-main">
          <div className="month-navigation">
            <div className="month-year">{formatMonth()}</div>
            <div className="navigation-buttons">
              <button onClick={() => changeMonth(-1)}>&lt;</button>
              <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>
          </div>

          <div className="total-amount">
            <span>Oylik jami:</span>
            <h2>50 125 000 so'm</h2>
          </div>

          <div className="calendar-grid">
            <div className="weekdays">
              {weekDays.map((day, index) => (
                <div key={index} className="weekday">
                  {day}
                </div>
              ))}
            </div>
            <div className="days">
              {getDaysInMonth().map((day, index) => (
                <div
                  key={index}
                  className={`day ${isToday(day || 0) ? "today" : ""} ${
                    !day ? "empty" : ""
                  } ${selectedDates.includes(day || 0) ? "selected" : ""}`}
                  onClick={() => handleDateSelect(day)}
                >
                  {day && (
                    <>
                      {day}
                      {day === 1 && <span className="dot"></span>}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

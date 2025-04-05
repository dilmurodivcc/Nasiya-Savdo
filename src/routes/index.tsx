import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Customers from "../pages/Customers";
import AddCustomer from "../pages/AddCustomer";
import CustomerDetail from "../pages/CustomerDetail";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";
import DebtAdd from "../pages/DebtAdd";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<CustomerDetail />} />
        <Route path="/customers/:id/debt-add" element={<DebtAdd />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

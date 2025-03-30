import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Customers from "../pages/Customers";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/customers" element={<Customers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import logo from "./assets/LOGO.svg";
import AppRoutes from "./routes";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
        {isLoading ? (
          <div className="splash-screen">
            <img src={logo} alt="Logo" />
          </div>
        ) : (
          <AppRoutes />
        )}
    </BrowserRouter>
  );
};

export default App;
